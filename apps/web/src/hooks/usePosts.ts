import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePostsQuery } from "../graphql/hooks";

export const usePosts = (initialPosts: []) => {
  const { query } = useRouter();

  const [hasNext, setHasNext] = useState(
    (initialPosts.length as number) === 20
  );

  useEffect(() => {
    setHasNext((initialPosts.length as number) === 20);
  }, [query]);

  const variables = {
    serverName: query.server as any,
    feed: query.feed as any,
    sort: query.sort as any,
    time: query.time as any,
  };

  const { data, loading, fetchMore } = usePostsQuery({
    variables,
    fetchPolicy: "network-only",
  });

  const loadMore = async () => {
    if (!hasNext) {
      return;
    }

    const { data: result } = await fetchMore({
      variables: {
        ...variables,
        offset: data?.posts.length,
      },
    });

    const p = result.posts;

    if (p.length === 0) {
      setHasNext(false);
      return;
    }
  };

  const posts = data?.posts ? data.posts : initialPosts;

  return [posts, loading, loadMore, hasNext] as any;
};
