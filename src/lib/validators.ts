import { z } from 'zod';

export const createSlotSchema = z.object({
  when: z.string().datetime().or(z.string()),
  doctorId: z.string().nullable(),
});

export const bookSchema = z.object({
  appointmentId: z.string(),
  patient: z.object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    geburtsdatum: z.string().optional(),
    telefon: z.string().optional(),
  }),
});

export const orderSchema = z.object({
  type: z.enum(['rezept', 'überweisung', 'attest']),
  patient: z.object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    geburtsdatum: z.string().optional(),
  }),
  details: z.record(z.string(), z.unknown()).default({}),
});
