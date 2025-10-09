"use client";

import React, { useEffect, useState } from "react";

export default function AdminSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.email) setEmail(data.email);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, oldPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Speichern");
      }
      setSuccess(true);
      setPassword("");
      setOldPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Admin-Zugangsdaten ändern</h2>
      <label className="block">
        <span className="text-gray-700">E-Mail</span>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Altes Passwort</span>
        <input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Neues Passwort</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#EEC16B] text-black font-bold py-2 rounded hover:bg-[#eebc3a] transition"
      >
        {loading ? "Speichert..." : "Speichern"}
      </button>
      {success && <div className="text-green-600 text-center">Gespeichert!</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
}
