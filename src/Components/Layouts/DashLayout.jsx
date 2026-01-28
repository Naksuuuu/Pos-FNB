import { SidebarProvider } from "../Elements/sidebar";
import Navbar from "../Fragments/Common/Navbar";
import SidebarApp from "../Fragments/Common/Sidebar";

const DashLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarApp />
      <main className="relative w-screen">
        <Navbar />

        <div className="px-4 mt-2">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashLayout;
