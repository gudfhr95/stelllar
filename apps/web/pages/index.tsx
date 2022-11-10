import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  const request = () => {
    axios
      .get("http://localhost:4000/auth/google", { withCredentials: true })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return <button onClick={request}>Request</button>;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login-dialog", "bottom-bar"])),
    },
  };
}
