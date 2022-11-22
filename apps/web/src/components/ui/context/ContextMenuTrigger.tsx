import { PropsWithChildren } from "react";
import { useContextMenuTrigger } from "./ContextMenuProvider";

type ContextMenuTrigger = {
  data: any;
  leftClick?: boolean;
  className?: string;
};

export default function ContextMenuTrigger({
  data,
  leftClick = false,
  className = "",
  children,
}: PropsWithChildren<ContextMenuTrigger>) {
  const [bindTrigger] = useContextMenuTrigger(data, leftClick);

  return (
    <div className={className} {...bindTrigger}>
      {children}
    </div>
  );
}
