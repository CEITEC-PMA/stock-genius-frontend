"use client";
import React, { useEffect, useState } from "react";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./Drawer";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/api";
import { getDadosUser } from "@/actions/getDadosUser";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerWidth: number = 240;

  return (
    <div>
      <AppBarComponent
        open={open}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
      />
      <DrawerComponent
        open={open}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
      />
    </div>
  );
}
