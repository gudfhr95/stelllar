import { useTranslation } from "next-i18next";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import UserAvatar from "../user/UserAvatar";
import CommentEditor from "./CommentEditor";

type CreateCommentCard = {
  postId: string;
};

export default function CreateCommentCard({ postId }: CreateCommentCard) {
  const { t } = useTranslation("comment");
  const user = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      {!open ? (
        <div
          onClick={() => setOpen(true)}
          className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200"
        >
          <div className="px-3 border-r dark:border-gray-650 h-7">
            <UserAvatar avatarUrl={user.image} size={7} />
          </div>
          <div className="text-sm text-secondary px-3">{t("create")}</div>
        </div>
      ) : (
        <div className="dark:bg-gray-800 bg-gray-200 pt-3 pb-3 px-3 rounded flex">
          <div className="pr-3 mr-3 border-r dark:border-gray-750 inline-block h-7">
            <UserAvatar avatarUrl={user.image} size={7} />
          </div>

          <CommentEditor postId={postId} setOpen={setOpen} />
        </div>
      )}
    </>
  );
}
