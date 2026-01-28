import { SidebarTrigger } from "@/Components/Elements/sidebar";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 right-0 border-b bg-sidebar">
      <div className="flex items-center justify-between h-16 p-4 ">
        <div>
          <SidebarTrigger />
        </div>
        <div>tes</div>
      </div>
    </div>
  );
};

export default Navbar;
