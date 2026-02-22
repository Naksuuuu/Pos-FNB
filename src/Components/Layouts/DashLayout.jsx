import { Toaster } from "sonner";
import DashNavbar from "@/Components/Fragments/Dashboard/Common/Navigation/DashNavbar";
import DashSidebar from "@/Components/Fragments/Dashboard/Common/Navigation/DashSidebar";

const DashLayout = ({ children }) => {
  return (
    <DashSidebar>
      <main className="relative w-screen bg-dashboard">
        <DashNavbar />

        <div className="mx-2 md:mx-4 my-2 md:my-4 space-y-4">{children}</div>
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
    </DashSidebar>
  );
};

export default DashLayout;
