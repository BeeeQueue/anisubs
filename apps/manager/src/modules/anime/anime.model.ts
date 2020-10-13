import { Field, Float, Int, ObjectType } from "type-graphql"

import { IdsService } from "@/lib/arm"
import { MyAnimeListService } from "@/lib/myanimelist"
import { Entry } from "@/modules/entry/entry.model"
import { Name } from "@/modules/name/name.model"

@ObjectType()
export class Anime {
  constructor(
    private readonly idsService: IdsService,
    private readonly malService: MyAnimeListService,
  ) {}

  @Field(() => Int)
  anilistId!: number

  @Field(() => Int, { nullable: true })
  score!: number

  @Field()
  anilistUrl(): string {
    return `https://anilist.co/anime/${this.anilistId}`
  }

  @Field(() => Int, { nullable: true })
  async anidbId(): Promise<number | null> {
    const result = await this.idsService.fetchIds("anilist", this.anilistId)
    return result?.anidb ?? null
  }

  @Field(() => Float, { nullable: true })
  async malScore(): Promise<number | null> {
    return this.malService.fetchRating(this.anilistId)
  }

  @Field(() => [String])
  async names(): Promise<string[]> {
    const names = await Name.find({
      where: { animeId: this.anilistId },
      select: ["name"],
    })

    return names.map((name) => name.name)
  }

  @Field(() => [Entry])
  async entries(): Promise<Entry[]> {
    return Entry.find({
      where: { animeId: this.anilistId },
    })
  }
}
