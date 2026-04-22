import { useDropdown } from "@/hooks/useDropdown/useDropdown";

export function useUserMenuLogic(userName?: string | null) {
  const {
    isOpen: menuOpen,
    setIsOpen: setMenuOpen,
    ref: menuRef,
  } = useDropdown();
  const initial = userName?.[0]?.toUpperCase() ?? "?";
  return { menuOpen, setMenuOpen, menuRef, initial };
}
