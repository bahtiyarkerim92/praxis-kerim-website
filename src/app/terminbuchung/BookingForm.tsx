import React, { useState } from "react";

import type { Slot } from "./types";

interface BookingFormProps {
  onSuccess: () => void;
  slot?: Slot;
}

export default function BookingForm({ onSuccess, slot }: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: slot ? slot.when.slice(0, 10) : "",
    doctor: slot ? slot.doctorName : "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Fehler bei der Buchung.");
      setSuccess(true);
      setForm({ name: "", email: "", date: "", doctor: "", reason: "" });
      onSuccess();
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border rounded px-3 py-2"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="E-Mail"
        required
        className="w-full border rounded px-3 py-2"
      />
      {/* Datum und Arzt sind vorausgefüllt und readonly, wenn Slot übergeben */}
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
        readOnly={!!slot}
      />
      <input
        name="doctor"
        value={form.doctor}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
        readOnly={!!slot}
      />
      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Grund für den Termin"
        required
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#EEC16B] text-black font-bold py-2 rounded hover:bg-[#eebc3a] transition"
      >
        {loading ? "Bucht..." : "Termin buchen"}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Termin erfolgreich gebucht!</div>}
    </form>
  );
}
