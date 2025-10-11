// API Client for connecting to telemedker-server

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  doctors?: T;
  appointments?: T;
  appointment?: T;
  availability?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Doctor endpoints
  async getDoctors() {
    const response = await this.request<ApiResponse>('/api/doctors');
    return response.doctors || response.data || [];
  }

  async getDoctorById(id: string) {
    const response = await this.request<ApiResponse>(`/api/doctors/${id}`);
    return response.data;
  }

  // Availability endpoints
  async getAvailability(doctorId?: string, date?: string) {
    let endpoint = '/api/availability';
    const params = new URLSearchParams();
    
    if (doctorId) params.append('doctorId', doctorId);
    if (date) params.append('date', date);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    const response = await this.request<ApiResponse>(endpoint);
    return response.data || response.availability || [];
  }

  // Appointment endpoints (public - no auth required for booking)
  async bookAppointment(appointmentData: {
    doctorId: string;
    date: string;
    slot: string;
    patientInfo: {
      name: string;
      email?: string;
      phone: string;
      dateOfBirth: string;
      address: string;
      insuranceNumber: string;
      insuranceType: 'private' | 'public';
    };
  }) {
    const response = await this.request<ApiResponse>('/api/appointments/book', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
    return response;
  }

  async getAppointments(filters?: {
    doctorId?: string;
    date?: string;
    status?: string;
  }) {
    let endpoint = '/api/appointments';
    const params = new URLSearchParams();
    
    if (filters?.doctorId) params.append('doctorId', filters.doctorId);
    if (filters?.date) params.append('date', filters.date);
    if (filters?.status) params.append('status', filters.status);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    const response = await this.request<ApiResponse>(endpoint);
    return response.appointments || response.data || [];
  }
}

export const apiClient = new ApiClient();
export default apiClient;

