import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Header from "../ui/header/Header";
import HeaderTab from "../ui/header/HeaderTab";
import { IconHot, IconNew, IconTop } from "../ui/icons/Icons";

export default function ServerHeader() {
  const { query } = useRouter();

  let icon;
  switch (query.sort) {
    case "Hot":
      icon = <IconHot className={"w-5 h-5"} />;
      break;
    case "New":
      icon = <IconNew className={"w-5 h-5"} />;
      break;
    case "Top":
      icon = <IconTop className={"w-5 h-5"} />;
      break;
    default:
      icon = <IconHot className={"w-5 h-5"} />;
  }

  return (
    <Header
      title={(query.sort as string) || "Hot"}
      icon={icon}
      showDivider={query.sort === "Top"}
    >
      {query.sort === "Top" && (
        <div className="flex items-center space-x-4">
          <TimeTab time="Hour" />
          <TimeTab time="Day" />
          <TimeTab time="Week" />
          <TimeTab time="Month" />
          <TimeTab time="Year" />
          <TimeTab time="All" />
        </div>
      )}
    </Header>
  );
}

type TimeTab = {
  time: string;
};

function TimeTab({ time }: TimeTab) {
  const { t } = useTranslation("server");
  const router = useRouter();

  return (
    <HeaderTab
      to={{
        pathname: router.pathname,
        query: { ...router.query, time },
      }}
      time={time}
    >
      {t(`header.time.${time}`)}
    </HeaderTab>
  );
}
