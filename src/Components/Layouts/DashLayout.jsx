import Navbar from "../Fragments/Common/Navbar";
import SidebarApp from "../Fragments/Dashboard/Common/Sidebar/Sidebar";

const DashLayout = ({ children }) => {
  return (
    <SidebarApp>
      <main className="relative w-screen">
        <Navbar />

        <div className="px-4 mt-2">{children}</div>
      </main>
    </SidebarApp>
  );
};

export default DashLayout;
