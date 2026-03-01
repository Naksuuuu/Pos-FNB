import { Computer, LayoutDashboard, ConciergeBell, User, Package } from "lucide-react";
import { ROUTES } from "@/Constants/Common/RouteConstant";

export const SidebarItem = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD.HOME,
    icon: LayoutDashboard,
    children: null,
  },
  {
    title: "User",
    path: ROUTES.DASHBOARD.USER,
    icon: User,
    children: null,
  },
  {
    title: "Inventaris",
    path: ROUTES.DASHBOARD.INVENTORY.MENU,
    icon: Package,
    children: null,
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
