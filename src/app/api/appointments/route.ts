import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'frei' for available slots
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');
    
    console.log('📅 Fetching availability:', { doctorId, date, status });
    
    // Build query string for availability endpoint
    const params = new URLSearchParams();
    if (doctorId && doctorId !== 'no-preference') {
      params.append('doctorId', doctorId);
    }
    if (date) {
      params.append('date', date);
    }
    
    // Fetch from availability endpoint (telemedker-server)
    const queryString = params.toString();
    const url = `${API_BASE_URL}/api/availability${queryString ? `?${queryString}` : ''}`;
    
    console.log('🔗 Calling telemedker API:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('📦 Received data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch availability');
    }

    const availability = data.data || data.availability || [];
    
    console.log('✅ Availability records:', availability.length);
    
    // Fetch existing appointments to exclude taken slots
    const appointmentsUrl = `${API_BASE_URL}/api/appointments${date ? `?date=${date}` : ''}`;
    console.log('🔗 Fetching appointments:', appointmentsUrl);
    
    const appointmentsResponse = await fetch(appointmentsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const appointmentsData = await appointmentsResponse.json();
    const appointments = appointmentsData.appointments || [];
    
    console.log('📋 Existing appointments:', appointments.length);
    
    // Create a set of taken slots (doctorId + date + time)
    const takenSlots = new Set<string>();
    appointments.forEach((apt: any) => {
      const doctorIdStr = apt.doctorId?._id || apt.doctorId;
      const aptDate = new Date(apt.date);
      const year = aptDate.getUTCFullYear();
      const month = String(aptDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(aptDate.getUTCDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const slotKey = `${doctorIdStr}_${dateStr}_${apt.slot}`;
      takenSlots.add(slotKey);
      console.log('🔒 Taken slot:', slotKey);
    });
    
    // Transform availability data to slot format expected by frontend
    const slots: any[] = [];
    
    availability.forEach((avail: any) => {
      // Parse the date from the availability (it's stored as UTC midnight)
      const availDate = new Date(avail.date);
      const year = availDate.getUTCFullYear();
      const month = String(availDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(availDate.getUTCDate()).padStart(2, '0');
      const availDateStr = `${year}-${month}-${day}`;
      
      console.log('Processing availability:', {
        id: avail._id,
        originalDate: avail.date,
        parsedDate: availDateStr,
        requestedDate: date,
        match: availDateStr === date,
        slots: avail.slots,
        doctorId: avail.doctorId
      });
      
      if (avail.slots && Array.isArray(avail.slots)) {
        avail.slots.forEach((slot: string) => {
          // Check if this slot is already taken
          const doctorIdStr = avail.doctorId?._id || avail.doctorId;
          const slotKey = `${doctorIdStr}_${availDateStr}_${slot}`;
          
          if (takenSlots.has(slotKey)) {
            console.log('⏭️ Skipping taken slot:', slotKey);
            return; // Skip this slot
          }
          
          // Create datetime for display - use the UTC date to avoid timezone shifts
          // We'll store it as the exact date+time the user sees
          const [hours, minutes] = slot.split(':');
          const slotDate = new Date(availDate);
          slotDate.setUTCHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          console.log('Slot created:', {
            availDateStr,
            slot: slot,
            slotDateTime: slotDate.toISOString(),
            displayDate: slotDate.toLocaleDateString('de-DE'),
            displayTime: slotDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
          });
          
          slots.push({
            _id: `${avail._id}_${slot}`,
            availabilityId: avail._id,
            doctorId: doctorIdStr,
            doctorName: avail.doctorId?.name || 'Praxis Dr. Kerim',
            when: slotDate.toISOString(),
            date: availDateStr,
            slot: slot,
            status: 'frei',
          });
        });
      }
    });

    console.log('🎯 Total slots created:', slots.length);

    // Filter out past slots
    const now = new Date();
    const futureSlots = slots.filter(slot => new Date(slot.when) >= now);
    
    console.log('⏰ Future slots:', futureSlots.length);

    return NextResponse.json(futureSlots);
  } catch (error) {
    console.error('❌ Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await fetch(`${API_BASE_URL}/api/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create slot');
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating slot:', error);
    return NextResponse.json(
      { error: 'Failed to create slot' },
      { status: 500 }
    );
  }
}
