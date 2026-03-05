import { Toaster } from "sonner";
import DashNavbar from "@/Components/Fragments/Dashboard/Common/Navigation/DashNavbar";
import DashSidebar from "@/Components/Fragments/Dashboard/Common/Navigation/DashSidebar";

const DashLayout = ({ children }) => {
  return (
    <DashSidebar>
      <main className="relative w-full bg-dashboard">
        <DashNavbar />

        <div className="mx-2 md:mx-4 my-2 md:my-4 space-y-4">{children}</div>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "!bg-background !text-foreground !border-border",
              success: "!bg-success/80 !text-background !border-success/30",
              error: "!bg-destructive/80 !text-background !border-destructive/30",
            },
          }}
        />
      </main>
    </DashSidebar>
  );
};

export default DashLayout;
