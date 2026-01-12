import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import SidebarContent from "../atoms/SidebarContent";

export type SidebarPosition = "left" | "right";

interface SidebarProps {
  children?: ReactNode;
  open: boolean;
  toggle: (value?: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  position?: SidebarPosition;
  variant?: "permanent" | "temporary" | "persistent";
  enableScroll?: boolean;
  width?: number;
  className?: string;
}

export interface SidebarRef {
  toggle: (value?: boolean) => void;
  open: () => void;
  close: () => void;
}

const Sidebar = forwardRef<SidebarRef, SidebarProps>(
  (
    {
      children,
      open,
      toggle: toggleSidebar,
      openSidebar,
      closeSidebar,
      position = "left",
      variant = "permanent",
      enableScroll = true,
      width = 353,
      className = "",
    },
    ref
  ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    
    const effectiveVariant = isMobile ? "temporary" : variant;

    useImperativeHandle(
      ref,
      () => ({
        toggle: toggleSidebar,
        open: openSidebar,
        close: closeSidebar,
      }),
      [toggleSidebar, openSidebar, closeSidebar]
    );

    return (
      <Drawer
        variant={effectiveVariant}
        anchor={position}
        open={open}
        onClose={closeSidebar}
        className={className}
        sx={{
          width: width,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: width,
            boxSizing: "border-box",
            bgcolor: "primary.main",
            borderRight: effectiveVariant === 'temporary' ? 'none' : undefined
          },
        }}
      >
        <SidebarContent enableScroll={enableScroll}>
          {children}
        </SidebarContent>
      </Drawer>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;