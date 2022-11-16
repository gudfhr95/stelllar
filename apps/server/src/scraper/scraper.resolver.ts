import { Logger } from "@nestjs/common";
import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Image } from "../common/entity/image.entity";
import { LinkMetadata } from "../common/entity/link-metadata.entity";
import { FileService } from "../file/file.service";
import { LinkMetadataArgs } from "./input/link-metadata.args";
import { ScraperService } from "./scraper.service";

@Resolver(() => LinkMetadata)
export class ScraperResolver {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly fileService: FileService
  ) {}

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

    image.smallWidth = this.fileService.getSmallWidth(image);
    image.smallHeight = this.fileService.getSmallHeight(image);
    image.popupWidth = this.fileService.getPopupWidth(image);
    image.popupHeight = this.fileService.getPopupHeight(image);

    return image;
  }
}
