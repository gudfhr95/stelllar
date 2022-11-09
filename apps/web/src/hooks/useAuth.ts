import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAuth() {
  const { data } = useSession();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios("http://localhost:4000/auth/me");
        console.log("fetching...");
        setUser(result.data);
      } catch (e) {
        console.log("error", e);
      }
    };

    if (!data) {
      setUser(null);
    } else {
      fetchUser();
    }
  }, [data]);

  return user;
}
