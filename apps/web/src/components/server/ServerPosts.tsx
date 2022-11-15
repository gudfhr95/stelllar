import { Virtuoso } from "react-virtuoso";

type ServerPosts = {
  serverId: string;
  header: any;
};

export default function ServerPosts({ serverId, header }: ServerPosts) {
  return (
    <>
      <Virtuoso
        className="scrollbar-custom dark:bg-gray-750 bg-gray-100"
        components={{
          Header: header ? () => header : undefined,
        }}
      />
    </>
  );
}
