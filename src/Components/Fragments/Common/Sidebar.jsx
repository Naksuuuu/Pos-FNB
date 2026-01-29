import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/Components/Elements/Shadcn/Sidebar/sidebar";
import { SidebarItem } from "@/Context/SidebarItem";
import { memo } from "react";
import { Link } from "react-router-dom";

const CreateSidebar = memo(() => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h1 className="text-lg font-bold">My App</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
});

const SidebarApp = memo(({ children }) => {
  return (
    <SidebarProvider>
      <CreateSidebar />
      {children}
    </SidebarProvider>
  );
});

export default SidebarApp;
