import React from "react";
import Navbar from "@/components/navigation/navbar";

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200 to-orange-800">
      <Navbar />
    </main>
  );
}
