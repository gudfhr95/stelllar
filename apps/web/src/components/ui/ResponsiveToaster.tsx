import { Toaster } from "react-hot-toast";

export default function ResponsiveToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "toast",
        success: {
          className: "toast",
          iconTheme: {
            primary: "#059669",
          },
        },
        error: {
          className: "toast",
          iconTheme: {
            primary: "#EF4444",
          },
        },
      }}
    />
  );
}
