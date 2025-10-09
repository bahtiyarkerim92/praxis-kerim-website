"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface SlotFormProps {
  doctorId: string | null;
  onSuccess: () => void;
}

export default function SlotForm({ doctorId, onSuccess }: SlotFormProps) {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('08:00');
  const [end, setEnd] = useState('12:00');
  const [slotLength, setSlotLength] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await axios.post('/api/admin/create-slots', {
        doctorId,
        date,
        start,
        end,
        slotLength,
      });
      setSuccess(true);
      onSuccess();
    } catch {
      setError('Fehler beim Anlegen der Slots');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
      <div>
        <label>Datum: <input type="date" value={date} onChange={e => setDate(e.target.value)} required /></label>
      </div>
      <div>
        <label>Startzeit: <input type="time" value={start} onChange={e => setStart(e.target.value)} required /></label>
      </div>
      <div>
        <label>Endzeit: <input type="time" value={end} onChange={e => setEnd(e.target.value)} required /></label>
      </div>
      <div>
        <label>Slot-Länge (min): <input type="number" min={15} step={15} value={slotLength} onChange={e => setSlotLength(Number(e.target.value))} required /></label>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Speichern...' : 'Slots anlegen'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Slots erfolgreich angelegt!</div>}
    </form>
  );
}
