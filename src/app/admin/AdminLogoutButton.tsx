"use client";

import React from "react";

export default function AdminLogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/admin", { method: "DELETE" });
    window.location.replace("/admin");
  };
  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
