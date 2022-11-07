import Tippy from "@tippyjs/react";
import { IconHide, IconShow } from "./icons/Icons";

interface ShowPasswordButton {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function ShowPasswordButton({
  showPassword,
  setShowPassword,
}: ShowPasswordButton) {
  return (
    <Tippy content={showPassword ? "Hide Password" : "Show Password"}>
      <div className={`form-show-password-button`}>
        {showPassword ? (
          <IconHide
            onClick={() => setShowPassword(false)}
            className="w-5 h-5"
          />
        ) : (
          <IconShow onClick={() => setShowPassword(true)} className="w-5 h-5" />
        )}
      </div>
    </Tippy>
  );
}
