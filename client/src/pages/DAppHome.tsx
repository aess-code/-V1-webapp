/**
 * DApp Home Page (/app)
 * Entry point for the DApp section.
 * Redirects to Discover.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function DAppHomePage() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/app/explore");
  }, []);
  return null;
}
