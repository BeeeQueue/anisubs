import { IsMagnetURI, Matches } from "class-validator"
import { Field, ID, Int, ObjectType } from "type-graphql"
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"

import { Anime } from "@/modules/anime/anime.model"
import { Group } from "@/modules/group/group.model"
import { Image } from "@/modules/image/image.model"

@Entity()
@ObjectType()
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  uuid!: string

  @Column()
  @Field(() => Int)
  episode!: number

  @Column()
  @IsMagnetURI()
  @Field()
  // TODO: make private
  source!: string

  @Column()
  @Matches(/.*\.[a-zA-Z\d]{2,}/, { message: "Not a filename." })
  @Field()
  filename!: string

  @ManyToOne(() => Anime, (anime) => anime.entries)
  anime!: Anime

  @ManyToOne(() => Group, (group) => group.entries)
  group!: Anime

  @OneToMany(() => Image, (image) => image.entry)
  images!: Image[]
}
