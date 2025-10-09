import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import Appointment from '@/models/Appointment';

// POST: /api/admin/create-slots
// Body: { doctorId: string|null, date: string (YYYY-MM-DD), start: string (HH:mm), end: string (HH:mm), slotLength: number (min) }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  await dbConnect();
  const { doctorId, date, start, end, slotLength } = req.body;
  if (!date || !start || !end || !slotLength) return res.status(400).json({ error: 'Missing params' });

  // Build slot times
  const slots = [];

  const current = new Date(`${date}T${start}:00`);
  const endDate = new Date(`${date}T${end}:00`);

  while (current < endDate) {
    const slotStart = new Date(current);
    current.setMinutes(current.getMinutes() + slotLength);
    if (current > endDate) break;
    slots.push(new Date(slotStart));
  }

  // Create appointments
  const created = await Appointment.insertMany(
    slots.map(when => ({ doctorId: doctorId || null, when, status: 'frei' }))
  );
  res.json({ ok: true, created });
}
