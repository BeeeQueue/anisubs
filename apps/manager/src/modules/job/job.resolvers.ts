import { UserInputError } from "apollo-server-koa"
import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql"

import { IdsService } from "@/lib/arm"
import { MyAnimeListService } from "@/lib/myanimelist"
import { getJobCount, getJobs } from "@/lib/queue"
import { Anime } from "@/modules/anime/anime.model"
import { Group } from "@/modules/group/group.model"
import { Job, JobCreationArgs } from "@/modules/job/job.model"

import { Entry } from "../entry/entry.model"
import { PaginatedResponse, PaginationArgs } from "../pagination"

@ObjectType()
export class JobPage extends PaginatedResponse(Job) {}

@Resolver()
export class JobRootResolvers {
  @Query(() => JobPage)
  async jobQueue(@Args() { limit, offset }: PaginationArgs): Promise<JobPage> {
    const jobs = await getJobs(offset, offset + limit)
    const count = await getJobCount()

    const promises = jobs.map((queueJob) => Job.fromQueueJob(queueJob))

    return {
      items: await Promise.all(promises),
      total: count,
      nextOffset: PaginatedResponse.getNextOffset({
        offset,
        limit,
        total: count,
      }),
    }
  }

  @Mutation(() => Job)
  async createJob(@Args() options: JobCreationArgs): Promise<Job> {
    return Job.createJob(options)
  }

  @Mutation(() => Job)
  async redoEntry(@Arg("entryUuid") entryUuid: string): Promise<Job> {
    const entry = await Entry.findOne(entryUuid)

    if (entry == null) {
      throw new UserInputError("Entry does not exist.")
    }

    const group = await entry.group

    return Job.createJob({
      animeId: entry.animeId,
      fileName: entry.fileName,
      source: entry.sourceUri,
      group: group.id,
      timestamps: null,
      useExistingTimestamps: false,
    })
  }
}

@Resolver(() => Job)
export class JobResolvers {
  constructor(
    private readonly idsService: IdsService,
    private readonly malService: MyAnimeListService,
  ) {}

  @FieldResolver(() => Anime)
  anime(@Root() job: Job): Anime {
    const anime = new Anime(this.idsService, this.malService)
    anime.id = job.animeId

    return anime
  }

  @FieldResolver(() => Group)
  async group(@Root() job: Job): Promise<Group> {
    return Group.findOneOrFail(job.groupId)
  }
}
