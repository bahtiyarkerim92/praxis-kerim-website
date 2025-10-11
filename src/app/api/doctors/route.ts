import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doctors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch doctors');
    }

    // Return the doctors array from the response
    return NextResponse.json(data.doctors || data.data || []);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const response = await fetch(`${API_BASE_URL}/api/doctors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create doctor');
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json(
      { error: 'Failed to create doctor' },
      { status: 500 }
    );
  }
}
