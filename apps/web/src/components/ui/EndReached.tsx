import { memo, PropsWithChildren } from "react";
import astronaut from "../../../public/images/astronaut.png";

type EndReached = {
  className?: string;
};

export default memo(function EndReached({
  className = "h-48",
  children,
}: PropsWithChildren<EndReached>) {
  return (
    <div className="flex flex-col items-center justify-center text-primary py-6">
      <img
        alt="astronaut"
        src={astronaut.src}
        className={`object-contain opacity-50 animate-float select-none pointer-events-none ${className}`}
      />
      <div className="text-tertiary pt-3 text-lg font-semibold">{children}</div>
    </div>
  );
});
