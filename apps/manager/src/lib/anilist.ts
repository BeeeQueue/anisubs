import Bottleneck from "bottleneck"
import DataLoader from "dataloader"
import { GraphQLClient, gql } from "graphql-request"
import Redis from "ioredis"
import { Field, ObjectType } from "type-graphql"

import { config } from "@/config"

const anilistLimiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 500,
  reservoirIncreaseAmount: 3,
  reservoirIncreaseInterval: 1000 * 2,
  reservoirIncreaseMaximum: 90,
})

const graphql = new GraphQLClient(config.anilist.url, {
  headers:
    config.anilist.token != null
      ? {
          Authorization: `Bearer ${config.anilist.token}`,
        }
      : undefined,
})

type AnilistData = null | {
  id: number
  title: {
    english?: string
    romaji?: string
    native: string
  }
  coverImage: {
    extraLarge: string
    medium: string
  }
  bannerImage: string
}

const query = gql`
  query BatchAnimeData($ids: [Int!]!) {
    data: Page(page: 1, perPage: 50) {
      anime: media(type: ANIME, id_in: $ids) {
        id
        title {
          english
          romaji
          native
        }
        coverImage {
          extraLarge
          medium
        }
        bannerImage
      }
    }
  }
`

const fetchIdData = async (ids: number[]): Promise<AnilistData[]> =>
  anilistLimiter.schedule(async () => {
    const result = await graphql.request<
      { data: { anime: AnilistData[] } },
      { ids: number[] }
    >(query, { ids })

    return result.data.anime
  })

const SIX_HOURS_IN_SECONDS = 6 * 3600

const redis = new Redis({
  ...config.redis,
  keyPrefix: "anilist-cache-v1-",
})

/**
 * Loads anime data from redis cache first, then loads and caches any missing results.
 */
const AnilistLoader = new DataLoader<number, AnilistData>(
  async (keys) => {
    let results = (
      await redis.mget(keys.map((key) => key.toString()))
    ).map((result) =>
      result == null ? result : (JSON.parse(result) as AnilistData),
    )

    const missingIds = results.reduce(
      (accum, result, index) =>
        result != null ? accum : [...accum, keys[index]],
      [] as number[],
    )

    if (missingIds.length > 0) {
      const newResults = await fetchIdData(missingIds)

      const commands = newResults.map((data) => [
        "set",
        data!.id.toString(),
        JSON.stringify(data),
        "ex",
        SIX_HOURS_IN_SECONDS.toString(),
      ])

      await redis.multi(commands).exec()

      let addedData = -1
      results = results.map((result) => {
        if (result != null) return result

        addedData++
        return newResults[addedData]
      })
    }

    return results
  },
  {
    cache: false,
    maxBatchSize: 50,
    batchScheduleFn: (callback) => setTimeout(callback, 100),
  },
)

@ObjectType({
  description: "Data from AniList",
})
export class Anilist {
  @Field()
  title!: string

  @Field()
  imageMedium!: string

  @Field()
  imageLarge!: string

  @Field(() => String, { nullable: true })
  banner!: string | null

  static fetch = async (id: number) => {
    const data = await AnilistLoader.load(id)

    if (data == null) return null

    const toReturn = new Anilist()

    toReturn.title =
      data.title.english ?? data.title.romaji ?? data.title.native
    toReturn.imageLarge = data.coverImage.extraLarge
    toReturn.imageMedium = data.coverImage.medium
    toReturn.banner = data.bannerImage

    return toReturn
  }
}
