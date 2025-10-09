import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import Order from '../../../models/Order';
import { encrypt, decrypt } from '../../../lib/crypto';
import { orderSchema } from '../../../lib/validators';

export async function GET() {
  await dbConnect();
  const items = await Order.find().sort({ createdAt: -1 });
  // Patientendaten entschlüsseln
  const decrypted = items.map((order) => {
    const patient: Record<string, string> = {};
    for (const key of Object.keys(order.patient || {})) {
      const value = (order.patient as Record<string, string>)[key];
      if (value) patient[key] = decrypt(value);
    }
    return { ...order.toObject(), patient };
  });
  return NextResponse.json(decrypted);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(parsed.error.format(), { status: 400 });
  await dbConnect();
  // Patientendaten verschlüsseln
  const encryptedPatient: Record<string, string> = {};
  for (const key of Object.keys(parsed.data.patient)) {
    const value = (parsed.data.patient as Record<string, string>)[key];
    if (value) encryptedPatient[key] = encrypt(value);
  }
  const created = await Order.create({ ...parsed.data, patient: encryptedPatient });
  // Patientendaten entschlüsseln für Response
  const decryptedPatient: Record<string, string> = {};
  for (const key of Object.keys(created.patient || {})) {
    const value = (created.patient as Record<string, string>)[key];
    if (value) decryptedPatient[key] = decrypt(value);
  }
  return NextResponse.json({ ...created.toObject(), patient: decryptedPatient }, { status: 201 });
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  await dbConnect();
  const updated = await Order.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  return NextResponse.json(updated);
}
