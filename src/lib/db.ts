import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error('MONGODB_URI missing');

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
let cached: MongooseCache = (global as unknown as { mongoose: MongooseCache }).mongoose;
if (!cached) {
  cached = (global as unknown as { mongoose: MongooseCache }).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
