import { Computer, LayoutDashboard, ConciergeBell, User, Package, Settings } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD.HOME,
    icon: LayoutDashboard,
    children: null,
    allowed_roles: ["admin", "cashier"],
  },
  {
    title: "User",
    path: ROUTES.DASHBOARD.USER,
    icon: User,
    children: null,
    allowed_roles: ["admin"],
  },
  {
    title: "Inventaris",
    path: ROUTES.DASHBOARD.INVENTORY.MENU,
    icon: Package,
    children: null,
    allowed_roles: ["admin", "cashier"],
  },
  {
    title: "Pesanan",
    path: ROUTES.DASHBOARD.ORDER,
    icon: ConciergeBell,
    children: null,
    allowed_roles: ["admin", "cashier"],
  },
  {
    title: "Kasir",
    path: ROUTES.DASHBOARD.CASHIER,
    icon: Computer,
    children: null,
    allowed_roles: ["admin", "cashier"],
  },
  {
    title: "Settings",
    path: ROUTES.DASHBOARD.SETTINGS,
    icon: Settings,
    children: null,
    allowed_roles: ["admin"],
  },
];
