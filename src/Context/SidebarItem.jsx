import { Computer, LayoutDashboard, Database, ConciergeBell } from "lucide-react";
import { ROUTES } from "@/Constants/Common/RouteConstant";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD.HOME,
    icon: LayoutDashboard,
    children: null,
  },
  {
    title: "Inventaris",
    icon: Database,
    children: [
      {
        title: "Menu",
        path: ROUTES.DASHBOARD.INVENTORY.MENU,
        icon: LayoutDashboard,
        children: null,
      },
      {
        title: "Meja",
        path: ROUTES.DASHBOARD.INVENTORY.TABLE,
        icon: LayoutDashboard,
        children: null,
      },
    ],
  },
  {
    title: "Pesanan",
    path: ROUTES.DASHBOARD.ORDER,
    icon: ConciergeBell,
    children: null,
  },
  {
    title: "Kasir",
    path: ROUTES.DASHBOARD.CASHIER,
    icon: Computer,
    children: null,
  },
];
