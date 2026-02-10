import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";

import { SidebarItem } from "@/Context/SidebarItem";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/Elements/Shadcn/Collapsible/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/Components/Elements/Shadcn/Sidebar/sidebar";

const CreateSidebar = memo(({ pathname }) => {
  const SIDEBAR_ITEMS = useMemo(() => SidebarItem, []);
  // console.log(pathname);

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
        <SidebarGroup className="items-center gap-1 font-semibold tracking-wide">
          {SIDEBAR_ITEMS.map((item) =>
            Array.isArray(item.children) && item.children.length > 0 ? (
              <CollapsibleSidebarMenuItem key={item.title} item={item} activePath={pathname} />
            ) : (
              item.children === null && <StaticSidebarMenuItem key={item.title} item={item} activePath={pathname} />
            ),
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={`Logout`}>
                <Link
                  to={"/dashboard"}
                  className="flex justify-between border border-red-500 text-red-500 hover:bg-red-500! hover:text-white! font-semibold"
                >
                  <span>Logout</span>
                  <LogOut />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
});

const StaticSidebarMenuItem = memo(({ item, activePath }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={activePath === item.path} tooltip={item.title}>
          <Link to={item.path} className={activePath === item.path ? "bg-primary! text-background!" : ""}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

const CollapsibleSidebarMenuItem = memo(({ item, activePath }) => {
  return (
    <SidebarMenu>
      <Collapsible asChild defaultOpen={true} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto cursor-pointer transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="my-1 border-primary/50!">
              {item.children?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild isActive={activePath === subItem.path}>
                    <Link
                      to={subItem.path}
                      className={activePath === subItem.path ? "bg-primary! text-background!" : ""}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
});

const SidebarApp = memo(({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <CreateSidebar pathname={pathname} />
      {children}
    </>
  );
});

export default SidebarApp;
