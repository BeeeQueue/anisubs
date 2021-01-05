/* eslint-disable */
/* THIS IS A GENERATED FILE */
import { gql } from "@apollo/client/core"
import * as VueApolloComposable from "@vue/apollo-composable"
import type * as VueCompositionApi from "vue"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
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

/** Data from AniList */
export type Anilist = {
  readonly __typename?: "Anilist"
  readonly title: Scalars["String"]
  readonly imageMedium: Scalars["String"]
  readonly imageLarge: Scalars["String"]
  readonly banner: Maybe<Scalars["String"]>
  readonly url: Scalars["String"]
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
  readonly filename: Scalars["String"]
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
  readonly anidbId: Maybe<Scalars["Int"]>
  readonly malScore: Maybe<Scalars["Float"]>
  readonly names: ReadonlyArray<Scalars["String"]>
  readonly entries: ReadonlyArray<Entry>
  readonly anilist: Maybe<Anilist>
}

export type AnimeEntriesArgs = {
  all: Maybe<Scalars["Boolean"]>
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

export type Torrent = {
  readonly __typename?: "Torrent"
  readonly name: Maybe<Scalars["String"]>
  readonly magnetUri: Scalars["String"]
  readonly seeders: Scalars["Int"]
  readonly leechers: Scalars["Int"]
  readonly sizeMb: Scalars["Int"]
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
  readonly searchTorrents: ReadonlyArray<Torrent>
  readonly workers: ReadonlyArray<Worker>
}

export type QueryAnimeArgs = {
  id: Scalars["Int"]
}

export type QueryEntriesArgs = {
  animeId: Scalars["Float"]
}

export type QueryJobQueueArgs = {
  offset?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QuerySearchTorrentsArgs = {
  query: Scalars["String"]
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
  group: Maybe<Scalars["String"]>
}

export type MutationAddWorkerArgs = {
  host: Scalars["String"]
  name: Scalars["String"]
}

export type MutationConfirmWorkerArgs = {
  port: Scalars["Int"]
  token: Scalars["String"]
}

export type EntryComponentFragment = { readonly __typename?: "Entry" } & Pick<
  Entry,
  "id" | "source" | "episode" | "createdAt"
> & {
    readonly group: { readonly __typename?: "Group" } & Pick<
      Group,
      "id" | "name"
    >
    readonly anime: { readonly __typename?: "Anime" } & Pick<Anime, "id"> & {
        readonly anilist: Maybe<
          { readonly __typename?: "Anilist" } & Pick<
            Anilist,
            "title" | "url" | "imageMedium"
          >
        >
      }
  }

export type RecentlyAddedFeedQueryVariables = Exact<{ [key: string]: never }>

export type RecentlyAddedFeedQuery = { readonly __typename?: "Query" } & {
  readonly recentlyAdded: ReadonlyArray<
    { readonly __typename?: "Entry" } & EntryComponentFragment
  >
}

export type AnimePageQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type AnimePageQuery = { readonly __typename?: "Query" } & {
  readonly anime: Maybe<
    { readonly __typename?: "Anime" } & Pick<Anime, "id"> & {
        readonly anilist: Maybe<
          { readonly __typename?: "Anilist" } & Pick<
            Anilist,
            "title" | "banner" | "url"
          >
        >
        readonly entries: ReadonlyArray<
          { readonly __typename?: "Entry" } & Pick<
            Entry,
            "id" | "source" | "createdAt"
          > & {
              readonly group: { readonly __typename?: "Group" } & Pick<
                Group,
                "id" | "name"
              >
              readonly images: ReadonlyArray<
                { readonly __typename?: "Image" } & Pick<
                  Image,
                  "id" | "filename" | "timestamp"
                >
              >
            }
        >
      }
  >
}

export type CreateJobAnimeQueryVariables = Exact<{
  id: Scalars["Int"]
}>

export type CreateJobAnimeQuery = { readonly __typename?: "Query" } & {
  readonly anime: Maybe<
    { readonly __typename?: "Anime" } & {
      readonly anilist: Maybe<
        { readonly __typename?: "Anilist" } & Pick<
          Anilist,
          "title" | "imageLarge" | "url"
        >
      >
      readonly entries: ReadonlyArray<
        { readonly __typename?: "Entry" } & Pick<Entry, "id">
      >
    }
  >
}

export type CreateJobMutationVariables = Exact<{
  animeId: Scalars["Int"]
  source: Scalars["String"]
  fileName: Maybe<Scalars["String"]>
  timestamps: ReadonlyArray<Scalars["Timestamp"]> | Scalars["Timestamp"]
  group: Maybe<Scalars["String"]>
}>

export type CreateJobMutation = { readonly __typename?: "Mutation" } & {
  readonly createJob: { readonly __typename?: "Job" } & Pick<
    Job,
    "id" | "inProgress"
  > & {
      readonly anime: { readonly __typename?: "Anime" } & {
        readonly anilist: Maybe<
          { readonly __typename?: "Anilist" } & Pick<Anilist, "title">
        >
      }
    }
}

export const EntryComponentFragmentDoc = /*#__PURE__*/ gql`
  fragment EntryComponent on Entry {
    id
    source
    episode
    createdAt
    group {
      id
      name
    }
    anime {
      id
      anilist {
        title
        url
        imageMedium
      }
    }
  }
`
export const RecentlyAddedFeedDocument = /*#__PURE__*/ gql`
  query RecentlyAddedFeed {
    recentlyAdded {
      ...EntryComponent
    }
  }
  ${EntryComponentFragmentDoc}
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
export const AnimePageDocument = /*#__PURE__*/ gql`
  query AnimePage($id: Int!) {
    anime(id: $id) {
      id
      anilist {
        title
        banner
        url
      }
      entries {
        id
        source
        createdAt
        group {
          id
          name
        }
        images {
          id
          filename
          timestamp
        }
      }
    }
  }
`

/**
 * __useAnimePageQuery__
 *
 * To run a query within a Vue component, call `useAnimePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimePageQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAnimePageQuery({
 *   id: // value for 'id'
 * });
 */
export function useAnimePageQuery(
  variables:
    | AnimePageQueryVariables
    | VueCompositionApi.Ref<AnimePageQueryVariables>
    | ReactiveFunction<AnimePageQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        AnimePageQuery,
        AnimePageQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          AnimePageQuery,
          AnimePageQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          AnimePageQuery,
          AnimePageQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<AnimePageQuery, AnimePageQueryVariables>(
    AnimePageDocument,
    variables,
    options,
  )
}
export type AnimePageQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  AnimePageQuery,
  AnimePageQueryVariables
>
export const CreateJobAnimeDocument = /*#__PURE__*/ gql`
  query CreateJobAnime($id: Int!) {
    anime(id: $id) {
      anilist {
        title
        imageLarge
        url
      }
      entries {
        id
      }
    }
  }
`

/**
 * __useCreateJobAnimeQuery__
 *
 * To run a query within a Vue component, call `useCreateJobAnimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateJobAnimeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCreateJobAnimeQuery({
 *   id: // value for 'id'
 * });
 */
export function useCreateJobAnimeQuery(
  variables:
    | CreateJobAnimeQueryVariables
    | VueCompositionApi.Ref<CreateJobAnimeQueryVariables>
    | ReactiveFunction<CreateJobAnimeQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        CreateJobAnimeQuery,
        CreateJobAnimeQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CreateJobAnimeQuery,
          CreateJobAnimeQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CreateJobAnimeQuery,
          CreateJobAnimeQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<
    CreateJobAnimeQuery,
    CreateJobAnimeQueryVariables
  >(CreateJobAnimeDocument, variables, options)
}
export type CreateJobAnimeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  CreateJobAnimeQuery,
  CreateJobAnimeQueryVariables
>
export const CreateJobDocument = /*#__PURE__*/ gql`
  mutation CreateJob(
    $animeId: Int!
    $source: String!
    $fileName: String
    $timestamps: [Timestamp!]!
    $group: String
  ) {
    createJob(
      animeId: $animeId
      source: $source
      fileName: $fileName
      timestamps: $timestamps
      group: $group
    ) {
      id
      anime {
        anilist {
          title
        }
      }
      inProgress
    }
  }
`

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateJobMutation({
 *   variables: {
 *     animeId: // value for 'animeId'
 *     source: // value for 'source'
 *     fileName: // value for 'fileName'
 *     timestamps: // value for 'timestamps'
 *     group: // value for 'group'
 *   },
 * });
 */
export function useCreateJobMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        CreateJobMutation,
        CreateJobMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          CreateJobMutation,
          CreateJobMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    CreateJobMutation,
    CreateJobMutationVariables
  >(CreateJobDocument, options)
}
export type CreateJobMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateJobMutation,
  CreateJobMutationVariables
>
