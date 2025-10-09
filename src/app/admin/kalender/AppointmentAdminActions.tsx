"use client";
import React from 'react';
import axios from 'axios';

type Appointment = {
  _id: string;
  doctorId: { _id: string; name: string; fachrichtung?: string } | null;
  when: string;
  status: 'frei' | 'gebucht' | 'abgesagt';
  patient?: { name?: string; email?: string; geburtsdatum?: string; telefon?: string };
};


type Props = {
  appointment: Appointment;
  onStatusChange: (id: string, status: 'frei' | 'gebucht' | 'abgesagt') => void;
  onDelete?: (id: string) => void;
};

export default function AppointmentAdminActions({ appointment, onStatusChange, onDelete }: Props) {
  const handleStatus = async (status: 'frei' | 'gebucht' | 'abgesagt') => {
    await axios.patch('/api/admin/appointments', { id: appointment._id, status });
    onStatusChange(appointment._id, status);
  };

  const handleDelete = async () => {
    if (!window.confirm('Diesen Termin wirklich löschen?')) return;
    await axios.delete('/api/admin/appointments', { data: { id: appointment._id } });
    if (onDelete) onDelete(appointment._id);
  };

  return (
    <span style={{ marginLeft: 12 }}>
  <select value={appointment.status} onChange={e => handleStatus(e.target.value as 'frei' | 'gebucht' | 'abgesagt')}>
        <option value="frei">frei</option>
        <option value="gebucht">gebucht</option>
        <option value="abgesagt">abgesagt</option>
      </select>
      <button onClick={handleDelete} style={{ marginLeft: 8, color: 'red' }}>🗑️</button>
      {appointment.patient && (
        <span style={{ marginLeft: 16, color: '#555', fontSize: 13 }}>
          <b>Patient:</b> {appointment.patient.name}<br />
          <b>Email:</b> {appointment.patient.email}<br />
          <b>Geburtsdatum:</b> {appointment.patient.geburtsdatum}<br />
          <b>Telefon:</b> {appointment.patient.telefon}
        </span>
      )}
    </span>
  );
}
