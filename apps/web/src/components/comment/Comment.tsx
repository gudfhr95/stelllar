import ctl from "@netlify/classnames-template-literals";
import { formatDistanceToNowStrict } from "date-fns";
import * as Locales from "date-fns/locale";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Post, useCommentVoteMutation, VoteType } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useEditComment } from "../../hooks/useEditComment";
import { useReplyComment } from "../../hooks/useReplyComment";
import ContextMenuTrigger from "../ui/context/ContextMenuTrigger";
import { ContextMenuType } from "../ui/context/ContextMenuType";
import {
  IconChevronDown,
  IconChevronUp,
  IconDotsVertical,
} from "../ui/icons/Icons";
import UserAvatar from "../user/UserAvatar";
import CreateCommentEditor from "./CreateCommentEditor";
import EditCommentEditor from "./EditCommentEditor";

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
  post: Post;
  comment: any;
  setParentComment?: any;
  level?: number;
};
export default function Comment({
  post,
  comment,
  setParentComment,
  level = 0,
}: Comment) {
  const { i18n, t } = useTranslation("comment");
  const router = useRouter();
  const user = useAuth();

  const [commentVote] = useCommentVoteMutation();

  const { replyingCommentId, setReplyingCommentId } = useReplyComment();
  const { editingCommentId, setEditingCommentId } = useEditComment();

  const [collapse, setCollapse] = useState(false);

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

  const isReplying = replyingCommentId === comment.id;
  const isEditing = editingCommentId === comment.id;
  const onClickReply = () => {
    if (isReplying) {
      setEditingCommentId(null);
      setReplyingCommentId(null);
    } else {
      setEditingCommentId(null);
      setReplyingCommentId(comment.id);
    }
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
        <div
          className={`pl-3 pb-3 w-full${
            !!comment.childCount && !collapse
              ? "border-b dark:border-gray-750"
              : ""
          }`}
        >
          <div className="flex items-end pb-1.5">
            <div
              className={`text-sm font-medium cursor-pointer hover:underline leading-none`}
            >
              {comment.author?.name ?? (
                <span className="text-mid">[deleted]</span>
              )}
            </div>
            <div className="text-11 text-mid font-medium pl-2 leading-none">
              {formatDistanceToNowStrict(new Date(comment.createdAt), {
                // @ts-ignore
                locale: Locales[i18n.language],
              })}
              &nbsp;{t("ago")}
            </div>
          </div>

          {comment.isDeleted ? (
            <div className="prose prose-sm dark:prose-dark max-w-none">
              <span>{t("deletedComment")}</span>
            </div>
          ) : (
            <div
              className="prose prose-sm dark:prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          )}

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

            {!!comment.childCount && (
              <div
                className={replyBtnClass}
                onClick={() => setCollapse(!collapse)}
              >
                {collapse
                  ? `${t("reply.show")} (${comment.childCount})`
                  : t("reply.hide")}
              </div>
            )}

            {user && (
              <>
                <div className={replyBtnClass} onClick={onClickReply}>
                  {isReplying ? t("reply.cancel") : t("reply.label")}
                </div>
              </>
            )}

            {!comment.isDeleted && user?.id === comment.author.id && (
              <ContextMenuTrigger
                leftClick
                data={{ type: ContextMenuType.Comment, comment, post }}
              >
                <div
                  className={`ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
                >
                  <IconDotsVertical className="w-4 h-4" />
                </div>
              </ContextMenuTrigger>
            )}
          </div>

          {isReplying && (
            <div className="pt-3 max-w-screen-md w-full">
              <CreateCommentEditor
                postId={post.id}
                parentCommentId={comment.id}
                setOpen={() => setReplyingCommentId(null)}
              />
            </div>
          )}
          {isEditing && (
            <div className="pt-3 max-w-screen-md w-full">
              <EditCommentEditor
                comment={comment}
                setOpen={() => setEditingCommentId(null)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="pl-3">
        {!collapse &&
          comment.childComments.map((childComment: any) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              level={level + 1}
              setParentComment={setParentComment}
              post={post}
            />
          ))}
      </div>
    </div>
  );
}
