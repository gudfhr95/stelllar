import { useTranslation } from "next-i18next";
import { useLoginDialog } from "../hooks/useLoginDialog";
import StyledDialog from "./ui/dialog/StyledDialog";
import { IconX } from "./ui/icons/Icons";
import { VectorLogo } from "./ui/vectors/VectorLogo";

const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  );

  newWindow?.focus();
};

export default function LoginDialog() {
  const { t } = useTranslation("login-dialog");

  const { loginDialog: open, setLoginDialog: setOpen } = useLoginDialog();

  const close = () => {
    setOpen(false);
  };

  const onClickGoogleLogin = () => {
    popupCenter("/login/google", "Google Auth");
  };

  return (
    <StyledDialog isOpen={open} onClose={close} closeOnOverlayClick={false}>
      <div className="rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2" />
      <div className="px-5 pt-2 pb-9 text-left">
        <div className="pb-4 flex items-center">
          <div className="ml-auto">
            <VectorLogo className="h-8 text-secondary" />
          </div>
          <IconX
            className="ml-5 w-5 h-5 text-tertiary highlightable"
            onClick={() => close()}
          />
        </div>

        <div className="space-y-4 items-center">
          <button
            className="form-button-submit m-auto"
            onClick={onClickGoogleLogin}
          >
            Register With Google
          </button>
        </div>
      </div>
    </StyledDialog>
  );
}
