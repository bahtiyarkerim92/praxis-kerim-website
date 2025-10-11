# Appointment Booking System - Quick Start Guide

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd praxis-kerim-website
npm install
```

### 2. Environment Setup

Ensure your `.env.local` file includes:

```env
MONGODB_URI=your_mongodb_connection_string
ENCRYPTION_KEY=your_32_character_encryption_key
```

### 3. Run the Development Server

```bash
npm run dev
```

## 📋 Creating Appointment Slots

### Via Admin Dashboard

1. Go to `http://localhost:3000/admin`
2. Login with admin credentials
3. Navigate to "Kalender" section
4. Click "Create Slots" or use the slot creation form
5. Select doctor and time slots

### Via API (for bulk creation)

```bash
POST /api/appointments
Content-Type: application/json

{
  "when": "2025-10-15T14:00:00Z",
  "doctorId": "doctor-id-here"  # or null for "Praxis Dr. Kerim"
}
```

## 👥 Adding Doctors

### Via API

```bash
POST /api/doctors
Content-Type: application/json

{
  "name": "Dr. Max Mustermann",
  "fachrichtung": "Allgemeinmedizin"
}
```

### Via MongoDB directly

```javascript
db.doctors.insertOne({
  name: "Dr. Max Mustermann",
  fachrichtung: "Allgemeinmedizin",
  workdays: ["Mo", "Di", "Mi", "Do", "Fr"],
  createdAt: new Date(),
});
```

## 🔑 Creating the "No Preference" Doctor

This is **NOT** required! The system automatically aggregates all doctors when "no preference" is selected.

However, if you want a dedicated "Praxis Dr. Kerim" doctor entry:

```javascript
db.doctors.insertOne({
  name: "Praxis Dr. Kerim",
  fachrichtung: "Allgemeine Praxis",
  createdAt: new Date(),
});
```

Then create slots with this doctor's ID. These slots will appear for ANY doctor selection.

## 📊 How It Works

### Patient Books Appointment:

**Scenario 1: Specific Doctor Selected**

```
1. Patient selects "Dr. Max Mustermann"
2. System shows only Dr. Mustermann's available slots
3. Patient books → Appointment assigned to Dr. Mustermann
4. Admin sees: "Dr. Max Mustermann" in dashboard
```

**Scenario 2: "No Preference" Selected**

```
1. Patient selects "Ich möchte keinen bestimmten Arzt wählen"
2. System shows ALL available slots from ALL doctors
3. Patient picks a slot (e.g., from Dr. Mustermann's schedule)
4. Patient books → Appointment assigned to Dr. Mustermann
5. Admin sees: "Dr. Max Mustermann" in dashboard
6. Patient confirmation: "Praxis Dr. Kerim" (doctor remains anonymous to patient)
```

## 🎯 Key Features

### For Patients:

- ✅ Choose specific doctor or "no preference"
- ✅ Visual calendar interface
- ✅ Real-time availability
- ✅ Comprehensive personal information form
- ✅ Insurance validation
- ✅ Immediate booking confirmation

### For Admins:

- ✅ View all appointments in detailed table
- ✅ See patient contact information
- ✅ See insurance details
- ✅ Filter by doctor or date
- ✅ Change appointment status
- ✅ Export to PDF
- ✅ Delete appointments

## 🔐 Data Security

All patient data is **encrypted** before storage:

- Name
- Email
- Phone
- Address
- Insurance number
- Birthdate

Admin dashboard automatically decrypts data for viewing.

## 📱 Accessing the System

### Patient Booking Page

```
http://localhost:3000/terminbuchung
```

### Admin Dashboard

```
http://localhost:3000/admin/kalender
```

## 🧪 Testing the System

### Test Booking Flow:

1. **Create test doctors:**

   ```bash
   POST /api/doctors
   { "name": "Dr. Test 1", "fachrichtung": "Allgemeinmedizin" }

   POST /api/doctors
   { "name": "Dr. Test 2", "fachrichtung": "Innere Medizin" }
   ```

2. **Create test slots:**

   ```bash
   POST /api/appointments
   {
     "when": "2025-10-15T09:00:00Z",
     "doctorId": "doctor1-id"
   }

   POST /api/appointments
   {
     "when": "2025-10-15T10:00:00Z",
     "doctorId": "doctor2-id"
   }
   ```

3. **Test booking:**
   - Go to `/terminbuchung`
   - Select "No preference"
   - You should see both slots
   - Fill out the form
   - Submit booking
   - Check admin dashboard

## 🐛 Troubleshooting

### "No available appointments"

**Check:**

- Are there appointments with `status: 'frei'` in the database?
- Are the appointment dates in the future?
- Is the API route working? (Check Network tab)

### "Failed to fetch doctors"

**Check:**

- MongoDB connection
- `/api/doctors` endpoint
- Console for errors

### Form validation errors

**Check:**

- All required fields are filled
- Birthdate is in correct format
- Insurance confirmation is checked
- Phone number format

### Encryption errors

**Check:**

- `ENCRYPTION_KEY` is set in environment variables
- Key is exactly 32 characters
- `/src/lib/crypto.ts` file exists

## 📖 API Reference

### GET `/api/appointments`

Query params:

- `status` - Filter by status ('frei', 'gebucht', 'abgesagt')
- `doctorId` - Filter by doctor (optional)

### POST `/api/appointments/book`

Body:

```json
{
  "appointmentId": "string",
  "patient": {
    "name": "string",
    "geburtsdatum": "YYYY-MM-DD",
    "telefon": "string",
    "adresse": "string",
    "versicherungsnummer": "string",
    "versicherungsart": "privat" | "gesetzlich",
    "versicherungsbestaetigung": true,
    "email": "string" (optional)
  }
}
```

### GET `/api/doctors`

Returns all doctors

### POST `/api/appointments`

Create new appointment slot

```json
{
  "when": "ISO-8601 datetime",
  "doctorId": "string or null"
}
```

## 💡 Pro Tips

1. **Bulk Slot Creation**: Create a script to generate multiple slots at once
2. **Recurring Slots**: Set up a cron job to automatically create slots for the week
3. **Email Notifications**: Extend the booking API to send confirmation emails
4. **SMS Reminders**: Integrate SMS service for appointment reminders
5. **Calendar Sync**: Export appointments to Google Calendar or iCal

## 📞 Support

For issues or questions:

1. Check the main documentation: `APPOINTMENT_BOOKING_IMPLEMENTATION.md`
2. Review console logs for errors
3. Check MongoDB connection
4. Verify environment variables

## 🎉 Success Indicators

System is working correctly when:

- ✅ Doctors appear in dropdown
- ✅ Slots appear in calendar
- ✅ Booking submission succeeds
- ✅ Appointments appear in admin dashboard
- ✅ Patient data is encrypted in database
- ✅ Admin can see decrypted data
