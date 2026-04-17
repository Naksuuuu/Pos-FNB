import { memo } from "react";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const LoadingApp = memo(() => {
  return (
    <div className="relative flex items-center justify-center ">
      <Skeleton className="w-full h-screen bg-background" />
      <Spinner className="absolute size-8" />
    </div>
  );
});
export default LoadingApp;
