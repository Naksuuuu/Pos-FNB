import { memo } from "react";

const CustLayout = memo(({ children }) => {
  return (
    <main className="relative flex w-full min-h-screen flex-col items-stretch justify-start gap-4">{children}</main>
  );
});
export default CustLayout;
