"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SlotForm from './SlotForm';
import AppointmentList from './AppointmentList';

// Dummy weekdays for selection
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

type Doctor = {
  _id: string;
  name: string;
  fachrichtung?: string;
  workdays?: string[];
};

export default function KalenderAdmin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // Map: doctorId -> selectedDate
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});

  useEffect(() => {
    axios.get<Doctor[]>('/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(() => setError('Fehler beim Laden der Ärzte'))
      .finally(() => setLoading(false));
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

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Arbeitstage der Ärzte verwalten</h2>
      {doctors.map(doctor => (
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
  );
}
