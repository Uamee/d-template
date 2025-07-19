import { useRef, type ReactNode } from "react";
import type {
    SidebarPosition,
    SidebarRef,
    SidebarVariant,
} from "../organisms/Sidebar";
import Sidebar from "../organisms/Sidebar";

interface LayoutWithSidebarProps {
  children: ReactNode;
  sidebarContent?: ReactNode;
  sidebarOpen?: boolean;
  sidebarPosition?: SidebarPosition;
  sidebarVariant?: SidebarVariant;
  sidebarWidth?: number;
  onSidebarClose?: () => void;
  className?: string;
}

export default function LayoutWithSidebar({
  children,
  sidebarContent,
  sidebarOpen = true,
  sidebarPosition = "left",
  sidebarVariant = "permanent",
  sidebarWidth = 280,
  onSidebarClose,
  className = "",
}: LayoutWithSidebarProps) {
  const sidebarRef = useRef<SidebarRef>(null);

  const mainContentStyles = {
    marginLeft:
      sidebarVariant === "permanent" &&
      sidebarPosition === "left" &&
      sidebarOpen
        ? `${sidebarWidth}px`
        : "0",
    marginRight:
      sidebarVariant === "permanent" &&
      sidebarPosition === "right" &&
      sidebarOpen
        ? `${sidebarWidth}px`
        : "0",
    transition: "margin 0.3s ease-in-out",
    minHeight: "100vh",
  };

  return (
    <div className={`layout-with-sidebar ${className}`}>
      {sidebarContent && (
        <Sidebar
          ref={sidebarRef}
          open={sidebarOpen}
          position={sidebarPosition}
          variant={sidebarVariant}
          width={sidebarWidth}
          onClose={onSidebarClose}
        >
          {sidebarContent}
        </Sidebar>
      )}

      <main className="main-content" style={mainContentStyles}>
        {children}
      </main>
    </div>
  );
}

// Hook para controlar a sidebar do template
export const useLayoutSidebar = () => {
  const sidebarRef = useRef<SidebarRef>(null);

  return {
    sidebarRef,
    toggleSidebar: (value?: boolean) => sidebarRef.current?.toggle(value),
    openSidebar: () => sidebarRef.current?.open(),
    closeSidebar: () => sidebarRef.current?.close(),
  };
};
