import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight, LogOut } from "lucide-react";

import { SidebarItem } from "@/Context/SidebarItem";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/Elements/Shadcn/collapsible";
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
} from "@/Components/Elements/Shadcn/sidebar";

const CreateSidebar = memo(({ pathname }) => {
  const SIDEBAR_ITEMS = useMemo(() => SidebarItem, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="py-6"
              render={
                <Link to="/">
                  <img src={"https://avatars.githubusercontent.com/u/144807673?v=4"} alt="Logo" width={35} height={35} className="rounded-full select-none" />
                  <span className="select-none">Ariel</span>
                </Link>
              }
            ></SidebarMenuButton>
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
              <SidebarMenuButton
                render={
                  <Link to={"/dashboard"} className="flex justify-between border border-red-500 text-red-500 hover:bg-red-500! hover:text-white! font-semibold">
                    <span>Logout</span>
                    <LogOut />
                  </Link>
                }
              ></SidebarMenuButton>
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
        <SidebarMenuButton
          render={(props) => (
            <Link {...props} to={item.path}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          )}
          className={activePath === item.path ? "bg-primary! text-background!" : ""}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

const CollapsibleSidebarMenuItem = memo(({ item, activePath }) => {
  return (
    <SidebarMenu>
      <Collapsible
        defaultOpen={true}
        className="group/collapsible"
        render={(props, state) => (
          <SidebarMenuItem {...props} data-state={state.open ? "open" : "closed"}>
            <CollapsibleTrigger
              render={
                <SidebarMenuButton>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto cursor-pointer transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              }
            ></CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="my-1 border-primary/50!">
                {item.children?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      render={(props) => (
                        <Link {...props} to={subItem.path}>
                          <span>{subItem.title}</span>
                        </Link>
                      )}
                      className={activePath?.startsWith(subItem.path) ? "bg-primary! text-background!" : ""}
                    ></SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        )}
      ></Collapsible>
    </SidebarMenu>
  );
});

const DashboardSidebar = memo(({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <CreateSidebar pathname={pathname} />
      {children}
    </>
  );
});

export default DashboardSidebar;
