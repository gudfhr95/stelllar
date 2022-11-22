import { Embeddable, Embedded } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { Image } from "../../common/entity/image.entity";

@Embeddable()
@ObjectType()
export class PostImage {
  @Field(() => Image)
  @Embedded({ entity: () => Image, object: true })
  image: Image;
}
