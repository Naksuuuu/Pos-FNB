import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import { SidebarTrigger } from "@/Components/Elements/Shadcn/sidebar";
import { selectAuthUser } from "@/Redux/Features/Auth/Login/LoginSelector";
import { LogoutUser } from "@/Redux/Features/Auth/Login/LoginSlice";
import { ChevronDown } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashNavbar = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    await dispatch(LogoutUser()).unwrap();
  }, [dispatch]);

  const categoryItems = useMemo(
    () => [
      { key: "profile", label: "Profile", to: "/dashboard/profile" },
      {
        key: "logout",
        label: "Logout",
        onClick: handleLogout,
        className: "text-destructive hover:text-destructive/80!",
      },
    ],
    [handleLogout],
  );

  return (
    <div className="sticky top-0 left-0 right-0 border-b bg-background z-10">
      <div className="flex items-center justify-between h-18 p-4 ">
        <div>
          <SidebarTrigger />
        </div>

        <DropDown
          buttonProps={{ variant: "ghost", size: "lg", className: "text-start" }}
          triggerLabel={
            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <h3 className="font-semibold leading-none">{user?.name}</h3>
                <p className="text-sm text-muted-foreground leading-none">{user?.role}</p>
              </div>
              <ChevronDown className="in-data-popup-open:rotate-180 transition-all duration-300" />
            </div>
          }
          items={categoryItems}
          contentProps={{ align: "end" }}
        />
      </div>
    </div>
  );
};

export default DashNavbar;
