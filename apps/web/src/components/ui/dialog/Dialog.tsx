import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren } from "react";

interface Dialog {
  isOpen: boolean;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
}

export default function Dialog({
  isOpen,
  onClose = () => {},
  closeOnOverlayClick = false,
  children,
}: PropsWithChildren<Dialog>) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog open={isOpen} onClose={onClose} static>
        <div className="fixed z-10 inset-0">
          <div className="flex items-end justify-center min-h-screen text-center sm:block p-0">
            <Transition.Child
              enter="ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessDialog.Overlay className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 dark:bg-black opacity-75" />
              </HeadlessDialog.Overlay>
            </Transition.Child>

            <Transition.Child
              enter="ease-out transform duration-150"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in transform duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  if (closeOnOverlayClick) {
                    onClose();
                  }
                }}
                className="overflow-y-auto scrollbar dark:scrollbar-thumb-gray-800 dark:scrollbar-track-transparent inline-block h-screen transform transition-all align-middle w-screen"
              >
                <div className="flex min-h-full w-full items-center justify-center">
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
