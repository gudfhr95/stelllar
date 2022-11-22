import ctl from "@netlify/classnames-template-literals";
import { Tweet } from "react-twitter-widgets";
import YouTube from "react-youtube";

const twitterRegex =
  /^https?:\/\/twitter\.com\/(?:#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/;
const bannedVideoRegex = /^https?:\/\/banned\.video\/watch\?id=((?:\w){24})/;
const spotifyRegex =
  /^https?:\/\/open\.(?:spotify\.com\/)(?:embed\/)?(track|playlist|album)\/((?:\w){22})/;
const gfycatRegex = /^https?:\/\/gfycat\.com\/(\w+)/;
const bitchuteRegex = /^https?:\/\/www\.bitchute\.com\/video\/(\w+)/;
const youtubeRegex = /^https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
const youtubeShortRegex = /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
const twitchClipsRegex = /^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/;

const isTwitter = (url: string) => twitterRegex.test(url);
const isBannedVideo = (url: string) => bannedVideoRegex.test(url);
const isSpotify = (url: string) => spotifyRegex.test(url);
const isGfycat = (url: string) => gfycatRegex.test(url);
const isBitchute = (url: string) => bitchuteRegex.test(url);
const isYoutube = (url: string) => youtubeRegex.test(url);
const isYoutubeShort = (url: string) => youtubeShortRegex.test(url);
const isTwitchClips = (url: string) => twitchClipsRegex.test(url);

export const canEmbed = (url: string) =>
  url &&
  (isTwitter(url) ||
    isBannedVideo(url) ||
    isSpotify(url) ||
    isGfycat(url) ||
    isBitchute(url) ||
    isYoutube(url) ||
    isTwitchClips(url));

const containerClass = ctl(`aspect-h-9 aspect-w-16 relative`);
const embedClass = ctl(`w-full h-full`);

type CustomEmbed = {
  url: string;
};

export default function CustomEmbed({ url }: CustomEmbed) {
  if (isTwitter(url)) {
    const tweetId = url.match(twitterRegex)![1];

    return (
      <Tweet
        tweetId={tweetId}
        options={{
          theme: "dark",
          align: "center",
          dnt: true,
        }}
      />
    );
  }

  if (isBannedVideo(url)) {
    const videoId = url.match(bannedVideoRegex)![1];

    return (
      <div className={containerClass}>
        <iframe
          src={`https://api.banned.video/embed/${videoId}?autoplay=false&amp;muted=false`}
          frameBorder="0"
          allowFullScreen
          className={embedClass}
        />
      </div>
    );
  }

  if (isSpotify(url)) {
    const spotifyMatch = url.match(spotifyRegex)!;
    const spotifyType = spotifyMatch[1];
    const spotifyId = spotifyMatch[2];

    return (
      <div className={containerClass}>
        <iframe
          src={`https://open.spotify.com/embed/${spotifyType}/${spotifyId}`}
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
          className={embedClass}
        />
      </div>
    );
  }

  if (isGfycat(url)) {
    const gfycatId = url.match(gfycatRegex)![1];

    return (
      <div className={containerClass}>
        <iframe
          src={`https://gfycat.com/ifr/${gfycatId}`}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          className={embedClass}
        />
      </div>
    );
  }

  if (isBitchute(url)) {
    const videoId = url.match(bitchuteRegex)![1];

    return (
      <div className={containerClass}>
        <iframe
          src={`https://www.bitchute.com/embed/${videoId}/`}
          frameBorder="0"
          allowFullScreen
          className={embedClass}
        />
      </div>
    );
  }

  if (isYoutube(url) || isYoutubeShort(url)) {
    const videoId = isYoutube(url)
      ? url.match(youtubeRegex)![1]
      : url.match(youtubeShortRegex)![1];

    return (
      <YouTube
        videoId={videoId}
        className="relative w-full h-0 aspect-h-9 aspect-w-16 overflow-hidden youtube"
        opts={{
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 1,
          },
        }}
      />
    );
  }

  if (isTwitchClips(url)) {
    const clipId = url.match(twitchClipsRegex)![1];

    return (
      <div className={containerClass}>
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${clipId}&parent=localhost&parent=stelllar.co`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          className={embedClass}
        />
      </div>
    );
  }

  return null;
}
