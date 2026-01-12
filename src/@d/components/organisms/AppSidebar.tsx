import { Dashboard, AdminPanelSettings, Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import SidebarContent from "../../../shared/SidebarContent/SidebarContent";

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const items = [
    {
      label: "Início",
      icon: <Dashboard />,
      onClick: () => navigate("/"),
      active: isActive("/"),
    },
  ];

  if (user?.isAdmin) {
    items.push({
      label: "Administração",
      icon: <AdminPanelSettings />,
      onClick: () => navigate("/admin"),
      active: isActive("/admin"),
    });
  }

  items.push({
    label: "Sair",
    icon: <Logout />,
    onClick: () => logout(),
    active: false,
  });

  return <SidebarContent menuItems={items} />;
}
