import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, {
  type SidebarPosition,
  type SidebarRef,
} from "../organisms/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useLayout } from "../../hooks/LayoutContext";

interface LayoutWithSidebarProps {
  children?: ReactNode;
  sidebarContent?: ReactNode;
  sidebarPosition?: SidebarPosition;
  sidebarVariant?: "permanent" | "temporary";
  sidebarWidth?: number;
  className?: string;
  showSidebar?: boolean;
}

export default function LayoutWithSidebar({
  children,
  sidebarContent,
  sidebarPosition = "left",
  sidebarVariant = "permanent",
  sidebarWidth = 353,
  className = "",
  showSidebar = true,
}: LayoutWithSidebarProps) {
  const sidebarRef = useRef<SidebarRef>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    isFullWidth,
  } = useLayout();

  const effectiveVariant = isMobile ? "temporary" : sidebarVariant;

  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    } else if (sidebarVariant === "permanent") {
      openSidebar();
    }
  }, [isMobile, closeSidebar, openSidebar, sidebarVariant]);

  const shouldShiftContent =
    showSidebar &&
    isSidebarOpen &&
    !isMobile &&
    effectiveVariant !== "temporary";
  const mainContentMargin = shouldShiftContent ? `${sidebarWidth}px` : "0px";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
      className={`layout-with-sidebar ${className}`}
    >
      <ScrollToTop />

      {showSidebar && sidebarContent && (
        <Sidebar
          ref={sidebarRef}
          open={isSidebarOpen}
          toggle={toggleSidebar}
          openSidebar={openSidebar}
          closeSidebar={closeSidebar}
          position={sidebarPosition}
          variant={effectiveVariant}
          width={sidebarWidth}
        >
          {sidebarContent}
        </Sidebar>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(sidebarPosition === "left"
            ? { marginLeft: mainContentMargin }
            : { marginRight: mainContentMargin }),
          paddingBottom: isMobile ? "56px" : 0,
        }}
      >
        {isMobile && <Header />}

        <Container
          maxWidth={isFullWidth ? false : "lg"}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            py: { xs: 2, md: 4, lg: 8 },
            px: {
              xs: 2,
              md: isFullWidth ? 0 : 4,
              lg: isFullWidth ? 0 : 8,
            },
          }}
        >
          {children || <Outlet />}
        </Container>
      </Box>

      {isMobile && <Footer />}
    </Box>
  );
}
