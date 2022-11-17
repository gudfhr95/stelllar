import { useState } from "react";
import { LinkMetadata } from "../../graphql/hooks";
import MessageImageDialog from "../message/MessageImageDialog";
import CustomEmbed, { canEmbed } from "../ui/CustomEmbed";
import { IconLinkExternal, IconPlay } from "../ui/icons/Icons";

type PostEmbed = {
  metadata: LinkMetadata;
  dark?: boolean;
};

export default function PostEmbed({ metadata, dark = false }: PostEmbed) {
  const [playing, setPlaying] = useState(false);

  const embeddable = canEmbed(metadata.url as string);

  const themeColor: any = metadata.themeColor
    ?.replaceAll(" ", "")
    .trim()
    .toLowerCase();

  const isWhite =
    !themeColor ||
    themeColor.startsWith("rgb(255,255,255") ||
    themeColor.startsWith("rgba(255,255,255") ||
    (themeColor.startsWith("#") &&
      ![...themeColor.substring(1)].find((c) => c !== "f"));

  return (
    <div>
      <div
        className={`rounded inline-flex transition ${
          dark
            ? `dark:bg-gray-850 ${isWhite ? "dark:border-gray-950" : ""}`
            : `dark:bg-gray-800 ${isWhite ? "dark:border-gray-900" : ""}`
        } pt-4 border-l-4`}
        style={isWhite ? {} : ({ borderColor: metadata.themeColor } as any)}
      >
        <div className="flex-grow rounded-r-md pl-4 pr-4 pb-4 flex flex-col">
          <div className="max-w-[400px] space-y-3">
            {metadata.publisher && (
              <div className="text-xs text-secondary">{metadata.publisher}</div>
            )}
            <div className="leading-none">
              <a
                href={metadata.url as string}
                rel="noopener nofollow noreferrer"
                target="_blank"
                className="text-sm font-semibold text-blue-400 hover:underline"
              >
                {metadata.title ?? "No title"}
              </a>
            </div>

            {metadata.description && !embeddable && (
              <div
                className="text-13 text-secondary line-clamp-9"
                dangerouslySetInnerHTML={{
                  __html: metadata.description ?? "No description",
                }}
              />
            )}

            {(embeddable ||
              (metadata.image &&
                metadata.twitterCard === "summary_large_image")) && (
              <div className={`pt-1 ${playing ? "min-w-[400px]" : ""}`}>
                {playing ? (
                  <CustomEmbed url={metadata.url as string} />
                ) : (
                  <div
                    className="max-w-[400px] w-full relative rounded cursor-pointer"
                    onClick={() => {
                      if (embeddable) {
                        setPlaying(true);
                      }
                    }}
                  >
                    {embeddable ? (
                      <>
                        <img
                          alt="Thumbnail"
                          src={metadata.image?.smallUrl ?? undefined}
                          className="rounded select-none"
                          height={metadata.image?.smallHeight}
                          width={metadata.image?.smallWidth}
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-tertiary rounded-full bg-black bg-opacity-75 flex space-x-3 p-3">
                            <IconPlay className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" />
                            <IconLinkExternal
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                window.open(metadata.url as string, "_blank");
                              }}
                              className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <MessageImageDialog image={metadata.image ?? undefined} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!!metadata.image &&
          metadata.twitterCard !== "summary_large_image" &&
          !embeddable && (
            <div className="pr-4">
              <MessageImageDialog
                width={80}
                height={80}
                image={metadata.image}
              />
            </div>
          )}
      </div>
    </div>
  );
}
