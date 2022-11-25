import Dialog from "../ui/dialog/Dialog";
import { IconSpinner } from "../ui/icons/IconSpinner";

type LoadingDialog = {
  isOpen: boolean;
};

export default function LoadingDialog({ isOpen = false }: LoadingDialog) {
  return (
    <Dialog isOpen={isOpen}>
      <IconSpinner className="w-10 h-10 text-primary" />
    </Dialog>
  );
}
