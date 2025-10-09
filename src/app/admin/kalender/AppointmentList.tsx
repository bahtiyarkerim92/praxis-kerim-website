"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentAdminActions from './AppointmentAdminActions';

type Appointment = {
  _id: string;
  doctorId: { _id: string; name: string; fachrichtung?: string } | null;
  when: string;
  status: 'frei' | 'gebucht' | 'abgesagt';
  patient?: { name?: string; email?: string; geburtsdatum?: string; telefon?: string };
};

type Props = {
  doctorId?: string;
  date?: string;
};

export default function AppointmentList({ doctorId, date }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('/api/admin/appointments', { params: { doctorId, date } })
      .then(res => setAppointments(res.data))
      .catch(() => setError('Fehler beim Laden der Termine'))
      .finally(() => setLoading(false));
  }, [doctorId, date]);

  if (loading) return <div>Lädt Termine...</div>;
  if (error) return <div>{error}</div>;
  if (!appointments.length) return <div>Keine Termine gefunden.</div>;

  const handleStatusChange = (id: string, status: 'frei' | 'gebucht' | 'abgesagt') => {
    setAppointments(apps => apps.map(a => a._id === id ? { ...a, status } : a));
  };

  const handleDelete = (id: string) => {
    setAppointments(apps => apps.filter(a => a._id !== id));
  };

  const handleExport = () => {
    const params = [];
    if (doctorId) params.push(`doctorId=${encodeURIComponent(doctorId)}`);
    if (date) params.push(`date=${encodeURIComponent(date)}`);
    const url = `/api/admin/appointments/export${params.length ? '?' + params.join('&') : ''}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h4 style={{ margin: 0 }}>Termine</h4>
        <button onClick={handleExport} style={{ fontSize: 14, padding: '4px 10px' }}>PDF Export</button>
      </div>
      <ul>
        {appointments.map(app => (
          <li key={app._id} style={{ marginBottom: 8 }}>
            <b>{new Date(app.when).toLocaleString()}</b> – {app.status}
            <AppointmentAdminActions appointment={app} onStatusChange={handleStatusChange} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
}
