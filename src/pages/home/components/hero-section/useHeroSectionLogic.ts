import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function useHeroSectionLogic() {
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState("");

  function handleSubdomainChange(value: string) {
    setSubdomain(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  }

  function handleCheckAvailability() {
    void navigate({ to: "/register" });
  }

  return { subdomain, handleSubdomainChange, handleCheckAvailability };
}
