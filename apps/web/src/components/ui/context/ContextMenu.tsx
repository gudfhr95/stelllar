import ctl from "@netlify/classnames-template-literals";
import { useCopyToClipboard } from "react-use";
import CommentContextMenu from "../../comment/CommentContextMenu";
import PostContextMenu from "../../post/PostContextMenu";
import { ContextMenuType } from "./ContextMenuType";
import { useContextMenuItem } from "./useContextMenuItem";

const className = ctl(`
  p-2
  w-48
  dark:bg-gray-900
  rounded
  shadow-lg
  outline-none
  bg-white
`);

export default function ContextMenu({
  bindMenu: { style, ref, role, tabIndex },
  data,
  bindMenuItem,
  hideMenu,
  isRight,
}: any) {
  const ContextMenuItem = useContextMenuItem({
    bindMenuItem,
    hideMenu,
    isRight,
  });

  const copyToClipboard = useCopyToClipboard()[1];

  const url = data?.href ? new URL(data.href) : null;
  const isCometLink = url && url.origin === window.location.origin;

  const props = { ...(data ?? {}), ContextMenuItem };

  return (
    <div
      style={{ ...style, zIndex: 999999 }}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={className}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {data?.type === ContextMenuType.Post && <PostContextMenu {...props} />}
      {data?.type === ContextMenuType.Comment && (
        <CommentContextMenu {...props} />
      )}
    </div>
  );
}
