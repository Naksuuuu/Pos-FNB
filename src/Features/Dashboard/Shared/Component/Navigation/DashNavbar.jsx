import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, User } from "lucide-react";

import { useNavbar } from "@/Features/Dashboard/Shared/Context/DashNavbarContext";
import useLogout from "@/Features/Auth/Login/Hooks/useLogout";

import { selectAuthUser } from "@/Redux/Features/Auth/Login/LoginSelector";

import { DropDown } from "@/Components/Elements/Buttons/DropDown";
import { SidebarTrigger } from "@/Components/Elements/Shadcn/sidebar";

const DashNavbar = () => {
  const user = useSelector(selectAuthUser);
  const { logout } = useLogout();
  const { centerContent } = useNavbar();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Gagal masuk mode fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  const categoryItems = useMemo(
    () => [
      { key: "profile", label: "Profile", to: "/dashboard/profile" },
      { key: "fullscreen", label: "Layar Penuh", onClick: handleToggleFullscreen },
      {
        key: "logout",
        label: "Logout",
        onClick: handleLogout,
        className: "text-destructive hover:text-destructive/80!",
      },
    ],
    [handleLogout, handleToggleFullscreen],
  );

  return (
    <div className="sticky top-0 left-0 right-0 z-10 border-b bg-background">
      <div className="flex items-center justify-between p-4 h-18 ">
        <div>
          <SidebarTrigger />
        </div>

        {centerContent && <div>{centerContent}</div>}

        <DropDown
          buttonProps={{ variant: "ghost", size: "lg", className: "text-start" }}
          triggerLabel={
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-primary/20 text-primary">
                  <User />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold leading-none">{user?.username}</h3>
                  <p className="text-sm leading-none text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <ChevronDown className="transition-all duration-300 in-data-popup-open:rotate-180" />
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
