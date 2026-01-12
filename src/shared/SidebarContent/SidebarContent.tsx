import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { type ReactNode } from "react";
import { useAuth } from "../../@d/auth/AuthContext";

interface MenuItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
}

interface SidebarContentProps {
  menuItems: MenuItem[];
}

export default function SidebarContent({ menuItems }: SidebarContentProps) {
  const { user } = useAuth();
  
  return (
    <Box sx={{ color: "white", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user!.avatarImg} sx={{ bgcolor: "secondary.light", color: "primary.main" }}>
          {user!.name.charAt(0)}
        </Avatar>
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: "bold" }}>
            {user!.name}
          </Typography>
          <Typography variant="caption" noWrap sx={{ opacity: 0.7, display: "block" }}>
            {user!.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

      <List sx={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={item.onClick}
            selected={item.active}
            sx={{
              mx: 1,
              borderRadius: 1,
              "&.Mui-selected": {
                bgcolor: "rgba(255, 255, 255, 0.15)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.25)" },
              },
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      
      <Box sx={{ p: 2, opacity: 0.5 }}>
        <Typography variant="caption">D-Template v0.1</Typography>
      </Box>
    </Box>
  );
}