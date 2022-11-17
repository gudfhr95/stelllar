import { useTranslation } from "next-i18next";
import { Virtuoso } from "react-virtuoso";
import useAuth from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";
import EndReached from "../ui/EndReached";
import { IconSpinner } from "../ui/icons/IconSpinner";
import CreatePostHeader from "./CreatePostHeader";
import PostItem from "./PostListItem";

type PostList = {
  showServerName?: boolean;
  initialPosts: [];
};

export default function PostList({ initialPosts }: PostList) {
  const { t } = useTranslation("post");
  const user = useAuth();

  const [posts, loading, fetchMore, hasNext] = usePosts(initialPosts);

  const renderPostItem = (posts: [], index: number) => {
    const post = posts[index];
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
          Header: () =>
            !!user ? <CreatePostHeader user={user} /> : <div className="h-4" />,
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
        itemContent={(i) => renderPostItem(posts, i)}
        overscan={100}
        style={{ overflowX: "hidden" }}
        totalCount={posts.length || 0}
      />
    </>
  );
}
