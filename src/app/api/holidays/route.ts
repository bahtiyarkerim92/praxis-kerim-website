import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    
    // Build query string
    const params = new URLSearchParams();
    if (year) params.append('year', year);
    if (month) params.append('month', month);
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/api/holidays${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch holidays');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}

