import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import Doctor from '../../../models/Doctor';

export async function GET() {
  await dbConnect();
  const doctors = await Doctor.find().sort({ name: 1 });
  return NextResponse.json(doctors);
}

export async function POST(req: Request) {
  const { name, fachrichtung } = await req.json();
  await dbConnect();
  const d = await Doctor.create({ name, fachrichtung });
  return NextResponse.json(d, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await dbConnect();
  await Doctor.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
