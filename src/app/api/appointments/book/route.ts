import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slot, patient } = body;

    // Extract availability ID and slot time from the composite ID
    const [availabilityId, slotTime] = slot._id.split('_');
    const date = new Date(slot.when).toISOString().split('T')[0];

    // Transform the data to match telemedker-server format
    const appointmentData = {
      doctorId: slot.doctorId,
      date: date,
      slot: slotTime,
      title: `Appointment for ${patient.name}`,
      description: `Patient: ${patient.name}`,
      notes: JSON.stringify({
        patientInfo: {
          name: patient.name,
          email: patient.email || '',
          phone: patient.telefon,
          dateOfBirth: patient.geburtsdatum,
          address: patient.adresse,
          insuranceNumber: patient.versicherungsnummer,
          insuranceType: patient.versicherungsart === 'privat' ? 'private' : 'public',
          insuranceConfirmation: patient.versicherungsbestaetigung,
        }
      }),
    };

    // For now, we'll call without authentication (you'll need to add auth later)
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add authentication token here when implementing patient auth
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Booking failed');
    }

    return NextResponse.json({ 
      ok: true, 
      appointmentId: data.appointment?._id || data.data?._id 
    });
  } catch (error: any) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
