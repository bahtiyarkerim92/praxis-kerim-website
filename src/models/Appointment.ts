import { Schema, models, model } from 'mongoose';

const AppointmentSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', default: null },
  when: { type: Date, required: true },
  status: { type: String, enum: ['frei', 'gebucht', 'abgesagt'], default: 'frei' },
  patient: {
    name: String,
    email: String,
    geburtsdatum: String,
    telefon: String,
  },
}, { timestamps: true });

export type AppointmentDoc = {
  _id: string;
  doctorId: string | null;
  when: Date;
  status: 'frei' | 'gebucht' | 'abgesagt';
  patient?: {
    name?: string; email?: string; geburtsdatum?: string; telefon?: string;
  };
};

export default models.Appointment || model('Appointment', AppointmentSchema);
