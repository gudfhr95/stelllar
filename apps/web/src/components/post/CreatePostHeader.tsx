import { useTranslation } from "next-i18next";
import useAuth from "../../hooks/useAuth";
import { useCreatePostDialog } from "../../hooks/useCreatePostDialog";
import UserAvatar from "../user/UserAvatar";

type CreatePostHeader = { serverId: string };

export default function CreatePostHeader({ serverId }: CreatePostHeader) {
  const { t } = useTranslation("post");
  const user = useAuth();

  const { setCreatePostDialog } = useCreatePostDialog();

  return (
    <>
      <div className="p-4">
        <div
          onClick={() => {
            setCreatePostDialog(true);
          }}
          className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200 hover:bg-gray-300"
        >
          <div className="px-3 border-r dark:border-gray-650 border-gray-300 h-7">
            <UserAvatar avatarUrl={user.image} size={7} />
          </div>
          <div className="text-sm text-secondary px-3">{t("create.label")}</div>
        </div>
      </div>
    </>
  );
}
