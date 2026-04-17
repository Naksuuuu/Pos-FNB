import { memo, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { ChevronRight, LogOut } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import { SidebarItem } from "@/Features/Dashboard/Shared/Constants/SidebarItem";
import useLogout from "@/Features/Auth/Login/Hooks/useLogout";

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
import { Button } from "@/Components/Elements/Shadcn/button";
import { selectAuthRole } from "@/Redux/Features/Auth/Login/LoginSelector";

const CreateSidebar = memo(({ pathname }) => {
  const currentRole = useSelector(selectAuthRole);
  const SIDEBAR_ITEMS = useMemo(() => SidebarItem.filter((item) => item.allowed_roles.includes(currentRole)), [currentRole]);
  const { logout } = useLogout();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full py-6 text-center"
              render={
                <Link to={ROUTES.PUBLIC.HOME}>
                  <h1 className="text-2xl font-extrabold tracking-tight">
                    POS <span className="text-primary/90">App</span>
                  </h1>
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
        <SidebarGroup className="items-center gap-1 p-0 font-semibold tracking-wide">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className=" flex justify-between border border-destructive/50 text-destructive hover:bg-destructive! 
                    hover:text-background! font-semibold transition-colors duration-300"
                  >
                    <span>Logout</span>
                    <LogOut />
                  </Button>
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
  const isActive = item.path === "/dashboard" ? activePath === item.path : activePath?.startsWith(item.path);
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
          className={isActive ? "bg-primary! text-background!" : ""}
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

const DashSidebar = memo(({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <CreateSidebar pathname={pathname} />
      {children}
    </>
  );
});

export default DashSidebar;
