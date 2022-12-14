import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePostsQuery } from "../graphql/hooks";

export const usePosts = (initialPosts: []) => {
  const { query } = useRouter();

  const [hasNext, setHasNext] = useState(
    (initialPosts.length as number) === 20
  );

  const variables = {
    serverName: query.planet as any,
    feed: query.feed as any,
    sort: query.sort as any,
    time: query.time as any,
  };

  const { data, loading, fetchMore, refetch } = usePostsQuery({
    variables,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    setHasNext((initialPosts.length as number) === 20);
    refetch().then(({ data }) => setHasNext(data.posts.length === 20));
  }, [query]);

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

  return { posts, loading, fetchMore: loadMore, hasNext } as any;
};
