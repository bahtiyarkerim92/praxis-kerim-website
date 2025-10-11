import { NextApiRequest, NextApiResponse } from 'next';
import { getAppointments, getDoctorById } from '@/lib/data-store';

// GET: /api/admin/appointments?doctorId=...&date=YYYY-MM-DD
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  
  try {
    const { doctorId, date } = req.query;
    
    const filter: any = {};
    if (doctorId) filter.doctorId = doctorId as string;
    if (date) filter.date = date as string;
    
    const appointments = getAppointments(filter);
    
    // Populate doctor information
    const populatedAppointments = appointments.map(appt => {
      let doctorInfo = null;
      if (appt.doctorId) {
        const doctor = getDoctorById(appt.doctorId);
        if (doctor) {
          doctorInfo = {
            _id: doctor._id,
            name: doctor.name,
            fachrichtung: doctor.fachrichtung,
          };
        }
      }
      
      return {
        ...appt,
        doctorId: doctorInfo,
      };
    });
    
    res.json(populatedAppointments);
  } catch (error) {
    console.error('Error fetching admin appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
}
