import { SidebarTrigger } from "@/Components/Elements/Shadcn/sidebar";

const DashNavbar = () => {
  return (
    <div className="sticky top-0 left-0 right-0 border-b bg-background z-10">
      <div className="flex items-center justify-between h-16 p-4 ">
        <div>
          <SidebarTrigger />
        </div>
        <div>tes</div>
      </div>
    </div>
  );
};

export default DashNavbar;
