import { type ReactNode } from "react";

interface SidebarContentProps {
  children: ReactNode;
  enableScroll?: boolean;
  className?: string;
}

export default function SidebarContent({
  children,
  enableScroll = true,
  className = "",
}: SidebarContentProps) {
  if (!children) return null;

  return (
    <div
      className={`sidebar-content ${className}`}
      style={{
        height: "100%",
        overflow: enableScroll ? "auto" : "hidden",
        padding: "16px",
      }}
    >
      {children}
    </div>
  );
}
