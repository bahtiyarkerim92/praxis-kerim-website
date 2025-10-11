# Orders System Implementation

## Overview

Complete order management system for prescriptions (Rezepte), referrals (Überweisungen), and sick notes (Krankenschein).

## Features

### Patient-Facing Order Form (`/bestellung`)

**Personal Information (All Required):**

- Vorname (First Name)
- Nachname (Last Name)
- Telefonnummer (Phone Number)
- E-Mail
- Straße (Street)
- Hausnummer (House Number)
- PLZ (Postal Code - 5 digits)
- Stadt (City)

**Insurance Information (All Required):**

- Radio Buttons: Gesetzlich versichert / Privat versichert
- Versicherungsnummer (Insurance Number)
- Checkbox: Confirmation that patient has valid insurance

**Order Types (Select at least one):**

- ☐ Rezept (Prescription)
- ☐ Überweisung (Referral)
- ☐ Krankenschein (Sick Note)

**Dynamic Erläuterung Fields:**

- When a checkbox is selected, a textarea appears below it
- Each order type has its own "Erläuterung" (explanation) field
- Required when checkbox is selected
- Placeholder: "Bitte geben Sie Details zu Ihrer Bestellung an..."

### Dashboard Management (`/orders`)

**Order List View:**

- Table showing all orders
- Columns:
  - Patient Name
  - Contact (Phone + Email)
  - Address (Street, Number, PLZ, City)
  - Insurance (Type + Number)
  - Order Types (as badges)
  - Status (color-coded badges)
  - Date/Time
  - Actions

**Status Filters:**

- Pending (new orders)
- Processing (being worked on)
- Completed (finished)
- All

**Order Actions:**

- View Details (modal with full information)
- Set as Processing
- Set as Completed
- Cancel Order
- Delete Order

### Backend API

**Model:** `/telemedker-server/models/Order.js`

```javascript
{
  patient: {
    vorname, nachname, telefon, email,
    strasse, hausnummer, plz, stadt,
    versicherungsart, versicherungsnummer
  },
  orders: [{
    type: 'rezept' | 'ueberweisung' | 'krankenschein',
    erlaeuterung: String
  }],
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}
```

**Endpoints:**

- `POST /api/orders` - Create order (PUBLIC - no auth)
- `GET /api/orders` - List orders (ADMIN only)
- `GET /api/orders/:id` - Get specific order (ADMIN only)
- `PATCH /api/orders/:id` - Update status (ADMIN only)
- `DELETE /api/orders/:id` - Delete order (ADMIN only)

## Usage

### For Patients:

1. Navigate to `/bestellung`
2. Fill in all personal information
3. Select insurance type and number
4. Check insurance confirmation
5. Select at least one order type (Rezept, Überweisung, or Krankenschein)
6. Fill in explanation for each selected type
7. Submit order
8. Receive confirmation

### For Admin:

1. Navigate to `/orders` in dashboard
2. View all submitted orders
3. Filter by status (Pending, Processing, Completed)
4. Click on order to view full details
5. Update status as orders are processed
6. Mark as completed when finished

## Files Created/Modified

### Praxis Website:

- `src/app/bestellung/OrderForm.tsx` - New comprehensive order form
- `src/app/bestellung/page.tsx` - Updated page layout
- `src/app/api/orders/route.ts` - API proxy to telemedker-server
- `src/locales/de.json` - Added all German translations

### Telemedker Server:

- `models/Order.js` - Order database model
- `controllers/orders.js` - CRUD operations
- `config/routes.js` - Added orders route

### Dashboard:

- `src/views/OrdersView.vue` - Order management view
- `src/router/index.ts` - Added orders route
- `src/layouts/DashboardLayout.vue` - Added Orders menu item

## Workflow

1. **Patient submits order** → Stored in MongoDB with status "pending"
2. **Admin sees order in dashboard** → Can view details
3. **Admin starts processing** → Updates status to "processing"
4. **Admin completes order** → Updates status to "completed"
5. **Optional:** Admin can cancel or delete orders

## Additional Features

### Calendar Improvements:

- ✅ Month navigation with arrows
- ✅ Only future months accessible
- ✅ Past dates disabled
- ✅ Weekends (Sat/Sun) disabled
- ✅ Fridays highlighted with video icon
- ✅ Friday message explaining video-only consultations
- ✅ Holiday support (dates marked as holidays are disabled)

### Dashboard:

- ✅ Weekly schedule creation for availability
- ✅ Holiday management
- ✅ Order management

## To Test:

1. **Restart telemedker-server** to load Order routes
2. Visit `http://localhost:3000/bestellung`
3. Fill out the form
4. Submit order
5. Check dashboard at `http://localhost:5173/orders`
6. View and manage the submitted order

## Summary

Complete end-to-end system for:

- ✅ Online prescription orders
- ✅ Referral requests
- ✅ Sick note requests
- ✅ Full patient data collection
- ✅ Admin management interface
- ✅ Status tracking
- ✅ All data stored in MongoDB via telemedker-server
