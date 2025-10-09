import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSession } from '../../../lib/session';
import { getAdminData } from '../../../lib/adminStore';
import bcrypt from 'bcryptjs';

// Admin Login
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const admin = await getAdminData();
  const valid = email === admin.email && await bcrypt.compare(password, admin.password);
  if (valid) {
    const res = NextResponse.json({ ok: true });
    const session = await getIronSession<AdminSession>(req, res, sessionOptions);
    session.admin = { email };
    await session.save();
    return res;
  }
  return NextResponse.json({ ok: false, error: 'Ungültige Zugangsdaten' }, { status: 401 });
}

// Admin Logout
export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  const session = await getIronSession<AdminSession>(req, res, sessionOptions);
  session.destroy();
  await session.save();
  return res;
}

// Session Check
export async function GET(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<AdminSession>(req, res, sessionOptions);
  if (session.admin) {
    return NextResponse.json({ ok: true, admin: session.admin });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
