import { useEffect } from "react";
import DashNavbar from "@/Features/Dashboard/Shared/Component/Navigation/DashNavbar";
import DashSidebar from "@/Features/Dashboard/Shared/Component/Navigation/DashSidebar";
import NavbarProvider from "@/Features/Dashboard/Shared/Context/DashNavbarContext";

const DashLayout = ({ children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F11") {
        e.preventDefault();

        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Gagal masuk mode fullscreen: ${err.message}`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <DashSidebar>
      <NavbarProvider>
        <main className="relative w-full bg-dashboard">
          <DashNavbar />

          <div className="mx-2 my-2 space-y-4 md:mx-4 md:my-4">{children}</div>
        </main>
      </NavbarProvider>
    </DashSidebar>
  );
};

export default DashLayout;
