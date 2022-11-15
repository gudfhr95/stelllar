import { Logger } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Image } from "../common/entity/image.entity";
import { LinkMetadata } from "../common/entity/link-metadata.entity";
import { LinkMetadataArgs } from "./input/link-metadata.args";
import { ScraperService } from "./scraper.service";

@Resolver(() => LinkMetadata)
export class ScraperResolver {
  constructor(private readonly scraperService: ScraperService) {}

  @Query(() => LinkMetadata, { nullable: true })
  async getLinkMetadata(@Args() args: LinkMetadataArgs) {
    Logger.log("getLinkMetadata");

    return await this.scraperService.scrapeMetadata(args.linkUrl.toString());
  }

  @ResolveField("image", () => Image, { nullable: true })
  image(@Parent() linkMetadata: LinkMetadata) {
    const image = linkMetadata.image;
    if (!image) {
      return null;
    }

    image.smallWidth = this.scraperService.getSmallWidth(image);
    image.smallHeight = this.scraperService.getSmallHeight(image);
    image.popupWidth = this.scraperService.getPopupWidth(image);
    image.popupHeight = this.scraperService.getPopupHeight(image);

    return image;
  }
}
