import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '@/lib/db';
import Appointment from '@/models/Appointment';
import PDFDocument from 'pdfkit';

// GET: /api/admin/appointments/export?doctorId=...&date=YYYY-MM-DD
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

  // PDF generieren
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="termine.pdf"');
  doc.pipe(res);

  doc.fontSize(18).text('Termine Export', { align: 'center' });
  doc.moveDown();
  type AppointmentDoc = {
    doctorId: { name: string } | null;
    when: string;
    status: string;
    patient?: { name?: string; email?: string; geburtsdatum?: string; telefon?: string };
  };
  (appointments as AppointmentDoc[]).forEach((a, i: number) => {
    doc.fontSize(12).text(
      `${i + 1}. ${a.doctorId ? a.doctorId.name : 'Allgemein'} | ${new Date(a.when).toLocaleString()} | Status: ${a.status}`
    );
    if (a.patient) {
      doc.text(`   Patient: ${a.patient.name || ''}, Email: ${a.patient.email || ''}, Geburtsdatum: ${a.patient.geburtsdatum || ''}, Telefon: ${a.patient.telefon || ''}`);
    }
    doc.moveDown(0.5);
  });
  doc.end();
}
