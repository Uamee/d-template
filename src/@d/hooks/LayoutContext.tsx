import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LayoutContextData {
  isSidebarOpen: boolean;
  toggleSidebar: (value?: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;

  isFullWidth: boolean;
  setFullWidth: (isFull: boolean) => void;
}

const LayoutContext = createContext<LayoutContextData | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const toggleSidebar = useCallback((value?: boolean) => {
    setIsSidebarOpen((prev) => (value !== undefined ? value : !prev));
  }, []);

  const [isFullWidth, setFullWidth] = useState(false);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      isFullWidth,
      setFullWidth,
    }),
    [isSidebarOpen, isFullWidth, toggleSidebar, openSidebar, closeSidebar]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout deve ser usado dentro de um LayoutProvider");
  }
  return context;
};
