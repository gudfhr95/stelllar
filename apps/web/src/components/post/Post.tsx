import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Comment as CommentType,
  Post as PostType,
  usePostVoteMutation,
  VoteType,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import Comment from "../comment/Comment";
import CreateCommentCard from "../comment/CreateCommentCard";
import MessageImageDialog from "../message/MessageImageDialog";
import ServerAvatar from "../server/ServerAvatar";
import {
  IconChat,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconDotsVertical,
} from "../ui/icons/Icons";
import PostEmbed from "./PostEmbed";

type IPost = {
  post: PostType;
  comments: CommentType[];
  className?: string;
};

export default function Post({ post, comments, className = "" }: IPost) {
  const router = useRouter();
  const user = useAuth();

  const [postVote] = usePostVoteMutation();

  const [currentImage, setCurrentImage] = useState(0);

  const onClickUpVote = (e: any) => {
    if (!user) {
      toast.error("Login to vote");
      return;
    }

    postVote({
      variables: {
        input: {
          postId: post.id,
          type: post.voteType === VoteType.Up ? VoteType.None : VoteType.Up,
        },
      },
    }).then(() => router.replace(router.asPath));
  };

  const onClickDownVote = (e: any) => {
    if (!user) {
      toast.error("Login to vote");
      return;
    }

    postVote({
      variables: {
        input: {
          postId: post.id,
          type: post.voteType === VoteType.Down ? VoteType.None : VoteType.Down,
        },
      },
    }).then(() => router.replace(router.asPath));
  };

  return (
    <>
      <div className="md:pt-4 md:px-4 px-0 pt-0">
        <div
          className={`${className} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 bg-gray-200 px-2 py-3 md:rounded flex hover:bg-gray-300`}
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

          <div className="pr-4 flex-grow flex flex-col">
            <div className="flex flex-wrap items-center pb-1.5">
              <Link
                href={`/planets/${post.server.name}`}
                className="flex items-center"
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
              </Link>
              <span className="text-xs text-tertiary">
                &nbsp;&middot;&nbsp;
                {formatDistanceToNowStrict(new Date(post.createdAt))}
                &nbsp;ago&nbsp;by
              </span>
              <div className="ml-1 cursor-pointer text-tertiary text-xs font-medium leading-none">
                {post.author?.name ?? "[deleted]"}
              </div>
            </div>

            <div className="text-secondary font-medium text-base">
              {post.title}
            </div>

            <div className="mt-0.5 pb-2">
              {post.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.text }}
                  className="prose prose-sm dark:prose-dark max-w-none pt-0.5"
                />
              )}

              {post.linkUrl && (
                <>
                  {post.linkMetadata ? (
                    <div className="max-w-screen-sm w-full mt-2">
                      <PostEmbed dark metadata={post.linkMetadata} />
                    </div>
                  ) : (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                      className="text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"
                    >
                      {post.linkUrl}
                    </a>
                  )}
                </>
              )}

              {!!post.images.length && (
                <div className="mt-2 max-w-[400px]">
                  <div className="flex relative">
                    <div className="w-full h-[300px] relative flex items-center justify-center dark:bg-gray-775">
                      {post.images.map((image, i) => (
                        <div
                          key={i}
                          className={`select-none ${
                            i === currentImage ? "block" : "hidden"
                          }`}
                        >
                          <MessageImageDialog
                            rounded={false}
                            image={image.image}
                            key={i}
                          />
                        </div>
                      ))}
                    </div>

                    {post.images.length > 1 && (
                      <>
                        {currentImage > 0 && (
                          <div
                            onClick={() => setCurrentImage(currentImage - 1)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                          >
                            <IconChevronLeft className="w-5 h-5 dark:text-black" />
                          </div>
                        )}

                        {currentImage < post.images.length - 1 && (
                          <div
                            onClick={() => setCurrentImage(currentImage + 1)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                          >
                            <IconChevronRight className="w-5 h-5 dark:text-black" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center pt-1.5">
              <div
                className={`select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconChat className="w-5 h-5" />
                <div className="ml-2 text-xs font-medium">
                  {post.commentCount}
                </div>
              </div>

              <div
                className={`ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconDotsVertical className="text-disabled w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <div className="pt-4 px-4">
          <CreateCommentCard postId={post.id} />
        </div>
      )}

      <div className="space-y-2 md:px-4 pt-4 px-0 pb-96">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
