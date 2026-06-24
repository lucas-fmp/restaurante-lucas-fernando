import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { Menu } from "./pages/Menu";
import { Kitchen } from "./pages/Kitchen";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { CreateOrder } from "./pages/CreateOrder";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: Orders },
      { path: "orders/new", Component: CreateOrder },
      { path: "menu", Component: Menu },
      { path: "kitchen", Component: Kitchen },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);