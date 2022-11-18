import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Editor from "../ui/editor/Editor";

const commentBtnClass = ctl(`
  text-base
  text-primary
  disabled:opacity-50
  dark:disabled:bg-gray-600
  bg-green-600
  rounded
  px-3
  h-8
  flex
  items-center
  disabled:cursor-not-allowed
  focus:outline-none
`);

const cancelBtnClass = ctl(`
  text-base
  text-tertiary
  focus:outline-none
  px-2
  h-8
  flex
  items-center
`);

type CommentEditor = {
  postId: string;
  setOpen: (open: boolean) => void;
};

export default function CommentEditor({ postId, setOpen }: CommentEditor) {
  const { t } = useTranslation("comment");

  const [text, setText] = useState("");

  const onClickCancel = () => {
    setOpen(false);
    setText("");
  };

  const onClickSubmit = () => {};

  return (
    <div className="max-w-screen-md w-full">
      <Editor text={text} setText={setText} />
      <div className="flex justify-end space-x-3 items-center pt-3">
        <button className={cancelBtnClass} onClick={onClickCancel}>
          {t("cancel")}
        </button>
        <button
          className={commentBtnClass}
          disabled={!text}
          onClick={onClickSubmit}
        >
          {t("submit")}
        </button>
      </div>
    </div>
  );
}
