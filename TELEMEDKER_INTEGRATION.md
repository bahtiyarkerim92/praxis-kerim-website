# Telemedker Server Integration Guide

## Overview

The praxis-kerim-website is now connected to the telemedker-server backend for all doctor and appointment data.

## Architecture

```
praxis-kerim-website (Frontend)
         ↓
    Next.js API Routes (Proxy)
         ↓
telemedker-server (Backend)
         ↓
    MongoDB Database
```

## Setup Instructions

### 1. Start the Telemedker Server

```bash
cd ../telemedker-server
npm install
```

Create `.env` file in telemedker-server:

```env
PORT=3030
DB_CONNECTION_STRING=mongodb://localhost:27017/telemedker
ACCESS_TOKEN_SECRET=your-secret-key-here
REFRESH_TOKEN_SECRET=your-refresh-secret-key-here
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

Server should be running on `http://localhost:3030`

### 2. Configure Praxis Kerim Website

Create `.env.local` in praxis-kerim-website:

```env
NEXT_PUBLIC_API_URL=http://localhost:3030
```

### 3. Start the Website

```bash
cd praxis-kerim-website
npm run dev
```

Website runs on `http://localhost:3000`

## API Endpoints Used

### From Telemedker Server:

1. **GET /api/doctors**

   - Returns list of all doctors
   - Response: `{ success: true, doctors: [...] }`

2. **GET /api/availability**

   - Query params: `doctorId`, `date`, `startDate`, `endDate`
   - Returns available time slots
   - Response: `{ success: true, data: [...] }`

3. **POST /api/appointments**
   - Creates a new appointment
   - Body:
     ```json
     {
       "doctorId": "string",
       "date": "YYYY-MM-DD",
       "slot": "HH:MM",
       "title": "string",
       "description": "string",
       "notes": "string (JSON with patient info)"
     }
     ```

### Proxied Through Praxis Website:

1. **GET /api/doctors** → Proxies to telemedker-server
2. **GET /api/appointments** → Fetches availability and transforms to slot format
3. **POST /api/appointments/book** → Transforms and sends to telemedker-server

## Data Flow: Booking an Appointment

1. **Patient selects doctor** (or "no preference")

   - Frontend calls: `GET /api/doctors`
   - Proxied to: `GET http://localhost:3030/api/doctors`

2. **System fetches available slots**

   - Frontend calls: `GET /api/appointments?status=frei&doctorId=XXX`
   - Proxied to: `GET http://localhost:3030/api/availability?doctorId=XXX`
   - Response transformed from availability slots to individual time slots

3. **Patient fills form and submits**
   - Frontend calls: `POST /api/appointments/book`
   - Data transformed to match telemedker format
   - Proxied to: `POST http://localhost:3030/api/appointments`

## Data Transformation

### Availability → Slots

Telemedker Server format:

```json
{
  "_id": "avail123",
  "doctorId": "doc123",
  "date": "2025-10-15",
  "slots": ["09:00", "10:00", "11:00"]
}
```

Transformed to:

```json
[
  {
    "_id": "avail123_09:00",
    "availabilityId": "avail123",
    "doctorId": "doc123",
    "doctorName": "Dr. Name",
    "when": "2025-10-15T09:00:00.000Z",
    "slot": "09:00",
    "status": "frei"
  },
  ...
]
```

### Patient Data → Appointment

Frontend format:

```json
{
  "slot": { ... },
  "patient": {
    "name": "string",
    "geburtsdatum": "YYYY-MM-DD",
    "telefon": "string",
    "adresse": "string",
    "versicherungsnummer": "string",
    "versicherungsart": "privat|gesetzlich",
    "versicherungsbestaetigung": true
  }
}
```

Transformed to telemedker format:

```json
{
  "doctorId": "doc123",
  "date": "2025-10-15",
  "slot": "09:00",
  "title": "Appointment for Patient Name",
  "description": "Patient: Patient Name",
  "notes": "{\"patientInfo\":{...}}"
}
```

## Creating Test Data

### Add Doctors

```bash
# Via API
POST http://localhost:3030/api/doctors
{
  "name": "Dr. Max Mustermann",
  "specialty": "Allgemeinmedizin"
}
```

### Add Availability Slots

```bash
# Via API
POST http://localhost:3030/api/availability
{
  "doctorId": "doctor-id-here",
  "date": "2025-10-15",
  "slots": ["09:00", "10:00", "11:00", "14:00", "15:00"]
}
```

## Authentication Note

⚠️ **Important**: The telemedker-server requires authentication for creating appointments. Currently, the booking endpoint will fail without proper authentication.

### To Fix:

1. Implement patient authentication in telemedker-server
2. Or create a public booking endpoint that doesn't require auth
3. Or use a service token for public bookings

### Temporary Solution:

Modify telemedker-server's `controllers/appointments.js`:

Remove `authenticateToken` middleware from the POST /api/appointments route to allow public bookings.

## Troubleshooting

### "Failed to fetch doctors"

- Check if telemedker-server is running on port 3030
- Verify MongoDB is running
- Check CORS settings in telemedker-server

### "Failed to fetch availability"

- Ensure availability data exists in MongoDB
- Check date format in queries
- Verify doctor IDs are correct

### "Booking failed"

- Check authentication requirement
- Verify appointment data format
- Check for duplicate bookings
- Review telemedker-server logs

## CORS Configuration

The telemedker-server must allow requests from the praxis website.

In `telemedker-server/middleware/cors.js`, ensure:

```javascript
const allowedOrigins = [
  "http://localhost:3000", // praxis-kerim-website
  "http://localhost:3030", // telemedker-server
  "http://localhost:5173", // telemedker-dashboard
];
```

## Next Steps

1. **Add Authentication**: Implement patient login/register in praxis website
2. **Store Patient Records**: Link appointments to patient accounts
3. **Email Notifications**: Send confirmation emails after booking
4. **SMS Reminders**: Send SMS reminders before appointments
5. **Calendar Sync**: Sync with Google Calendar or other calendar services
6. **Admin Integration**: Connect admin dashboard to view praxis bookings

## File Structure

### Praxis Website (Frontend)

```
src/
├── app/
│   ├── api/
│   │   ├── doctors/route.ts        # Proxies to telemedker
│   │   └── appointments/
│   │       ├── route.ts             # Fetches availability
│   │       └── book/route.ts        # Books appointments
│   └── terminbuchung/
│       ├── page.tsx                 # Booking page
│       └── NewBookingForm.tsx       # Booking form
└── lib/
    └── api-client.ts                # API client utilities
```

### Telemedker Server (Backend)

```
controllers/
├── doctors.js          # Doctor CRUD
├── availability.js     # Availability CRUD
└── appointments.js     # Appointment CRUD

models/
├── Doctor.js           # Doctor model
├── Availability.js     # Availability model
└── Appointment.js      # Appointment model
```

## Summary

✅ Removed all Mongoose/MongoDB dependencies from praxis-kerim-website
✅ All data now stored in telemedker-server's MongoDB
✅ Next.js API routes act as proxy to telemedker-server
✅ Data transformation happens at proxy level
✅ Clean separation between frontend and backend

The website now fully relies on the telemedker-server backend for all data operations!
