import { memo } from "react";
import Toaster from "@/Components/Elements/Toasts/Toaster";

const CustLayout = memo(({ children }) => {
  return (
    <main className="relative flex w-full min-h-screen flex-col items-stretch justify-start gap-4">
      {children}
      <Toaster />
    </main>
  );
});
export default CustLayout;
