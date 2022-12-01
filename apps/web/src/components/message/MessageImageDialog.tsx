import { MouseEvent, useState } from "react";
import { Image } from "../../graphql/hooks";
import Dialog from "../ui/dialog/Dialog";

type MessageImageDialog = {
  image: Image | undefined;
  width?: number | null;
  height?: number | null;
  rounded?: boolean;
};

export default function MessageImageDialog({
  image,
  width = null,
  height = null,
  rounded = true,
}: MessageImageDialog) {
  const [showImagePopup, setShowImagePopup] = useState(false);

  const onClickImage = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setShowImagePopup(true);
  };

  const onCloseImagePopup = () => {
    setShowImagePopup(false);
  };

  return (
    <div>
      <img
        onClick={onClickImage}
        src={image?.smallUrl ?? undefined}
        alt=""
        className={`${rounded ? "rounded" : ""} cursor-pointer max-w-full`}
        width={width || image?.smallWidth}
        height={height || image?.smallHeight}
      />

      <Dialog
        closeOnOverlayClick
        onClose={onCloseImagePopup}
        isOpen={showImagePopup}
      >
        <div className="mx-auto">
          <div className="text-left">
            <img
              onClick={(e) => e.stopPropagation()}
              src={image?.popupUrl ?? undefined}
              alt=""
              width={image?.popupWidth}
              height={image?.popupHeight}
            />
            <div className="pt-1">
              <a
                href={image?.originalUrl}
                className="hover:underline cursor-pointer text-mid font-semibold text-13 focus:outline-none"
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
              >
                Open original
              </a>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
