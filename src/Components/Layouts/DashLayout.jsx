import Toaster from "@/Components/Elements/Toasts/Toaster";
import DashNavbar from "@/Components/Fragments/Dashboard/Common/Navigation/DashNavbar";
import DashSidebar from "@/Components/Fragments/Dashboard/Common/Navigation/DashSidebar";

const DashLayout = ({ children }) => {
  return (
    <DashSidebar>
      <main className="relative w-full bg-dashboard">
        <DashNavbar />

        <div className="mx-2 md:mx-4 my-2 md:my-4 space-y-4">{children}</div>
        <Toaster />
      </main>
    </DashSidebar>
  );
};

export default DashLayout;
