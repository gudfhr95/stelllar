import { useLoginDialog } from "../../hooks/useLoginDialog";
import { popup } from "../../utils/popup";
import { GoogleSigninButton } from "../ui/buttons/GoogleSigninButton";
import StyledDialog from "../ui/dialog/StyledDialog";
import { IconX } from "../ui/icons/Icons";
import { VectorLogo } from "../ui/vectors/VectorLogo";

export default function LoginDialog() {
  const { loginDialog: open, setLoginDialog: setOpen } = useLoginDialog();

  const close = () => {
    setOpen(false);
  };

  const onClickGoogleLogin = () => {
    popup("/login/google", "Google Auth");
    close();
  };

  return (
    <StyledDialog
      small
      isOpen={open}
      onClose={close}
      closeOnOverlayClick={true}
    >
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

        <div className="flex flex-col items-center">
          <GoogleSigninButton onClick={onClickGoogleLogin} />
        </div>
      </div>
    </StyledDialog>
  );
}
