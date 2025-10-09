import { SessionOptions } from "iron-session";

export interface AdminSession {
  admin?: {
    email: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long!",
  cookieName: "admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    // Kein maxAge: Session-Cookie, wird beim Schließen des Browsers gelöscht
  },
  // maxAge NICHT setzen, damit es ein Session-Cookie bleibt
};
