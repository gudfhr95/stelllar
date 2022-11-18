import ctl from "@netlify/classnames-template-literals";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  Comment as CommentType,
  useCommentVoteMutation,
  VoteType,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
} from "../ui/icons/Icons";
import UserAvatar from "../user/UserAvatar";

const replyBtnClass = ctl(`
  ml-2
  text-13
  text-gray-500
  hover:text-gray-700
  dark:hover:text-gray-300
  font-medium
  leading-none
  select-none
  cursor-pointer
`);

type Comment = {
  comment: CommentType;
  level?: number;
};
export default function Comment({ comment, level = 0 }: Comment) {
  const router = useRouter();
  const user = useAuth();

  const [commentVote] = useCommentVoteMutation();

  const onClickUpVote = (e: any) => {
    if (!user) {
      toast.error("Login to vote");
      return;
    }

    commentVote({
      variables: {
        input: {
          commentId: comment.id,
          type: comment.voteType === VoteType.Up ? VoteType.None : VoteType.Up,
        },
      },
    }).then(() => router.replace(router.asPath));
  };

  const onClickDownVote = (e: any) => {
    if (!user) {
      toast.error("Login to vote");
      return;
    }

    commentVote({
      variables: {
        input: {
          commentId: comment.id,
          type:
            comment.voteType === VoteType.Down ? VoteType.None : VoteType.Down,
        },
      },
    }).then(() => router.replace(router.asPath));
  };

  return (
    <div
      className={`relative md:rounded dark:bg-gray-800 bg-gray-200 ${
        level === 0 ? "" : "pl-4"
      }`}
    >
      <div id={comment.id} />

      <div className="flex px-3 pt-3">
        <UserAvatar
          avatarUrl={comment.author?.image}
          size={7}
          className={`cursor-pointer transition ${
            !comment.author ? "opacity-40 dark:bg-gray-700" : "hover:opacity-90"
          }`}
        />
        <div className={`pl-3 pb-3 w-full`}>
          <div className="flex items-end pb-1.5">
            <div
              className={`text-sm font-medium cursor-pointer hover:underline leading-none`}
            >
              {comment.author?.name ?? (
                <span className="text-mid">[deleted]</span>
              )}
            </div>
            <div className="text-11 text-mid font-medium pl-2 leading-none">
              {formatDistanceToNowStrict(new Date(comment.createdAt))}
              &nbsp;ago
            </div>
          </div>

          <div
            className="prose prose-sm dark:prose-dark max-w-none"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />

          <div className="flex items-center pt-1 -ml-2">
            <div className="flex items-center">
              <button
                type="button"
                className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 ${
                  comment.voteType === VoteType.Up ? "text-red-400" : "text-mid"
                }`}
                onClick={onClickUpVote}
              >
                <IconChevronUp className="w-5 h-5" />
              </button>
              <div
                className={`text-13 leading-none font-semibold ${
                  comment.voteType === VoteType.Up ? "text-red-400" : ""
                } ${
                  comment.voteType === VoteType.Down ? "text-blue-400" : ""
                } ${comment.voteType === VoteType.None ? "text-tertiary" : ""}`}
              >
                {comment.voteCount}
              </div>
              <button
                type="button"
                className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer ${
                  comment.voteType === VoteType.Down
                    ? "text-blue-400"
                    : "text-mid"
                }`}
                onClick={onClickDownVote}
              >
                <IconChevronDown className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`ml-2 text-disabled flex items-center cursor-pointer`}
            >
              <IconDotsVertical className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
