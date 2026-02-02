import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/Elements/Shadcn/Collapsible/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/Components/Elements/Shadcn/Sidebar/sidebar";
import { SidebarItem } from "@/Context/SidebarItem";
import { ChevronRight } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const CreateSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="py-6">
              <Link to="/">
                <img
                  src={"https://avatars.githubusercontent.com/u/144807673?v=4"}
                  alt="Logo"
                  width={35}
                  height={35}
                  className="rounded-full select-none"
                />
                <span className="select-none">Ariel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {SidebarItem.map((item) =>
            Array.isArray(item.children) ? (
              <SidebarMenu key={item.title}>
                <Collapsible asChild defaultOpen={true} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.path}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            ) : (
              item.children === null && (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link to={item.path} className="text-lg font-semibold">
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              )
            ),
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const SidebarApp = memo(({ children }) => {
  return (
    <SidebarProvider>
      <CreateSidebar />
      {children}
    </SidebarProvider>
  );
});

export default SidebarApp;
