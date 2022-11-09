import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

interface Avatar {
  avatarUrl: string | null;
  size: number;
  loading: string;
  className: string;
  style: {};
}

const Avatar = forwardRef(
  (
    {
      avatarUrl = null,
      size = 12,
      loading = "eager",
      className = "",
      style = {},
      children,
    }: PropsWithChildren<Avatar>,
    ref: ForwardedRef<any>
  ) => {
    return (
      <div
        ref={ref}
        className={`relative flex-shrink-0 flex items-center justify-center bg-cover bg-center ${className}`}
        style={{
          width: `${size / 4}rem`,
          height: `${size / 4}rem`,
          backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;
