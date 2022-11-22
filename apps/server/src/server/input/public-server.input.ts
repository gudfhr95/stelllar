import { ArgsType, Field, registerEnumType } from "@nestjs/graphql";
import { ServerCategory } from "../entity/server-category.enum";

@ArgsType()
export class PublicServersArgs {
  @Field(() => PublicServersSort, { defaultValue: "Top" })
  sort: PublicServersSort = PublicServersSort.Top;

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory;
}

export enum PublicServersSort {
  New = "New",
  Top = "Top",
}

registerEnumType(PublicServersSort, {
  name: "PublicServersSort",
});
