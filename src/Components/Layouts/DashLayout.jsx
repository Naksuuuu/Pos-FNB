import { Toaster } from "sonner";
import DashboardNavbar from "@/Components/Fragments/Dashboard/Common/Navigation/DashboardNavbar";
import DashboardSidebar from "@/Components/Fragments/Dashboard/Common/Navigation/DashboardSidebar";

const DashLayout = ({ children }) => {
  return (
    <DashboardSidebar>
      <main className="relative w-screen bg-dashboard">
        <DashboardNavbar />

        <div className="mx-4 my-4 space-y-4">{children}</div>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "!bg-background !text-foreground !border-border",
              success: "!bg-emerald-100 text-emerald-900! !border-emerald-300",
              error: "!bg-red-100 text-red-900! !border-red-300",
            },
          }}
        />
      </main>
    </DashboardSidebar>
  );
};

export default DashLayout;
