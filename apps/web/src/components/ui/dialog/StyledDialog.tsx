import { Fragment, PropsWithChildren } from "react";
import Dialog from "./Dialog";

interface StyledDialog {
  isOpen: boolean;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  buttons?: any;
  onSubmit?: () => void;
  small?: boolean;
  large?: boolean;
}

export default function StyledDialog({
  isOpen,
  onClose = () => {},
  closeOnOverlayClick = true,
  onSubmit,
  buttons,
  small = false,
  large = false,
  children,
}: PropsWithChildren<StyledDialog>) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <form
        onSubmit={onSubmit}
        className={`md:rounded-lg dark:bg-gray-800 min-w-screen w-full relative text-left bg-white text-white ${
          !small && !large ? "md:max-w-lg" : ""
        } ${small ? "md:max-w-sm" : ""} ${large ? "md:max-w-screen-lg" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {!!buttons && (
          <>
            <div className="md:rounded-b-lg dark:bg-gray-750 h-9" />
            <div className="absolute right-5 bottom-9 transform translate-y-1/2 flex items-center space-x-3 justify-end h-9">
              {(buttons.type === Fragment
                ? buttons.props.children
                : [buttons]
              ).map((button: any, index: number) => (
                <div key={index} className="dark:bg-gray-800 rounded">
                  {button}
                </div>
              ))}
            </div>
          </>
        )}
      </form>
    </Dialog>
  );
}
