"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login fehlgeschlagen");
      }
      router.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unbekannter Fehler");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 border border-yellow-200"
        style={{ boxShadow: '0 8px 32px 0 rgba(238,193,107,0.15)' }}
      >
        <Image
          src="/images/logo.PNG"
          alt="Praxis Kerim Logo"
          width={80}
          height={80}
          className="mb-2 rounded-full shadow"
          priority
        />
        <h1 className="text-3xl font-extrabold text-yellow-700 mb-2 tracking-tight">Admin Login</h1>
        <div className="w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-yellow-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            autoFocus
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-yellow-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-bold py-2 rounded-lg shadow hover:from-yellow-500 hover:to-yellow-400 transition"
        >
          {loading ? "Einloggen..." : "Login"}
        </button>
        {error && (
          <div className="w-full text-center text-red-600 bg-red-50 border border-red-200 rounded p-2 animate-shake">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
