import { Button } from "@/Components/Elements/Shadcn/button";
import { ArrowLeft } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";

const CustomerNavbar = memo(({ navbarTitle, backLink }) => {
  return (
    <nav className="sticky top-0 z-10 shadow-sm">
      <div className="flex items-center px-4 h-14">
        <Button
          variant="ghost"
          size="default"
          className="border rounded-full border-slate-200"
          nativeButton={false}
          render={(props) => (
            <Link {...props} to={backLink || "/catalog"}>
              <ArrowLeft />
            </Link>
          )}
        />
        <h2 className="flex-1 text-lg font-semibold tracking-wide text-center uppercase">{navbarTitle}</h2>
        <div className="w-10" />
      </div>
    </nav>
  );
});
export default CustomerNavbar;
