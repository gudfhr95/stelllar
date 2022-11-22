import { useRouter } from "next/router";
import ServerAvatar from "./ServerAvatar";
import ServerListItem from "./ServerListItem";

type ServerListServer = {
  name: string;
  displayName: string;
  avatarUrl: string | null;
};

export default function ServerListServer({
  name,
  displayName,
  avatarUrl,
}: ServerListServer) {
  const router = useRouter();

  const active = name === router.query.planet;
  return (
    <>
      <ServerListItem
        to={`/planets/${name}`}
        name={displayName}
        active={active}
      >
        <ServerAvatar
          name={name}
          displayName={displayName}
          avatarUrl={avatarUrl}
          size={12}
          className={`bg-gray-200 h-12 w-12 dark:bg-gray-800 group-hover:rounded-2xl transition-all ${
            active ? "rounded-2xl" : "rounded-3xl"
          }`}
        />
      </ServerListItem>
    </>
  );
}
