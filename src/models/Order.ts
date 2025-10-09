import { Schema, models, model } from 'mongoose';

const OrderSchema = new Schema({
  type: { type: String, enum: ['rezept', 'überweisung', 'attest'], required: true },
  status: { type: String, enum: ['offen', 'bearbeitet'], default: 'offen' },
  patient: {
    name: String,
    email: String,
    geburtsdatum: String,
  },
  details: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export type OrderDoc = {
  _id: string;
  type: 'rezept' | 'überweisung' | 'attest';
  status: 'offen' | 'bearbeitet';
  patient: { name?: string; email?: string; geburtsdatum?: string };
  details: Record<string, unknown>;
};

export default models.Order || model('Order', OrderSchema);
