import { Module } from "@nestjs/common";
import { FileModule } from "../file/file.module";
import { ScraperResolver } from "./scraper.resolver";
import { ScraperService } from "./scraper.service";

@Module({
  imports: [FileModule],
  providers: [ScraperResolver, ScraperService],
})
export class ScraperModule {}
