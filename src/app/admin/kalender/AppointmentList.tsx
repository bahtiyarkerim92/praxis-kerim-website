"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentAdminActions from './AppointmentAdminActions';

type Appointment = {
  _id: string;
  doctorId: { _id: string; name: string; fachrichtung?: string } | null;
  when: string;
  status: 'frei' | 'gebucht' | 'abgesagt';
  patient?: {
    name?: string;
    email?: string;
    geburtsdatum?: string;
    telefon?: string;
    adresse?: string;
    versicherungsnummer?: string;
    versicherungsart?: 'privat' | 'gesetzlich';
    versicherungsbestaetigung?: boolean;
  };
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
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: 8 }}>Datum & Zeit</th>
              <th style={{ padding: 8 }}>Arzt</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Patient</th>
              <th style={{ padding: 8 }}>Kontakt</th>
              <th style={{ padding: 8 }}>Versicherung</th>
              <th style={{ padding: 8 }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>
                  <b>{new Date(app.when).toLocaleString('de-DE', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}</b>
                </td>
                <td style={{ padding: 8 }}>
                  {app.doctorId ? (
                    <>
                      {app.doctorId.name}
                      {app.doctorId.fachrichtung && (
                        <div style={{ fontSize: 12, color: '#666' }}>
                          {app.doctorId.fachrichtung}
                        </div>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#999' }}>Kein Arzt zugewiesen</span>
                  )}
                </td>
                <td style={{ padding: 8 }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 'bold',
                      backgroundColor:
                        app.status === 'frei' ? '#e3f2fd' :
                        app.status === 'gebucht' ? '#c8e6c9' :
                        '#ffcdd2',
                      color:
                        app.status === 'frei' ? '#1976d2' :
                        app.status === 'gebucht' ? '#388e3c' :
                        '#d32f2f',
                    }}
                  >
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  {app.patient?.name ? (
                    <>
                      <div><b>{app.patient.name}</b></div>
                      {app.patient.geburtsdatum && (
                        <div style={{ fontSize: 12, color: '#666' }}>
                          geb. {new Date(app.patient.geburtsdatum).toLocaleDateString('de-DE')}
                        </div>
                      )}
                      {app.patient.adresse && (
                        <div style={{ fontSize: 12, color: '#666' }}>
                          {app.patient.adresse}
                        </div>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#999' }}>–</span>
                  )}
                </td>
                <td style={{ padding: 8 }}>
                  {app.patient ? (
                    <>
                      {app.patient.telefon && (
                        <div style={{ fontSize: 12 }}>📞 {app.patient.telefon}</div>
                      )}
                      {app.patient.email && (
                        <div style={{ fontSize: 12 }}>✉️ {app.patient.email}</div>
                      )}
                      {!app.patient.telefon && !app.patient.email && (
                        <span style={{ color: '#999' }}>–</span>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#999' }}>–</span>
                  )}
                </td>
                <td style={{ padding: 8 }}>
                  {app.patient ? (
                    <>
                      {app.patient.versicherungsnummer && (
                        <div style={{ fontSize: 12 }}>
                          Nr: {app.patient.versicherungsnummer}
                        </div>
                      )}
                      {app.patient.versicherungsart && (
                        <div style={{ fontSize: 12, textTransform: 'capitalize' }}>
                          {app.patient.versicherungsart}
                        </div>
                      )}
                      {app.patient.versicherungsbestaetigung && (
                        <div style={{ fontSize: 11, color: '#388e3c' }}>
                          ✓ Bestätigt
                        </div>
                      )}
                      {!app.patient.versicherungsnummer && !app.patient.versicherungsart && (
                        <span style={{ color: '#999' }}>–</span>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#999' }}>–</span>
                  )}
                </td>
                <td style={{ padding: 8 }}>
                  <AppointmentAdminActions 
                    appointment={app} 
                    onStatusChange={handleStatusChange} 
                    onDelete={handleDelete} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
