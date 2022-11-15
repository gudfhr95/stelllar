import ctl from "@netlify/classnames-template-literals";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Server } from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useCreatePostDialog } from "../../hooks/useCreatePostDialog";
import ServerSelect from "../post/ServerSelect";
import Dialog from "../ui/dialog/Dialog";
import Editor from "../ui/editor/Editor";
import { IconFormatImage, IconLinkChain, IconText } from "../ui/icons/Icons";

const labelClass = ctl(`
  block
  text-11
  pb-1.5
  font-semibold
  tracking-widest
  uppercase
  text-tertiary
`);

const postBtnClass = ctl(`
  text-base
  text-primary
  disabled:opacity-50
  bg-green-600
  rounded
  px-5
  h-9
  flex
  items-center
  disabled:cursor-not-allowed
  focus:outline-none
  select-none
`);

const cancelBtnClass = ctl(`
  text-base
  text-tertiary
  focus:outline-none
  px-2
  h-9
  flex
  items-center
  select-none
`);

const tabClass = (active: boolean) =>
  ctl(`
  px-5
  h-12
  border-b-2
  dark:hover:bg-gray-775
  hover:bg-gray-200
  ${
    active
      ? "dark:border-gray-100 text-primary dark:bg-gray-775 bg-gray-200"
      : "border-transparent text-tertiary"
  }
  flex
  items-center
  justify-center
  select-none
  cursor-pointer
  text-sm
  last:rounded-tr-xl
`);

const titleClass = ctl(`
  px-4
  h-10
  placeholder-tertiary
  dark:bg-gray-750
  bg-gray-100
  rounded
  text-sm
  text-primary
  w-full
  focus:outline-none
`);

const Tab = {
  Text: "Text",
  Link: "Link",
  Image: "Image",
};

export default function CreatePostDialog() {
  const { t } = useTranslation("post");
  const { query } = useRouter();
  const user = useAuth();

  const { createPostDialog: open, setCreatePostDialog: setOpen } =
    useCreatePostDialog();

  const [server, setServer] = useState(null);
  const [currentTab, setCurrentTab] = useState(Tab.Text);

  const { register, handleSubmit, reset, formState, watch, setValue, trigger } =
    useForm({ mode: "onChange" });
  const title = watch("title");
  const [text, setText] = useState("");

  useEffect(() => {
    setServer(
      query.server
        ? user && user.servers.find((s: Server) => s.name == query.server)
        : null
    );
  }, [query.server]);

  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog isOpen={open} onClose={close}>
      <form className="max-w-screen-md w-full dark:bg-gray-800 bg-white text-left rounded-xl">
        <div className="grid grid-cols-4">
          <ServerSelect
            servers={user ? user.servers : []}
            server={server}
            setServer={setServer}
          />

          <div
            className={tabClass(currentTab === Tab.Text)}
            onClick={() => {
              setCurrentTab(Tab.Text);
            }}
          >
            <IconText className="mr-2 w-5 h-5" />
            {t("create.tab.text")}
          </div>
          <div
            className={tabClass(currentTab === Tab.Link)}
            onClick={() => {
              setCurrentTab(Tab.Link);
            }}
          >
            <IconLinkChain className="mr-2 w-5 h-5" />
            {t("create.tab.link")}
          </div>
          <div
            className={tabClass(currentTab === Tab.Image)}
            onClick={() => {
              setCurrentTab(Tab.Image);
            }}
          >
            <IconFormatImage className="mr-2 w-5 h-5" />
            {t("create.tab.image")}
          </div>
        </div>

        <div className="p-5">
          <div className="relative">
            <label htmlFor="title" className={labelClass}>
              {t("create.title")}
              {title?.length > 0 && ` (${title?.length}/300)`}
            </label>
            <input
              maxLength={300}
              className={titleClass}
              {...register("title", {
                required: true,
              })}
              id="title"
            />
          </div>

          {currentTab === Tab.Text && (
            <div className="pt-5">
              <Editor text={text} setText={setText} />
            </div>
          )}

          <div className="flex items-center pt-5">
            <div className="ml-auto flex items-center space-x-3">
              <button
                type="button"
                className={cancelBtnClass}
                onClick={() => close()}
              >
                {t("create.cancel")}
              </button>
              <button type="submit" className={postBtnClass}>
                {t("create.submit")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
