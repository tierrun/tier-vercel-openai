import { Skeleton } from "@/components/ui/skeleton";

export default async function GenerateLoading() {
  return (
    <>
      {/* Greetings */}
      <div className="mt-16 flex flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-0">
        <h1 className="h4">Hello</h1>
        <Skeleton className="h-5 w-1/4" />
      </div>
      {/* Generate Section */}
      <div className="mb-12 mt-8 flex flex-col items-start gap-8 xl:mb-60 xl:flex-row xl:justify-between xl:gap-0">
        {/* Input field for prompt*/}
        <div className="flex w-full flex-col gap-8 xl:w-[473px]">
          <div className="flex flex-col">
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        {/* Output field for marketing copy */}
        <div className="h-64 w-full rounded-[4px]  xl:h-[384px] xl:w-[640px]">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </>
  );
}
