import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../../apollo-client";
import { useMeQuery } from "../graphql/hooks";

export default function useAuth() {
  const { query } = useRouter();
  const { data: session } = useSession();

  const { data } = useMeQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    client.refetchQueries({
      include: "active",
    });
  }, [query, session]);

  return session ? (data?.me as any) : null;
}
