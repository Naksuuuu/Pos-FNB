import { Toaster } from "sonner";
import DashboardNavbar from "@/Components/Fragments/Dashboard/Common/Navigation/DashboardNavbar";
import DashboardSidebar from "@/Components/Fragments/Dashboard/Common/Navigation/DashboardSidebar";

const DashLayout = ({ children }) => {
  return (
    <DashboardSidebar>
      <main className="relative w-screen">
        <DashboardNavbar />

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
    </DashboardSidebar>
  );
};

export default DashLayout;
