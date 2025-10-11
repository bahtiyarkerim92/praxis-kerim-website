# Quick Setup Guide for Praxis Dr. Kerim Appointment System

## 🚀 Quick Start (5 minutes)

### Step 1: Start Telemedker Server (Backend)

```bash
# Navigate to server directory
cd ../telemedker-server

# Install dependencies (first time only)
npm install

# Make sure MongoDB is running
# If using local MongoDB:
mongod

# Start the server
npm run dev
```

✅ Server should start on **http://localhost:3030**

### Step 2: Configure Praxis Website

```bash
# Navigate to website directory
cd praxis-kerim-website

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3030
EOF

# Start the website
npm run dev
```

✅ Website should start on **http://localhost:3000**

### Step 3: Add Sample Data

Open a new terminal and run these commands to populate with test data:

```bash
# Add a doctor
curl -X POST http://localhost:3030/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Max Mustermann",
    "specialty": "Allgemeinmedizin"
  }'

# Note the doctor ID from the response, then create availability
curl -X POST http://localhost:3030/api/availability \
  -H "Content-Type: application/json" \
  -d '{
    "doctorId": "DOCTOR_ID_HERE",
    "date": "2025-10-15",
    "slots": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  }'
```

### Step 4: Test the Booking System

1. Open browser: **http://localhost:3000/terminbuchung**
2. Select a doctor
3. Choose an available time slot
4. Fill in patient information
5. Submit booking

## ⚠️ Important Notes

### Authentication Issue

The telemedker-server requires authentication for creating appointments. You have 2 options:

#### Option A: Disable Auth for Public Booking (Quick Fix)

Edit `telemedker-server/controllers/appointments.js`:

Find line ~164:

```javascript
router.post(
  "/",
  authenticateToken,  // ← REMOVE THIS LINE
  appointmentValidationRules,
  handleValidationErrors,
  async (req, res) => {
```

Change to:

```javascript
router.post(
  "/",
  // authenticateToken,  ← COMMENTED OUT
  appointmentValidationRules,
  handleValidationErrors,
  async (req, res) => {
```

#### Option B: Implement Patient Authentication (Proper Solution)

1. Add patient registration/login to praxis website
2. Store JWT token in browser
3. Send token with booking requests
4. Keep authentication requirement

## 📋 Checklist

Before testing, ensure:

- [ ] MongoDB is running
- [ ] Telemedker-server is running on port 3030
- [ ] Praxis website is running on port 3000
- [ ] `.env.local` file exists with correct API URL
- [ ] At least one doctor exists in database
- [ ] At least one availability slot exists
- [ ] Authentication is disabled OR patient auth is implemented

## 🐛 Troubleshooting

### Cannot connect to MongoDB

```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB (macOS with Homebrew)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod

# Start MongoDB (Windows)
net start MongoDB
```

### Port 3030 already in use

```bash
# Find process using port 3030
lsof -i :3030

# Kill the process
kill -9 PID
```

### Doctors not showing in dropdown

- Check browser console for errors
- Verify API URL in `.env.local`
- Check telemedker-server logs
- Ensure doctors exist in MongoDB:
  ```bash
  mongosh
  use telemedker
  db.doctors.find()
  ```

### No available slots

- Check if availability exists in MongoDB:
  ```bash
  mongosh
  use telemedker
  db.availabilities.find()
  ```
- Ensure dates are in the future
- Verify doctor IDs match

### Booking fails with 401/403

- Authentication is still enabled
- Follow Option A above to disable auth
- Or implement patient authentication

## 🎯 Production Checklist

Before deploying to production:

1. **Security**

   - [ ] Re-enable authentication
   - [ ] Implement patient accounts
   - [ ] Use HTTPS for API calls
   - [ ] Validate all inputs
   - [ ] Sanitize patient data

2. **Environment**

   - [ ] Set `NEXT_PUBLIC_API_URL` to production server
   - [ ] Configure production MongoDB
   - [ ] Set up proper CORS
   - [ ] Use environment variables for secrets

3. **Features**

   - [ ] Email confirmations
   - [ ] SMS reminders
   - [ ] Calendar integration
   - [ ] Admin notifications
   - [ ] Cancellation policy

4. **Testing**
   - [ ] Test all booking scenarios
   - [ ] Test "no preference" doctor selection
   - [ ] Verify data encryption
   - [ ] Load testing
   - [ ] Mobile responsiveness

## 📞 Support

If you encounter issues:

1. Check the logs in both terminals (server and website)
2. Review TELEMEDKER_INTEGRATION.md for detailed information
3. Verify all environment variables are set correctly
4. Ensure MongoDB connection is working

## 🎉 Success!

If everything works, you should be able to:

- ✅ View doctors in dropdown
- ✅ See available time slots
- ✅ Book appointments
- ✅ View bookings in telemedker-dashboard
- ✅ Patient data is stored in MongoDB

Happy booking! 🏥
