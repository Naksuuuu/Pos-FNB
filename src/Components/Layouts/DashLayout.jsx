import { Toaster } from "sonner";
import Navbar from "../Fragments/Common/Navbar";
import SidebarApp from "../Fragments/Dashboard/Common/Sidebar/Sidebar";

const DashLayout = ({ children }) => {
  return (
    <SidebarApp>
      <main className="relative w-screen">
        <Navbar />

        <div className="px-4 mt-2">{children}</div>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "!bg-background !text-foreground !border-border",
              success: "!bg-emerald-500 ",
              error: "!bg-destructive ",
            },
          }}
        />
      </main>
    </SidebarApp>
  );
};

export default DashLayout;
