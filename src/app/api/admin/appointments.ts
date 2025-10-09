import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import Appointment from '@/models/Appointment';


// GET: /api/admin/appointments?doctorId=...&date=YYYY-MM-DD
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  await dbConnect();
  const { doctorId, date } = req.query;
  const filter: Record<string, unknown> = {};
  if (doctorId) filter.doctorId = doctorId;
  if (date) {
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);
    filter.when = { $gte: start, $lte: end };
  }
  const appointments = await Appointment.find(filter).populate('doctorId', 'name fachrichtung');
  res.json(appointments);
}
