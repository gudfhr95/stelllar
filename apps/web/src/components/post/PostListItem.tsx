import { formatDistanceToNowStrict } from "date-fns";
import * as Locales from "date-fns/locale";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { memo, MouseEvent } from "react";
import { Post, usePostVoteMutation, User, VoteType } from "../../graphql/hooks";
import { useLoginDialog } from "../../hooks/useLoginDialog";
import ServerAvatar from "../server/ServerAvatar";
import ContextMenuTrigger from "../ui/context/ContextMenuTrigger";
import { ContextMenuType } from "../ui/context/ContextMenuType";
import {
  IconChat,
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
  IconLinkWeb,
  IconText,
} from "../ui/icons/Icons";

type PostListItem = {
  post: Post;
  user?: User | null;
  className?: string;
};

export default memo(function PostListItem({
  post,
  user = null,
  className = "",
}: PostListItem) {
  const { i18n, t } = useTranslation("post");
  const router = useRouter();

  const [postVote] = usePostVoteMutation();

  const { setLoginDialog } = useLoginDialog();

  const onClickUpVote = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (!user) {
      setLoginDialog(true);
      return;
    }

    postVote({
      variables: {
        input: {
          postId: post.id,
          type: post.voteType === VoteType.Up ? VoteType.None : VoteType.Up,
        },
      },
    });
  };

  const onClickDownVote = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (!user) {
      setLoginDialog(true);
      return;
    }

    postVote({
      variables: {
        input: {
          postId: post.id,
          type: post.voteType === VoteType.Down ? VoteType.None : VoteType.Down,
        },
      },
    });
  };

  const onClickServer = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    router.push(`/planets/${post.server.name}`);
  };

  return (
    <div
      className={`${className} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 bg-gray-200 px-2 py-3 md:rounded flex hover:bg-gray-300`}
      onClick={() =>
        router.push(`/planets/${post.server.name}/posts/${post.id}`)
      }
    >
      <div className="flex flex-col items-center pr-2">
        <button
          type="button"
          className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 ${
            post.voteType === VoteType.Up ? "text-red-400" : "text-mid"
          }`}
          onClick={onClickUpVote}
        >
          <IconChevronUp className="w-5 h-5" />
        </button>

        <div
          className={`text-13 leading-none font-semibold ${
            post.voteType === VoteType.Up ? "text-red-400" : ""
          } ${post.voteType === VoteType.Down ? "text-blue-400" : ""} ${
            post.voteType === VoteType.None ? "text-tertiary" : ""
          }`}
        >
          {post.voteCount}
        </div>

        <button
          type="button"
          className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 ${
            post.voteType === VoteType.Down ? "text-blue-400" : "text-mid"
          }`}
          onClick={onClickDownVote}
        >
          <IconChevronDown className="w-5 h-5" />
        </button>
      </div>

      <div
        className="w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 bg-gray-300 mr-4 flex items-center justify-center bg-center bg-cover bg-no-repeat"
        style={
          post.thumbnailUrl
            ? { backgroundImage: `url(${post.thumbnailUrl})` }
            : {}
        }
      >
        {!post.thumbnailUrl && (
          <>
            {post.linkUrl ? (
              <IconLinkWeb className="w-8 h-8 text-mid" />
            ) : (
              <IconText className="w-8 h-8 text-mid" />
            )}
          </>
        )}
      </div>

      <div className="pr-4 flex-grow flex flex-col">
        <div className="flex flex-wrap items-center pb-1.5">
          <div
            onClick={onClickServer}
            className="flex items-center cursor-pointer"
          >
            <ServerAvatar
              name={post.server.name}
              displayName={post.server.displayName}
              avatarUrl={post.server.avatarUrl}
              size={5}
              className="dark:bg-gray-750 rounded-full"
            />
            <span className="ml-1.5 text-xs font-medium text-secondary">
              {post.server.displayName}
            </span>
          </div>
          <span className="text-xs text-tertiary">
            &nbsp;&middot;&nbsp;
            {formatDistanceToNowStrict(new Date(post.createdAt), {
              // @ts-ignore
              locale: Locales[i18n.language],
            })}
            &nbsp;{t("ago")}&nbsp;&middot;
          </span>
          <div className="ml-1 cursor-pointer text-tertiary text-xs font-medium leading-none">
            {post.author?.name ?? "[deleted]"}
          </div>
        </div>

        <div className="text-secondary font-medium text-base">{post.title}</div>

        <div className="flex items-center pt-1.5">
          <div
            className={`select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
          >
            <IconChat className="w-5 h-5" />
            <div className="ml-2 text-xs font-medium">{post.commentCount}</div>
          </div>

          <ContextMenuTrigger
            data={{ type: ContextMenuType.Post, post }}
            leftClick
          >
            <div
              className={`ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
            >
              <IconDotsVertical className="w-4 h-4" />
            </div>
          </ContextMenuTrigger>
        </div>
      </div>
    </div>
  );
});
