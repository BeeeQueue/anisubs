/* eslint-disable */
/* THIS IS A GENERATED FILE */
import { gql } from "@apollo/client/core"
import * as VueApolloComposable from "@vue/apollo-composable"
import type * as VueCompositionApi from "vue"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: string
  /** A timestamp in the format `[HH:]MM:SS[.xxxx]` */
  Timestamp: string
}

export type Group = {
  readonly __typename?: "Group"
  readonly id: Scalars["ID"]
  readonly createdAt: Scalars["DateTime"]
  readonly updatedAt: Scalars["DateTime"]
  readonly name: Scalars["String"]
}

export type Image = {
  readonly __typename?: "Image"
  readonly id: Scalars["ID"]
  readonly createdAt: Scalars["DateTime"]
  readonly updatedAt: Scalars["DateTime"]
  readonly timestamp: Scalars["Timestamp"]
  readonly url: Scalars["String"]
}

export type Entry = {
  readonly __typename?: "Entry"
  readonly id: Scalars["ID"]
  readonly createdAt: Scalars["DateTime"]
  readonly updatedAt: Scalars["DateTime"]
  readonly hash: Scalars["String"]
  readonly episode: Scalars["Int"]
  readonly source: Scalars["String"]
  readonly sourceUri: Scalars["String"]
  readonly fileName: Scalars["String"]
  readonly accepted: Scalars["Boolean"]
  readonly group: Group
  readonly anime: Anime
  readonly images: ReadonlyArray<Image>
}

export type Anime = {
  readonly __typename?: "Anime"
  /** AniList ID */
  readonly id: Scalars["Int"]
  readonly score: Maybe<Scalars["Int"]>
  readonly anilistUrl: Scalars["String"]
  readonly anidbId: Maybe<Scalars["Int"]>
  readonly malScore: Maybe<Scalars["Float"]>
  readonly names: ReadonlyArray<Scalars["String"]>
  readonly entries: ReadonlyArray<Entry>
}

export type Job = {
  readonly __typename?: "Job"
  readonly hash: Scalars["String"]
  /** A mapping for `hash`, useful in caching */
  readonly id: Scalars["ID"]
  readonly episode: Scalars["Int"]
  readonly timestamps: ReadonlyArray<Scalars["Timestamp"]>
  readonly source: Scalars["String"]
  readonly sourceUri: Scalars["String"]
  readonly fileName: Scalars["String"]
  readonly inProgress: Scalars["Boolean"]
  readonly createdAt: Scalars["DateTime"]
  readonly anime: Anime
  readonly group: Group
}

export type Worker = {
  readonly __typename?: "Worker"
  readonly id: Scalars["ID"]
  readonly createdAt: Scalars["DateTime"]
  readonly updatedAt: Scalars["DateTime"]
  readonly name: Scalars["String"]
  readonly host: Scalars["String"]
  readonly token: Scalars["String"]
  readonly confirmed: Scalars["Boolean"]
  readonly enabled: Scalars["Boolean"]
  readonly online: Scalars["Boolean"]
  readonly currentJob: Maybe<Job>
}

export type JobPage = {
  readonly __typename?: "JobPage"
  readonly items: ReadonlyArray<Job>
  readonly nextOffset: Maybe<Scalars["Int"]>
  readonly total: Scalars["Int"]
}

export type Query = {
  readonly __typename?: "Query"
  readonly anime: Maybe<Anime>
  readonly recentlyAdded: ReadonlyArray<Entry>
  readonly entries: ReadonlyArray<Entry>
  readonly jobQueue: JobPage
  readonly workers: ReadonlyArray<Worker>
}

export type QueryAnimeArgs = {
  id: Scalars["Float"]
}

export type QueryEntriesArgs = {
  animeId: Scalars["Float"]
}

export type QueryJobQueueArgs = {
  offset?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type Mutation = {
  readonly __typename?: "Mutation"
  readonly createJob: Job
  readonly addWorker: Worker
  readonly confirmWorker: Scalars["Boolean"]
}

export type MutationCreateJobArgs = {
  animeId: Scalars["Int"]
  source: Scalars["String"]
  fileName: Maybe<Scalars["String"]>
  timestamps: Maybe<ReadonlyArray<Scalars["Timestamp"]>>
}

export type MutationAddWorkerArgs = {
  host: Scalars["String"]
  name: Scalars["String"]
}

export type MutationConfirmWorkerArgs = {
  port: Scalars["Int"]
  token: Scalars["String"]
}

export type RecentlyAddedFeedQueryVariables = Exact<{ [key: string]: never }>

export type RecentlyAddedFeedQuery = { readonly __typename?: "Query" } & {
  readonly recentlyAdded: ReadonlyArray<
    { readonly __typename?: "Entry" } & Pick<
      Entry,
      "id" | "source" | "episode" | "createdAt"
    > & {
        readonly group: { readonly __typename?: "Group" } & Pick<Group, "name">
        readonly anime: { readonly __typename?: "Anime" } & Pick<
          Anime,
          "id" | "anilistUrl"
        >
      }
  >
}

export const RecentlyAddedFeedDocument = /*#__PURE__*/ gql`
  query RecentlyAddedFeed {
    recentlyAdded {
      id
      source
      episode
      createdAt
      group {
        name
      }
      anime {
        id
        anilistUrl
      }
    }
  }
`

/**
 * __useRecentlyAddedFeedQuery__
 *
 * To run a query within a Vue component, call `useRecentlyAddedFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentlyAddedFeedQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecentlyAddedFeedQuery();
 */
export function useRecentlyAddedFeedQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        RecentlyAddedFeedQuery,
        RecentlyAddedFeedQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          RecentlyAddedFeedQuery,
          RecentlyAddedFeedQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          RecentlyAddedFeedQuery,
          RecentlyAddedFeedQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    RecentlyAddedFeedQuery,
    RecentlyAddedFeedQueryVariables
  >(RecentlyAddedFeedDocument, {}, options)
}
export type RecentlyAddedFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  RecentlyAddedFeedQuery,
  RecentlyAddedFeedQueryVariables
>
