import CreatePostHeader from "@/components/post/create/CreatePostHeader";
import Posts from "@/components/post/Posts";
import PostsHeader from "@/components/post/PostsHeader";
import InfoSidebar from "@/components/ui/InfoSidebar";
import Page from "@/components/ui/page/Page";
import { useCurrentUser } from "@/hooks/graphql/useCurrentUser";
import { useSetHomePage } from "@/hooks/useSetHomePage";
import {
  createNotification,
  isNotificationsSupported,
} from "@/utils/createNotification";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function FeedPage() {
  const [currentUser] = useCurrentUser();
  useSetHomePage(null);

  useEffect(() => {
    if (!isNotificationsSupported()) return;
    if (Notification.permission === "default") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          createNotification({
            title: "Notifications enabled!",
            icon: "/icons/icon.png",
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>피드 – Stelllar</title>
      </Helmet>

      <Page header={<PostsHeader />} rightSidebar={<InfoSidebar />}>
        <Posts
          showServerName
          header={currentUser ? <CreatePostHeader /> : <div className="h-4" />}
        />
      </Page>
    </>
  );
}
