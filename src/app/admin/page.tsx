"use client";


import React, { useEffect, useState } from "react";
import axios from 'axios';
import SlotForm from './kalender/SlotForm';
import AppointmentList from './kalender/AppointmentList';
import AdminLoginForm from "./AdminLoginForm";
import AdminLogoutButton from "./AdminLogoutButton";
import AdminSettings from "./AdminSettings";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  date: string;
  doctor: string;
  reason: string;
  createdAt: string;
}

interface Order {
  _id: string;
  name: string;
  email: string;
  medication: string;
  createdAt: string;
}

type Doctor = {
  _id: string;
  name: string;
  fachrichtung?: string;
  workdays?: string[];
};

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default function AdminPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [docLoading, setDocLoading] = useState(true);
  const [docError, setDocError] = useState('');
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const res = await fetch("/api/admin");
      setIsLoggedIn(res.ok);
    }
    checkSession();
  }, []);
  useEffect(() => {
    setDocLoading(true);
    axios.get<Doctor[]>('/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(() => setDocError('Fehler beim Laden der Ärzte'))
      .finally(() => setDocLoading(false));
  }, []);

  const handleWorkdayChange = (doctorId: string, day: string) => {
    setDoctors(prev => prev.map(doc => {
      if (doc._id !== doctorId) return doc;
      const hasDay = doc.workdays?.includes(day);
      return {
        ...doc,
        workdays: hasDay
          ? (doc.workdays || []).filter((d: string) => d !== day)
          : [...(doc.workdays || []), day],
      };
    }));
    // TODO: Save to backend
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const [aRes, oRes] = await Promise.all([
          fetch("/api/appointments"),
          fetch("/api/orders"),
        ]);
        if (!aRes.ok || !oRes.ok) throw new Error("Fehler beim Laden der Daten.");
        setAppointments(await aRes.json());
        setOrders(await oRes.json());
      } catch {
        setError("Fehler beim Laden der Daten.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [isLoggedIn]);

  const deleteAppointment = async (id: string) => {
    if (!confirm("Termin wirklich löschen?")) return;
    try {
      const res = await fetch(`/api/appointments?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch {
      alert("Fehler beim Löschen des Termins.");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Bestellung wirklich löschen?")) return;
    try {
      const res = await fetch(`/api/orders?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Fehler beim Löschen der Bestellung.");
    }
  };

  if (isLoggedIn === null) {
    return <div className="text-center py-20">Lädt...</div>;
  }
  if (!isLoggedIn) {
    return <AdminLoginForm />;
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-200 py-10 px-2 relative flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 border border-yellow-200 relative">
        <AdminLogoutButton />
        <button
          onClick={() => setShowSettings(s => !s)}
          className="absolute top-4 right-32 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-4 py-2 rounded-lg shadow hover:from-yellow-500 hover:to-yellow-400 transition font-semibold"
        >
          Zugangsdaten ändern
        </button>
        {showSettings && <AdminSettings />}
        <h1 className="text-4xl font-extrabold mb-10 text-center text-yellow-700 tracking-tight">Admin Panel</h1>
        {loading ? (
          <div className="text-center text-lg">Lädt...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="bg-yellow-50 rounded-xl shadow p-6 border border-yellow-100">
              <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
                <span role="img" aria-label="calendar">📅</span> Termine
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">E-Mail</th>
                      <th className="p-2 border">Datum</th>
                      <th className="p-2 border">Arzt</th>
                      <th className="p-2 border">Grund</th>
                      <th className="p-2 border">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr key={a._id} className="border-b hover:bg-yellow-50 transition">
                        <td className="p-2 border">{a.name}</td>
                        <td className="p-2 border">{a.email}</td>
                        <td className="p-2 border">{new Date(a.date).toLocaleString()}</td>
                        <td className="p-2 border">{a.doctor}</td>
                        <td className="p-2 border">{a.reason}</td>
                        <td className="p-2 border">
                          <button onClick={() => deleteAppointment(a._id)} className="text-red-600 hover:underline font-semibold">Löschen</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {appointments.length === 0 && <div className="text-center py-4">Keine Termine vorhanden.</div>}
              </div>
            </section>
            <section className="bg-yellow-50 rounded-xl shadow p-6 border border-yellow-100">
              <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
                <span role="img" aria-label="order">💊</span> Bestellungen
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">E-Mail</th>
                      <th className="p-2 border">Medikament</th>
                      <th className="p-2 border">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} className="border-b hover:bg-yellow-50 transition">
                        <td className="p-2 border">{o.name}</td>
                        <td className="p-2 border">{o.email}</td>
                        <td className="p-2 border">{o.medication}</td>
                        <td className="p-2 border">
                          <button onClick={() => deleteOrder(o._id)} className="text-red-600 hover:underline font-semibold">Löschen</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div className="text-center py-4">Keine Bestellungen vorhanden.</div>}
              </div>
            </section>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-yellow-700 flex items-center gap-2">
            <span role="img" aria-label="calendar">🗓️</span> Kalender & Slot-Management
          </h2>
          {docLoading ? <div>Lädt Ärzte...</div> : docError ? <div>{docError}</div> : doctors.map(doctor => (
            <div key={doctor._id} style={{ marginBottom: 32, borderBottom: '1px solid #eee', paddingBottom: 16 }}>
              <strong>{doctor.name}</strong>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {WEEKDAYS.map(day => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      checked={doctor.workdays?.includes(day) || false}
                      onChange={() => handleWorkdayChange(doctor._id, day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
              <SlotForm doctorId={doctor._id} onSuccess={() => {}} />
              <div style={{ margin: '12px 0' }}>
                <label>
                  Termine am Datum:
                  <input
                    type="date"
                    value={selectedDates[doctor._id] || ''}
                    onChange={e => setSelectedDates(d => ({ ...d, [doctor._id]: e.target.value }))}
                    style={{ marginLeft: 8 }}
                  />
                </label>
              </div>
              <AppointmentList doctorId={doctor._id} date={selectedDates[doctor._id] || ''} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
