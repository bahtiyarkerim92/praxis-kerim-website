"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

interface Slot {
  _id: string;
  when: string;
  doctorId: string | null;
  doctorName: string;
}

interface BookingCalendarProps {
  onSelectSlot: (slot: Slot) => void;
}

export default function BookingCalendar({ onSelectSlot }: BookingCalendarProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/appointments?status=frei");
        if (!res.ok) throw new Error("Fehler beim Laden der freien Termine.");
        const data = await res.json();
        setSlots(data);
      } catch {
        setError("Fehler beim Laden der freien Termine.");
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, []);

  // Alle Tage mit mindestens einem freien Slot
  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().slice(0, 10);
    return !slots.some(slot => slot.when.slice(0, 10) === dateStr);
  };

  // Slots für das ausgewählte Datum
  const slotsForDate = selectedDate
    ? slots.filter(slot => slot.when.slice(0, 10) === selectedDate.toISOString().slice(0, 10))
    : [];

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-xl font-bold text-[#EEC16B] mb-2">Freie Termine wählen</h3>
      {error && <div className="text-red-600">{error}</div>}
      <Calendar
        onChange={date => setSelectedDate(date as Date)}
        value={selectedDate}
        tileDisabled={tileDisabled}
        minDate={new Date()}
        locale="de-DE"
        className="rounded shadow border border-yellow-200"
      />
      {selectedDate && (
        <div className="w-full mt-4">
          <h4 className="text-lg font-semibold mb-2 text-yellow-700">
            {selectedDate.toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </h4>
          {slotsForDate.length === 0 ? (
            <div className="text-gray-500">Keine freien Termine an diesem Tag.</div>
          ) : (
            <ul className="space-y-2">
              {slotsForDate.map(slot => (
                <li key={slot._id}>
                  <button
                    onClick={() => onSelectSlot(slot)}
                    className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-900 font-semibold py-2 px-4 rounded shadow border border-yellow-300 flex justify-between items-center"
                  >
                    <span>{(() => {
                      // Parse the UTC datetime and display the time correctly
                      const slotDate = new Date(slot.when);
                      const hours = slotDate.getUTCHours();
                      const minutes = slotDate.getUTCMinutes();
                      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    })()}</span>
                    <span className="text-sm text-gray-600">{slot.doctorName}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
