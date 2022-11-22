import { useRouter } from "next/router";
import { Post } from "../../graphql/hooks";
import { IconBack } from "../ui/icons/Icons";

type PostHeader = {
  post: Post;
  back: boolean;
};

export default function PostHeader({ post, back = true }: PostHeader) {
  const router = useRouter();

  return (
    <header
      id="header"
      className={`h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center`}
    >
      <div
        className={`flex items-center font-semibold text-base text-primary pl-4`}
      >
        {back && (
          <div
            className="highlightable mr-3 cursor-pointer"
            onClick={() => router.back()}
          >
            <IconBack className="w-5 h-5" />
          </div>
        )}
        <span className="line-clamp-1">{post.title}</span>
      </div>
    </header>
  );
}
