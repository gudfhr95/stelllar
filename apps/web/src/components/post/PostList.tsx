import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { usePosts } from "../../hooks/usePosts";
import EndReached from "../ui/EndReached";
import { IconSpinner } from "../ui/icons/IconSpinner";
import PostItem from "./PostListItem";

type PostList = {
  header: any;
  showServerName?: boolean;
  initialPosts: [];
};

export default function PostList({ header, initialPosts }: PostList) {
  const { t } = useTranslation("post");

  const [posts, fetching, fetchMore, hasNext] = usePosts(initialPosts);

  const virtuoso = useRef(null);

  const postItemRenderer = (postsList: any, index: number) => {
    const post = postsList[index];
    if (!post) return <div style={{ height: "1px" }} />; // returning null or zero height breaks the virtuoso
    return (
      <div className="md:px-4 pb-1.5 px-0">
        <PostItem post={post} index={index} />
      </div>
    );
  };

  return (
    <>
      <Virtuoso
        className="scrollbar-custom dark:bg-gray-750 bg-gray-100"
        components={{
          Header: header ? () => header : undefined,
          Footer: () =>
            hasNext ? (
              <div className="flex items-center justify-center h-20">
                <IconSpinner />
              </div>
            ) : (
              <EndReached>{t("endReached")}</EndReached>
            ),
        }}
        endReached={() => fetchMore()}
        itemContent={(i) => postItemRenderer(posts, i)}
        overscan={100}
        ref={virtuoso}
        style={{ overflowX: "hidden" }}
        totalCount={posts.length || 0}
      />
    </>
  );
}
