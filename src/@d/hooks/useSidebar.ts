import { useCallback, useEffect, useState } from "react";

interface UseSidebarProps {
  initialOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const useSidebar = ({
  initialOpen = true,
  onToggle,
}: UseSidebarProps = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggle = useCallback(
    (value?: boolean) => {
      const newValue = value !== undefined ? value : !isOpen;
      setIsOpen(newValue);
      onToggle?.(newValue);
    },
    [isOpen, onToggle]
  );

  const open = useCallback(() => toggle(true), [toggle]);
  const close = useCallback(() => toggle(false), [toggle]);

  useEffect(() => {
    setIsOpen(initialOpen);
  }, [initialOpen]);

  return { isOpen, toggle, open, close };
};
