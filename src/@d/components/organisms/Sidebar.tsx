import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import SidebarContent from "../atoms/SidebarContent";

export type SidebarPosition = "left" | "right";
export type SidebarVariant = "permanent" | "temporary";

interface SidebarProps {
  children?: ReactNode;
  open?: boolean;
  position?: SidebarPosition;
  variant?: SidebarVariant;
  enableScroll?: boolean;
  width?: number;
  onClose?: () => void;
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
      open = true,
      position = "left",
      variant = "permanent",
      enableScroll = true,
      width = 280,
      onClose,
      className = "",
    },
    ref
  ) => {
    const {
      isOpen,
      toggle,
      open: openSidebar,
      close,
    } = useSidebar({
      initialOpen: open,
      onToggle: (isOpen) => !isOpen && onClose?.(),
    });

    useImperativeHandle(
      ref,
      () => ({
        toggle,
        open: openSidebar,
        close,
      }),
      [toggle, openSidebar, close]
    );

    const sidebarStyles = {
      position: "fixed" as const,
      top: 0,
      [position]: 0,
      width: `${width}px`,
      height: "100vh",
      backgroundColor: "#fff",
      borderRight: position === "left" ? "1px solid #e0e0e0" : "none",
      borderLeft: position === "right" ? "1px solid #e0e0e0" : "none",
      transform: isOpen
        ? "translateX(0)"
        : `translateX(${position === "left" ? "-100%" : "100%"})`,
      transition: "transform 0.3s ease-in-out",
      zIndex: variant === "temporary" ? 1300 : 1200,
      boxShadow: variant === "temporary" ? "2px 0 8px rgba(0,0,0,0.1)" : "none",
    };

    const backdropStyles = {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1299,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? ("visible" as const) : ("hidden" as const),
      transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    };

    const showBackdrop = variant === "temporary" && isOpen;

    return (
      <>
        {/* Backdrop para variant temporary */}
        {variant === "temporary" && (
          <div style={backdropStyles} onClick={close} aria-hidden="true" />
        )}

        {/* Sidebar */}
        <aside
          className={`sidebar sidebar-${position} sidebar-${variant} ${className}`}
          style={sidebarStyles}
          aria-hidden={!isOpen}
        >
          <SidebarContent enableScroll={enableScroll}>
            {children}
          </SidebarContent>
        </aside>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
