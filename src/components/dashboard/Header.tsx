"use client";
import React, { useEffect, useState } from "react";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./Drawer";
import { selectUser, useSelector } from "@/lib/redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { usuario } = useSelector(selectUser);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [router, usuario]);

  return (
    <div>
      <AppBarComponent open={open} toggleDrawer={toggleDrawer} />
      <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
    </div>
  );
}
