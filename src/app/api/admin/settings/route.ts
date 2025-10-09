
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSession } from '../../../../lib/session';
import { getAdminData, setAdminData } from '../../../../lib/adminStore';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<AdminSession>(req, res, sessionOptions);
  if (!session.admin) return NextResponse.json({ ok: false }, { status: 401 });
  const admin = await getAdminData();
  return NextResponse.json({ ok: true, email: admin.email });
}

export async function PUT(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<AdminSession>(req, res, sessionOptions);
  if (!session.admin) return NextResponse.json({ ok: false }, { status: 401 });
  const { email, password, oldPassword } = await req.json();
  if (!email || !password || !oldPassword) return NextResponse.json({ ok: false, error: 'Alle Felder erforderlich' }, { status: 400 });
  const admin = await getAdminData();
  const passwordMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!passwordMatch) {
    return NextResponse.json({ ok: false, error: 'Altes Passwort ist falsch' }, { status: 403 });
  }
  await setAdminData({ email, password });
  return NextResponse.json({ ok: true });
}
