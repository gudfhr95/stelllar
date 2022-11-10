import { forwardRef } from "react";
import Avatar from "../ui/Avatar";
import { IconUser } from "../ui/icons/Icons";

interface UserAvatar {
  avatarUrl?: string | null;
  isOnline: boolean;
  showOnline?: boolean;
  size: number;
  loading?: string;
  className?: string;
  dotClassName?: string;
}

const UserAvatar = forwardRef(
  (
    {
      avatarUrl = null,
      isOnline = false,
      showOnline = false,
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
        {showOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full z-10 ${dotClassName} ${
              isOnline ? "bg-green-500" : "bg-gray-600"
            }`}
          />
        )}
        {!avatarUrl && <IconUser className="text-primary w-2/3 h-2/3" />}
      </Avatar>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
export default UserAvatar;
