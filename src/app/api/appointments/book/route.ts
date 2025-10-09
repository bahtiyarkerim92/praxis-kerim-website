import { NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/db';
import Appointment from '../../../../models/Appointment';
import { encrypt } from '../../../../lib/crypto';
import { bookSchema } from '../../../../lib/validators';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(parsed.error.format(), { status: 400 });
  await dbConnect();
  const appt = await Appointment.findById(parsed.data.appointmentId);
  if (!appt || appt.status !== 'frei') {
    return NextResponse.json({ error: 'Slot nicht verfügbar' }, { status: 409 });
  }
  appt.status = 'gebucht';
  // Patientendaten verschlüsseln
  const encryptedPatient: Record<string, string> = {};
  const patientObj = parsed.data.patient as Record<string, string>;
  for (const key of Object.keys(patientObj)) {
    const value = patientObj[key];
    if (value) encryptedPatient[key] = encrypt(value);
  }
  appt.patient = encryptedPatient;
  await appt.save();
  return NextResponse.json({ ok: true, appointmentId: appt._id });
}
