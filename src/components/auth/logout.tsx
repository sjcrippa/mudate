"use client";

import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "../ui/button";
import { createClient } from "@/db/supabase/client";

export default function Logout() {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/auth/login");
  };

  return (
    <section>
      <Button variant="outline" onClick={handleLogout}>
        <LogOut />
        Cerrar sesion
      </Button>
    </section>
  );
}
