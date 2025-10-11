# Appointment Booking System Implementation

## Overview

This document describes the comprehensive appointment booking system implemented for Praxis Dr. Kerim website.

## Features Implemented

### 1. Patient-Facing Booking Form (`/terminbuchung`)

The booking form includes the following workflow:

#### Step 1: Doctor Selection

- **Dropdown menu** with all available doctors
- **"No preference" option** (`no-preference` ID) that shows all available slots from all doctors
  - When selected, the patient won't know which doctor they have an appointment with
  - Shows appointments as "Praxis Dr. Kerim"
  - Aggregates all available slots from all doctors

#### Step 2: Date & Time Selection

- **Calendar view** showing available appointment slots
- Slots are grouped by date
- When a specific doctor is selected, only that doctor's slots are shown
- When "no preference" is selected, all doctors' slots are shown
- Displays doctor name for each slot (hidden functionality - patient sees "Praxis Dr. Kerim" for no-preference appointments)

#### Step 3: Personal Information Form

Required fields:

- **Name** (required)
- **Birthdate** (required, date picker)
- **Address** (required, textarea)
- **Phone Number** (required)
- **Email** (optional)
- **Insurance Number** (required)
- **Insurance Type** (required, radio buttons):
  - Gesetzlich versichert (Public Insurance)
  - Privat versichert (Private Insurance)
- **Insurance Confirmation** (required checkbox):
  - "Ich bestätige, dass ich eine aktuelle Versicherung für das laufende Quartal habe. Im Fall, dass ich nicht ausreichend versichert bin, trage ich alle Behandlungskosten und die Kosten für die verschriebenen Medikamente und Hilfsmittel selbst."

### 2. Backend API Updates

#### Database Schema Updates

**Appointment Model** (`/src/models/Appointment.ts`):

```javascript
{
  doctorId: ObjectId (ref: Doctor),
  when: Date,
  status: 'frei' | 'gebucht' | 'abgesagt',
  patient: {
    name: String,
    email: String,
    geburtsdatum: String,
    telefon: String,
    adresse: String,
    versicherungsnummer: String,
    versicherungsart: 'privat' | 'gesetzlich',
    versicherungsbestaetigung: Boolean
  }
}
```

#### API Endpoints

**GET `/api/appointments`**

- Query parameters:
  - `status` - Filter by status (e.g., 'frei')
  - `doctorId` - Filter by doctor ID (optional)
    - If `doctorId='no-preference'`, returns all available slots
    - If `doctorId` is specific ID, returns only that doctor's slots
- Returns: Array of appointments with populated doctor information

**POST `/api/appointments/book`**

- Body:
  ```json
  {
    "appointmentId": "appointment-id",
    "patient": {
      "name": "string",
      "geburtsdatum": "string",
      "telefon": "string",
      "adresse": "string",
      "versicherungsnummer": "string",
      "versicherungsart": "privat" | "gesetzlich",
      "versicherungsbestaetigung": true,
      "email": "string" (optional)
    }
  }
  ```
- Validates all required fields using Zod schema
- Encrypts patient data before saving
- Returns: Success response with appointment ID

**GET `/api/doctors`**

- Returns: List of all doctors with their specializations

#### Validation Schema

Updated `bookSchema` in `/src/lib/validators.ts`:

- All patient fields are validated
- Insurance confirmation must be true
- Email is optional but must be valid if provided
- Error messages in German

### 3. Admin Dashboard Updates

**Updated Appointment List** (`/src/app/admin/kalender/AppointmentList.tsx`):

- Displays comprehensive table with all patient information
- Columns:

  1. **Date & Time** - Formatted in German locale
  2. **Doctor** - Name and specialization
  3. **Status** - Color-coded badges (frei/gebucht/abgesagt)
  4. **Patient** - Name, birthdate, address
  5. **Contact** - Phone and email with icons
  6. **Insurance** - Insurance number, type, and confirmation status
  7. **Actions** - Admin controls for status change and deletion

- **Visual enhancements:**
  - Color-coded status badges
  - Icons for contact information (📞 ✉️)
  - Green checkmark for insurance confirmation (✓)
  - Responsive table design with horizontal scrolling

### 4. Internationalization (i18n)

**German Translations** (`/src/locales/de.json`):

