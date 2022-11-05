export default function ServerList({ hide = false }) {
  return (
    <>
      <div
        className={`${
          hide ? "hidden md:flex" : "flex"
        } h-full flex-col items-center min-w-[4.5rem] w-18 bg-gray-300 dark:bg-gray-900 overflow-y-auto scrollbar-none`}
      >
        <div className="h-full flex flex-col items-center w-full divide-y dark:divide-gray-800 divide-gray-200">
          <div className="space-y-2 flex flex-col items-center py-2"></div>
        </div>
      </div>
    </>
  );
}
