
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const ADMIN_FILE = path.resolve(process.cwd(), 'admin.json');

export interface AdminData {
  email: string;
  password: string;
}

export async function getAdminData(): Promise<AdminData> {
  try {
    const data = await fs.readFile(ADMIN_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Default admin (gehashtes Passwort)
    const hash = await bcrypt.hash('admin123!', 10);
    return { email: 'admin@praxiskerim.de', password: hash };
  }
}

export async function setAdminData(data: AdminData) {
  // Wenn das Passwort kein Hash ist, hashe es
  let password = data.password;
  if (!password.startsWith('$2b$')) {
    password = await bcrypt.hash(password, 10);
  }
  await fs.writeFile(ADMIN_FILE, JSON.stringify({ ...data, password }, null, 2), 'utf-8');
}
