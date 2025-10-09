import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import Appointment from '../../../models/Appointment';
import { decrypt } from '../../../lib/crypto';
import { createSlotSchema } from '../../../lib/validators';

export async function GET() {
  await dbConnect();
  const now = new Date();
  const items = await Appointment.find({ when: { $gte: now } }).sort({ when: 1 });
  // Patientendaten entschlüsseln
  const decrypted = items.map((appt) => {
    const patient: Record<string, string> = {};
    for (const key of Object.keys(appt.patient || {})) {
      const value = (appt.patient as Record<string, string>)[key];
      if (value) patient[key] = decrypt(value);
    }
    return { ...appt.toObject(), patient };
  });
  return NextResponse.json(decrypted);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createSlotSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(parsed.error.format(), { status: 400 });
  const when = new Date(parsed.data.when);
  await dbConnect();
  const doc = await Appointment.create({ when, doctorId: parsed.data.doctorId, status: 'frei' });
  return NextResponse.json(doc, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, status, when, doctorId } = await req.json();
  await dbConnect();
  const updated = await Appointment.findByIdAndUpdate(
    id,
    { $set: { status, when, doctorId } },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await dbConnect();
  await Appointment.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
