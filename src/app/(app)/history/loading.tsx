import { Skeleton } from "@/components/ui/skeleton";

export default async function HistoryLoading() {
  return (
    <>
      <div className="mt-16 flex items-center justify-between">
        <h1 className="h4">Generated marketing copy</h1>
      </div>
      {/* History of generated copies */}
      <div className="mx-auto mb-32 mt-16 flex w-full flex-col gap-6 lg:w-[624px]">
        <div className="flex flex-col gap-6 rounded-[4px] ">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      </div>
    </>
  );
}