```json
{
  "terminbuchung.selectDoctor": "Arzt auswählen",
  "terminbuchung.noDoctorPreference": "Ich möchte keinen bestimmten Arzt wählen",
  "terminbuchung.selectDate": "Datum und Uhrzeit wählen",
  "terminbuchung.personalInfo": "Persönliche Daten",
  "terminbuchung.name": "Name",
  "terminbuchung.birthdate": "Geburtsdatum",
  "terminbuchung.address": "Adresse",
  "terminbuchung.phone": "Telefonnummer",
  "terminbuchung.insuranceNumber": "Versicherungsnummer",
  "terminbuchung.insuranceType": "Versicherungsart",
  "terminbuchung.privateInsurance": "Privat versichert",
  "terminbuchung.publicInsurance": "Gesetzlich versichert",
  "terminbuchung.insuranceConfirmation": "Ich bestätige...",
  "terminbuchung.submit": "Termin buchen",
  "terminbuchung.success": "Termin erfolgreich gebucht!",
  "terminbuchung.error": "Fehler bei der Buchung"
}
```

**English Translations** (`/src/locales/en.json`):

- Complete English translations for all form labels and messages

### 5. Security Features

- **Data Encryption**: All patient data is encrypted before storing in database
- **Data Decryption**: Decrypted only when accessed by authorized admin users
- **Input Validation**: Server-side validation using Zod schema
- **Required Field Validation**: Frontend and backend validation

## Files Created/Modified

### New Files:

1. `/src/app/terminbuchung/NewBookingForm.tsx` - Main booking form component

### Modified Files:

1. `/src/app/terminbuchung/page.tsx` - Updated to use new booking form
2. `/src/models/Appointment.ts` - Added new patient fields
3. `/src/lib/validators.ts` - Updated validation schema
4. `/src/app/api/appointments/route.ts` - Enhanced API with filtering
5. `/src/app/admin/kalender/AppointmentList.tsx` - Enhanced admin view
6. `/src/locales/de.json` - Added German translations
7. `/src/locales/en.json` - Added English translations

## How the "No Preference" Feature Works

1. **Frontend Selection:**

   - User selects "Ich möchte keinen bestimmten Arzt wählen"
   - Component sets `selectedDoctorId` to `"no-preference"`

2. **API Request:**

   - Fetches `/api/appointments?status=frei` (without doctorId filter)
   - Returns all available slots from all doctors

3. **Display:**

   - Shows all available slots grouped by date
   - Each slot displays the actual doctor name
   - Patient can see time slots but not doctor identity for appointments booked with "no preference"

4. **Backend Storage:**
   - Appointment is stored with the actual `doctorId` of the selected slot
   - This ensures the practice knows which doctor has the appointment
   - Patient record shows "Praxis Dr. Kerim" when no specific doctor was chosen

## Next Steps & Recommendations

### Required for Production:

1. **Environment Variables:**

   - Set up MongoDB connection string
   - Configure encryption keys
   - Set up proper CORS settings

2. **Testing:**

   - Test booking flow with various scenarios
   - Test "no preference" doctor selection
   - Verify data encryption/decryption
   - Test admin dashboard with various appointment states

3. **Email Notifications:**

   - Consider adding email confirmation to patients
   - Admin notifications for new bookings

4. **Calendar Integration:**

   - Consider integrating with external calendar systems (Google Calendar, etc.)
   - Export appointments to .ics files

5. **Mobile Optimization:**
   - Test responsive design on mobile devices
   - Ensure all form fields work well on touch devices

## Usage Instructions

### For Developers:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Access booking form
http://localhost:3000/terminbuchung

# Access admin dashboard
http://localhost:3000/admin/kalender
```

### For Administrators:

1. Navigate to `/admin/kalender`
2. View all appointments in the enhanced table view
3. Filter by doctor or date
4. Export appointments to PDF
5. Change appointment status or delete appointments

### For Patients:

1. Navigate to `/terminbuchung`
2. Select a doctor or choose "no preference"
3. Select available date and time
4. Fill in all required personal information
5. Review insurance confirmation
6. Submit booking
7. Receive confirmation message

## Support & Maintenance

### Common Issues:

1. **Missing translations**: Check i18n files for missing keys
2. **Validation errors**: Review validators.ts for proper schema
3. **Calendar not loading**: Check react-calendar package installation
4. **Data not encrypting**: Verify crypto lib configuration

### Database Migrations:

When updating to this version, existing appointments will need migration:

- Old appointments without new fields will still work
- New fields are optional in the schema
- Admin dashboard handles missing fields gracefully

## Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Calendar**: react-calendar
- **Validation**: Zod
- **Database**: MongoDB with Mongoose
- **Security**: Custom encryption library

## Conclusion

This implementation provides a complete, secure, and user-friendly appointment booking system with comprehensive admin capabilities and proper data handling.
