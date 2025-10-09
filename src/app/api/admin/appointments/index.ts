import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import Appointment from '@/models/Appointment';

// PATCH: /api/admin/appointments { id, status }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    if (!id || !status) return res.status(400).json({ error: 'Missing params' });
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    return res.json(updated);
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });
    await Appointment.findByIdAndDelete(id);
    return res.json({ ok: true });
  }
  return res.status(405).end();
}
