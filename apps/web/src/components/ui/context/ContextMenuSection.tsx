import { PropsWithChildren } from "react";

export default function ContextMenuSection({ children }: PropsWithChildren) {
  return <div className="space-y-0.5">{children}</div>;
}
