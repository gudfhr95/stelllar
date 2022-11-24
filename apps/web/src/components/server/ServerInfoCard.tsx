import { useTranslation } from "next-i18next";
import Link from "next/link";
import { getCategoryIcon } from "../../utils/getCategoryIcon";
import { IconPost, IconUsers } from "../ui/icons/Icons";
import ServerAvatar from "./ServerAvatar";

type ServerInfoCard = {
  name: string;
  displayName: string;
  description?: string | null;
  category?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  userCount?: number;
  postCount?: number;
  shadow?: boolean;
  className?: string;
};

export default function ServerInfoCard({
  name,
  displayName,
  description = null,
  category = null,
  avatarUrl = null,
  bannerUrl = null,
  userCount = 0,
  postCount = 0,
  shadow = false,
  className = "",
}: ServerInfoCard) {
  const { t } = useTranslation("explore");

  const CategoryIcon = getCategoryIcon(category);

  return (
    <>
      <Link
        href={`/planets/${name}`}
        className={`${className} relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl bg-white ${
          shadow ? "shadow-lg" : ""
        }`}
      >
        <div
          className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600"
          style={
            bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : undefined
          }
        >
          <div className="absolute left-4 -bottom-3">
            <ServerAvatar
              name={name}
              displayName={displayName}
              avatarUrl={avatarUrl}
              size={10}
              className="dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 ring-white transition dark:group-hover:ring-gray-850 group-hover:shadow-md bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow px-4 pt-5 pb-4 h-40">
          <div className="text-lg font-semibold text-secondary">
            {displayName}
          </div>

          <div className="text-13 text-tertiary line-clamp-3 pt-1">
            {description || "No description"}
          </div>

          <div className="flex mt-auto text-xs">
            <div className="inline-flex items-center">
              <IconUsers className="w-4 h-4 text-tertiary" />
              <div className="ml-2 text-tertiary">{userCount}</div>
            </div>
          </div>

          <div className="flex mt-auto text-xs">
            <div className="inline-flex items-center">
              <IconPost className="w-4 h-4 text-tertiary" />
              <div className="ml-2 text-tertiary">{postCount}</div>
            </div>

            <div className="ml-auto inline-flex items-center">
              <CategoryIcon className="w-4 h-4 text-tertiary" />
              <div className="ml-2 text-tertiary">
                {t(`category.${category}`)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
