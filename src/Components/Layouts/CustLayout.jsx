import { memo } from "react";

const CustLayout = memo(({ children }) => {
  return <main className="relative flex flex-col gap-4 items-center justify-center w-full min-h-screen ">{children}</main>;
});
export default CustLayout;
