import { ArgsType, Field, ID, registerEnumType } from "@nestjs/graphql";

export enum CommentsSort {
  New = "New",
  Top = "Top",
}

@ArgsType()
export class CommentsArgs {
  @Field(() => ID, { nullable: true })
  postId: string;

  @Field(() => CommentsSort, { defaultValue: "Top" })
  sort: CommentsSort = CommentsSort.Top;
}

registerEnumType(CommentsSort, {
  name: "CommentsSort",
});
