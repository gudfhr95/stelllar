import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePostsQuery } from "../graphql/hooks";

export const usePosts = (initialPosts: []) => {
  const { query } = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(
    (initialPosts.length as number) === 20
  );

  useEffect(() => {
    setPosts(initialPosts);
    setPage(1);
    setHasNext((initialPosts.length as number) === 20);
  }, [query]);

  const variables = {
    serverName: query.server as any,
    feed: query.feed as any,
    sort: query.sort as any,
    time: query.time as any,
  };

  const { loading, fetchMore } = usePostsQuery({
    variables,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const loadMore = async () => {
    if (!hasNext) {
      return;
    }

    const { data } = await fetchMore({
      variables: {
        ...variables,
        offset: 20 * page,
      },
    });

    const p = data.posts;

    if (p.length === 0) {
      setHasNext(false);
      return;
    }

    setPosts((prevPosts) => [...prevPosts, ...p] as []);
    setPage(page + 1);
  };

  return [posts, loading, loadMore, hasNext] as any;
};
