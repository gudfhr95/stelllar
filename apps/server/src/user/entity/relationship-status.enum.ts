import { registerEnumType } from "@nestjs/graphql";

export enum RelationshipStatus {
  None = "None",
  FriendRequestOutgoing = "FriendRequestOutgoing",
  FriendRequestIncoming = "FriendRequestIncoming",
  Friends = "Friends",
  Blocking = "Blocking",
  Blocked = "Blocked",
}

registerEnumType(RelationshipStatus, { name: "RelationshipStatus" });
