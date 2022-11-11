import { useSession } from "next-auth/react";
import { useEffect } from "react";
import client from "../../apollo-client";
import { useMeQuery } from "../graphql/hooks";

export default function useAuth() {
  const { data: session } = useSession();
  const { data } = useMeQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    client.refetchQueries({
      include: "active",
    });
  }, [session]);

  return session ? (data?.me as any) : null;
}
