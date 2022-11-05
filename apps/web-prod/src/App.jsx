import LoginDialog from "@/components/LoginDialog";
import CustomDragLayer from "@/components/ui/CustomDragLayer";
import TitleBar from "@/components/ui/electron/titlebar/TitleBar";
import ResponsiveToaster from "@/components/ui/ResponsiveToaster";
import UserDialog from "@/components/user/UserDialog";
import { apolloClient } from "@/graphql/apolloClient";
import Routes from "@/pages/Routes";
import ContextMenuProvider from "@/providers/ContextMenuProvider";
import UserProvider from "@/providers/UserProvider";
import { getOS } from "@/utils/getOS";
import { ApolloProvider } from "@apollo/client/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, HashRouter } from "react-router-dom";

export default function App() {
  const isMac = getOS() === "Mac OS";
  const Router = window.electron ? HashRouter : BrowserRouter;

  return (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/logos/logo_icon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Stelllar – Forum & Chat for Communities</title>
        </Helmet>

        <UserProvider>
          <Router>
            <ContextMenuProvider>
              <DndProvider
                backend={TouchBackend}
                options={{ enableTouchEvents: false, enableMouseEvents: true }}
              >
                <ResponsiveToaster />
                <CustomDragLayer />
                {window.electron && !isMac && <TitleBar />}
                <LoginDialog />
                <UserDialog />
                <div
                  style={
                    window.electron
                      ? { height: isMac ? "100%" : "calc(100% - 1.375rem)" }
                      : { height: "100%" }
                  }
                  className="flex"
                >
                  <Routes />
                </div>
              </DndProvider>
            </ContextMenuProvider>
          </Router>
        </UserProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
