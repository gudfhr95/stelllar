import { Injectable } from "@nestjs/common";
import { isURL } from "class-validator";
import got from "got-cjs";
import metascraper from "metascraper";
import metascraperAuthor from "metascraper-author";
import metascraperClearbit from "metascraper-clearbit";
import metascraperDate from "metascraper-date";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";
import metascraperPublisher from "metascraper-publisher";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";
import metascraperYoutube from "metascraper-youtube";
import sanitizeHtml from "sanitize-html";
import UserAgent from "user-agents";
import { LinkMetadata } from "../common/entity/link-metadata.entity";
import { FileService } from "../file/file.service";

const TIMEOUT = 5000;

const metascraperTwitterCard: any = () => ({
  twitterCard: [
    ({ htmlDom: $ }) => $('meta[name="twitter:card"]').attr("content"),
    ({ htmlDom: $ }) => $('meta[property="twitter:card"]').attr("content"),
  ],
});

const metascraperThemeColor: any = () => ({
  themeColor: [
    ({ htmlDom: $ }) => $('meta[name="theme-color"]').attr("content"),
  ],
});

@Injectable()
export class ScraperService {
  private readonly metascraper;

  constructor(private readonly fileService: FileService) {
    this.metascraper = metascraper([
      metascraperAuthor(),
      metascraperDate(),
      metascraperDescription(),
      metascraperImage(),
      metascraperLogo(),
      metascraperClearbit(),
      metascraperPublisher(),
      metascraperTitle(),
      metascraperUrl(),
      metascraperYoutube(),
      metascraperTwitterCard(),
      metascraperThemeColor(),
    ]);
  }

  async scrapeMetadata(targetUrl: string) {
    if (!isURL(targetUrl)) return null;

    const userAgent = new UserAgent().toString();
    let res;
    try {
      res = await got(targetUrl, {
        timeout: { request: TIMEOUT },
        headers: {
          "user-agent": userAgent,
        },
      });
    } catch (e) {
      return null;
    }

    const { body: html, url } = res;
    if (!isURL(url)) return null;

    let metadata;
    try {
      metadata = await this.metascraper({ html, url });
    } catch (e) {
      return null;
    }

    if (!metadata.title) return null;

    // Strip HTML tags
    if (metadata.description)
      metadata.description = sanitizeHtml(metadata.description, {
        allowedTags: [],
        allowedAttributes: {},
      });

    if (metadata.date) metadata.date = new Date(metadata.date);

    metadata.imageUrl = metadata.image;
    metadata.logoUrl = metadata.logo;
    delete metadata.image;
    delete metadata.logo;
    const { imageUrl } = metadata;

    if (imageUrl) {
      try {
        metadata.image = await this.fileService.uploadImageUrl(imageUrl);
      } catch (e) {
        delete metadata.imageUrl;
        delete metadata.image;
      }
    }

    return metadata as LinkMetadata;
  }
}
