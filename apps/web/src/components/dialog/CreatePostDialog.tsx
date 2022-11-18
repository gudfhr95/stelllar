import ctl from "@netlify/classnames-template-literals";
import { isURL } from "class-validator";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "react-use";
import "setimmediate";
import {
  LinkMetadata,
  Server,
  useCreatePostMutation,
  useGetLinkMetadataQuery,
} from "../../graphql/hooks";
import useAuth from "../../hooks/useAuth";
import { useCreatePostDialog } from "../../hooks/useCreatePostDialog";
import PostEmbed from "../post/PostEmbed";
import ServerSelect from "../post/ServerSelect";
import Dialog from "../ui/dialog/Dialog";
import Editor from "../ui/editor/Editor";
import {
  IconFormatImage,
  IconLinkChain,
  IconPlus,
  IconSpinner,
  IconText,
  IconX,
} from "../ui/icons/Icons";

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

function readFileAsDataURL(file: any) {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
}

export default function CreatePostDialog() {
  const { t } = useTranslation("post");
  const { query } = useRouter();
  const user = useAuth();

  useEffect(() => {
    setServer(
      query.planet
        ? user && user.servers.find((s: Server) => s.name == query.planet)
        : null
    );
  }, [user, query]);

  const { createPostDialog: open, setCreatePostDialog: setOpen } =
    useCreatePostDialog();

  const [createPost, { loading }] = useCreatePostMutation();

  const [server, setServer] = useState<Server | null>(null);
  const [currentTab, setCurrentTab] = useState(Tab.Text);

  const { register, handleSubmit, reset, formState, watch, setValue, trigger } =
    useForm({ mode: "onChange" });
  const title = watch("title");
  const [text, setText] = useState("");
  const linkUrl = watch("linkUrl");

  const [debouncedLinkUrl, setDebouncedLinkUrl] = useState("");
  useDebounce(() => setDebouncedLinkUrl(linkUrl), 500, [linkUrl]);

  const { data: linkMetadata, loading: loadingMeta } = useGetLinkMetadataQuery({
    variables: {
      linkUrl: debouncedLinkUrl,
    },
    skip: !debouncedLinkUrl || !isURL(debouncedLinkUrl),
  });
  const linkMeta = linkMetadata?.getLinkMetadata;
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  const onChangeImages = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(
        Array.from(files).map((file) => ({
          file,
        })) as []
      );

      let readers = [];
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsDataURL(files[i]));
      }

      Promise.all(readers).then((values) =>
        setImages(
          values.map((data, i) => ({
            file: files[i],
            data,
          })) as []
        )
      );
    }
  };

  const onAddImages = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages([
        ...images,
        ...Array.from(files).map((file) => ({
          file,
        })),
      ] as []);

      let readers = [];
      for (let i = 0; i < files.length; i++) {
        readers.push(readFileAsDataURL(files[i]));
      }

      Promise.all(readers).then((values) => {
        setImages([
          ...images,
          ...values.map((data, i) => ({
            file: files[i],
            data,
          })),
        ] as []);
      });
    }
  };

  const close = () => {
    setOpen(false);
  };

  const onSubmit = ({ title, linkUrl }: any) => {
    createPost({
      variables: {
        input: {
          title,
          text: text && currentTab === Tab.Text ? text : null,
          linkUrl: linkUrl && currentTab === Tab.Link ? linkUrl : null,
          serverId: server?.id ?? "",
          images:
            images && images.length > 0 && currentTab === Tab.Image
              ? images.map(({ file }) => ({ file }))
              : null,
        },
      },
    }).then(({ data }) => {
      const post = data?.createPost;
      if (!post) {
        return;
      }

      setOpen(false);
      reset();
    });
  };

  return (
    <Dialog isOpen={open} onClose={close}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-md w-full dark:bg-gray-800 bg-white text-left rounded-xl"
      >
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

          {currentTab === Tab.Link && (
            <>
              <div className="pb-5 pt-1.5">
                {linkMeta?.title && title !== linkMeta?.title && (
                  <span
                    className="text-xs text-blue-500 hover:underline cursor-pointer line-clamp-1"
                    onClick={() => {
                      setValue("title", linkMeta?.title);
                      trigger("title");
                    }}
                  >
                    {linkMeta?.title}
                  </span>
                )}
              </div>

              <label
                htmlFor="linkUrl"
                className="block text-11 pb-1.5 font-semibold tracking-widest uppercase text-tertiary"
              >
                {t("create.link.label")}
              </label>
              <div className="relative h-10">
                <IconLinkChain
                  className={`top-1/2 left-2.5 transform -translate-y-1/2 absolute w-5 h-5 text-mid`}
                />

                <input
                  maxLength={2000}
                  className="px-10 h-10 dark:bg-gray-750 bg-gray-100 rounded text-sm text-primary w-full focus:outline-none"
                  {...register("linkUrl", {
                    validate: (url) => !url || isURL(url),
                  })}
                  id="linkUrl"
                />

                {loadingMeta && (
                  <div className="top-1/2 right-2.5 transform -translate-y-1/2 absolute">
                    <IconSpinner />
                  </div>
                )}
              </div>

              {linkUrl && !isURL(linkUrl) && (
                <div className="text-13 text-red-400 pt-1">
                  {t("create.link.error")}
                </div>
              )}

              {debouncedLinkUrl && isURL(debouncedLinkUrl) && !!linkMeta && (
                <div className="mt-5">
                  <PostEmbed dark metadata={linkMeta as LinkMetadata} />
                </div>
              )}
            </>
          )}

          {currentTab === Tab.Image && (
            <div className="mt-5">
              {images && images.length > 0 ? (
                <div>
                  <div className="flex">
                    <div className="flex scrollbar-custom items-center space-x-3 overflow-x-auto border dark:border-gray-700 rounded-md h-31 px-3 max-w-full w-full">
                      {images.map((image: any, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedImage(i)}
                          className={`cursor-pointer group relative rounded border ${
                            selectedImage === i
                              ? "dark:border-gray-500"
                              : "dark:border-transparent"
                          }`}
                        >
                          <div
                            className={`max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] transform ${
                              selectedImage === i ? "scale-85" : ""
                            }`}
                          >
                            <div
                              className="absolute top-1 right-1 rounded-full bg-black p-0.5 hidden group-hover:block z-10"
                              onClick={() => {
                                if (selectedImage >= i && selectedImage > 0) {
                                  setImmediate(() =>
                                    setSelectedImage(selectedImage - 1)
                                  );
                                }

                                const newImages = images.slice();
                                newImages.splice(i, 1);
                                setImages(newImages);
                              }}
                            >
                              <IconX className="w-4.5 h-4.5 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-black rounded bg-opacity-0 group-hover:bg-opacity-50" />
                            {image.data && (
                              <div
                                style={{
                                  backgroundImage: `url(${image.data})`,
                                }}
                                className={`max-w-25 max-h-25 min-w-[6.25rem] min-h-[6.25rem] bg-cover bg-center select-none rounded`}
                              />
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="w-25 h-25 rounded relative flex items-center justify-center border dark:border-gray-700 border-dashed cursor-pointer transition dark:hover:bg-gray-775">
                        <input
                          type="file"
                          id="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          hidden
                          multiple
                          onChange={onAddImages}
                        />
                        <label
                          htmlFor="file"
                          className="absolute inset-0 block cursor-pointer"
                        />
                        <IconPlus className="w-1/2 h-1/2 text-tertiary" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    id="files"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    hidden
                    multiple
                    onChange={onChangeImages}
                  />
                  <label
                    htmlFor="files"
                    className="select-none cursor-pointer flex items-center justify-center text-base text-tertiary h-30 border border-dashed dark:border-gray-700 rounded-md transition dark:hover:bg-gray-775"
                  >
                    {t("create.image.label")}
                  </label>
                </div>
              )}
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
              <button
                type="submit"
                disabled={!formState.isValid || !server || loading}
                className={postBtnClass}
              >
                {t("create.submit")}
                {loading && (
                  <IconSpinner className="w-5 h-5 text-primary ml-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
}
