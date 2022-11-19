import { forwardRef } from "react";
import Avatar from "../ui/Avatar";
import { IconUser } from "../ui/icons/Icons";

type UserAvatar = {
  avatarUrl?: string | null;
  size: number;
  loading?: string;
  className?: string;
  dotClassName?: string;
};

const UserAvatar = forwardRef(
  (
    {
      avatarUrl = null,
      size = 12,
      loading = "eager",
      className = "",
      dotClassName = "",
    }: UserAvatar,
    ref
  ) => {
    return (
      <Avatar
        ref={ref}
        avatarUrl={avatarUrl}
        loading={loading}
        className={`${className} cursor-pointer rounded-full`}
        size={size}
        style={!avatarUrl ? { backgroundColor: "gray" } : {}}
      >
        {!avatarUrl && <IconUser className="text-primary w-2/3 h-2/3" />}
      </Avatar>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
export default UserAvatar;
