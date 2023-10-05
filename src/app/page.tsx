import Login from "@/components/login";
import React from "react";
import AppBarLogin from "@/components/dashboard/AppBarLogin";

export default function Home() {
  return (
    <div>
      <AppBarLogin />
      <Login />
    </div>
  );
}
