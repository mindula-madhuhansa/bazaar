export function AdSkeleton() {
  return (
    <div className="mt-4 flex flex-col border p-2 rounded-md shadow-md bg-gray-200/50">
      <div className="bg-gray-300 w-full h-36 rounded-md animate-pulse" />
      <div className="flex flex-col gap-y-1 mt-2">
        <div className="bg-gray-300 w-16 h-4 animate-pulse" />
        <div className="bg-gray-300 w-32 h-4 animate-pulse" />
      </div>
    </div>
  );
}
