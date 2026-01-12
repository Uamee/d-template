import { Outlet } from "react-router-dom";
import AppSidebar from "../organisms/AppSidebar";
import LayoutWithSidebar from "../templates/LayoutWithSidebar";

export default function MainLayout() {
  return (
    <LayoutWithSidebar sidebarContent={<AppSidebar />}>
      <Outlet />
    </LayoutWithSidebar>
  );
}
