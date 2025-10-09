import React, { useState } from "react";

interface OrderFormProps {
  onSuccess: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    medication: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Fehler bei der Bestellung.");
      setSuccess(true);
      setForm({ name: "", email: "", medication: "" });
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
      <textarea
        name="medication"
        value={form.medication}
        onChange={handleChange}
        placeholder="Medikament(e) und ggf. Dosierung"
        required
        className="w-full border rounded px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#EEC16B] text-black font-bold py-2 rounded hover:bg-[#eebc3a] transition"
      >
        {loading ? "Sendet..." : "Bestellung absenden"}
      </button>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Bestellung erfolgreich gesendet!</div>}
    </form>
  );
}
