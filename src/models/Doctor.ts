import { Schema, models, model } from 'mongoose';


const DoctorSchema = new Schema({
  name: { type: String, required: true },
  fachrichtung: { type: String },
  workdays: { type: [String], default: [] }, // z.B. ['Mo', 'Di', 'Mi']
}, { timestamps: true });


export type DoctorDoc = {
  _id: string;
  name: string;
  fachrichtung?: string;
  workdays?: string[]; // z.B. ['Mo', 'Di', 'Mi']
};

export default models.Doctor || model('Doctor', DoctorSchema);
