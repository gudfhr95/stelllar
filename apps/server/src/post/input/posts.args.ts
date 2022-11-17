import { ArgsType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { Max, Min } from "class-validator";
import { GraphQLNonNegativeInt, GraphQLPositiveInt } from "graphql-scalars";

@ArgsType()
export class PostsArgs {
  @Field(() => GraphQLNonNegativeInt, { defaultValue: 0 })
  @Min(0)
  offset = 0;

  @Field(() => GraphQLPositiveInt, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  limit = 20;

  @Field(() => PostsSort, {
    defaultValue: "Hot",
  })
  sort: PostsSort = PostsSort.Hot;

  @Field(() => PostsTime, {
    defaultValue: "All",
  })
  time: PostsTime = PostsTime.All;

  @Field(() => PostsFeed, {
    defaultValue: "Joined",
  })
  feed: PostsFeed = PostsFeed.Joined;

  @Field({ nullable: true })
  serverName?: string;

  @Field(() => ID, {
    nullable: true,
  })
  folderId?: string;

  @Field({
    nullable: true,
  })
  search?: string;
}

export enum PostsFeed {
  Joined = "Joined",
  Featured = "Featured",
  All = "All",
}

registerEnumType(PostsFeed, {
  name: "PostsFeed",
});

export enum PostsSort {
  New = "New",
  Top = "Top",
  Hot = "Hot",
  Added = "Added",
}

registerEnumType(PostsSort, {
  name: "PostsSort",
});

export enum PostsTime {
  Hour = "Hour",
  Day = "Day",
  Week = "Week",
  Month = "Month",
  Year = "Year",
  All = "All",
}

registerEnumType(PostsTime, {
  name: "PostsTime",
});
