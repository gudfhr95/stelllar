import { registerEnumType } from "@nestjs/graphql";

export enum OnlineStatus {
  Online = "Online",
  Away = "Away",
  DoNotDisturb = "DoNotDisturb",
  Offline = "Offline",
}

registerEnumType(OnlineStatus, { name: "OnlineStatus" });
