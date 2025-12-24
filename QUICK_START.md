# Health-O-Plus Quick Start Guide

## 🚀 How to Run the Project

### Prerequisites
Make sure you have these installed:
- ✅ Node.js (v14 or higher)
- ✅ MongoDB (running on port 27017)
- ✅ npm or yarn package manager

---

## Backend Setup

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start MongoDB
```bash
# Windows (if MongoDB installed as service)
net start MongoDB

# Or start manually
mongod --dbpath "C:\data\db"
```

### 4. Create Admin User (First time only)
```bash
node seedAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

### 5. Start Backend Server
```bash
npm start
```

**Backend will run on:** http://localhost:8000

**Expected output:**
```
Mongoose connected
Server is running on port 8000
```

---

## Frontend Setup

### 1. Open new terminal and navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

**Frontend will run on:** http://localhost:5173 (or similar Vite port)

**Expected output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🔐 Admin Login

### Access Admin Panel
1. Open browser and go to: **http://localhost:5173/admin-login**
2. Enter credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Click **Login**
4. You'll be redirected to: **http://localhost:5173/admin/home**

---

## 📊 Admin Dashboard Features

### 1. Admin Home (`/admin/home`)
- View total users, doctors, bookings
- See booking status breakdown
- View recent bookings and users
- Quick navigation to other admin pages

### 2. Manage Users (`/admin/users`)
- View all registered users
- Search users by name, email, or ID
- Edit user details
- Delete users

### 3. Manage Doctors (`/admin/doctors`)
- View all doctors
- Search by name, email, specialization
- Filter by approval status (pending/approved/cancelled)
- Change approval status
- Delete doctors

### 4. Manage Bookings (`/admin/bookings`)
- View all bookings
- Search by patient name, doctor name, or booking ID
- Filter by booking status and payment status
- View total revenue
- See patient and doctor details

### 5. Update User (`/admin/users/:id/edit`)
- Edit user information
- Update name, email, gender, role, blood type, photo

### 6. Delete Confirmation (`/delete/user/:id` or `/delete/doctor/:id`)
- Confirm before deleting
- Shows user/doctor details
- Cancel or confirm deletion

---

## 🛠️ Troubleshooting

### Backend Not Starting
**Error:** "Mongoose connection failed"
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
net start MongoDB
```

### Frontend Not Loading
**Error:** Port already in use
```bash
# Kill process using port
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change Vite port in vite.config.js
```

### Admin Login Fails
**Error:** "Invalid credentials"
```bash
# Recreate admin user
cd backend
node resetAdmin.js
node seedAdmin.js
```

### API Errors (404/500)
**Check:**
1. Backend is running on port 8000
2. MongoDB is connected
3. Check `frontend/src/config.js`:
   ```javascript
   export const BASE_URL = "http://localhost:8000/api/v1";
   ```

### Images Not Loading
**Issue:** Photo URLs broken
- Use default images or update photo URLs
- Default image: `defaultImg` from `assets/images/default.avif`

---

## 📱 Testing Checklist

### Quick Test Steps
1. ✅ Backend running on port 8000
2. ✅ Frontend running on Vite dev server
3. ✅ Admin login successful
4. ✅ Dashboard shows statistics
5. ✅ Can view users, doctors, bookings
6. ✅ Search and filter work
7. ✅ Edit user works
8. ✅ Delete user/doctor works
9. ✅ Toast notifications appear
10. ✅ No console errors

---

## 🎯 Common Admin Tasks

### Add New User/Doctor
- Users register through frontend form
- Doctors register with doctor role
- Admin approves doctors from Admin-Doctors page

### Approve Doctor
1. Go to Admin-Doctors
2. Find doctor with "pending" status
3. Click dropdown, select "approved"
4. Toast notification confirms success

### Edit User Details
1. Go to Admin-Users
2. Click "Edit" button on user card
3. Update fields in form
4. Click "Update User"
5. Toast notification confirms success

### Delete User/Doctor
1. Go to Admin-Users or Admin-Doctors
2. Click "Delete" button
3. Confirm deletion in popup
4. Toast notification confirms success

### View Booking Details
1. Go to Admin-Bookings
2. Each card shows:
   - Patient name and email
   - Doctor name and specialization
   - Booking date and status
   - Payment status and price

---

## 🔒 Security Notes

### For Development
- Default admin credentials are for testing only
- Change admin password before deployment
- Keep `.env` file secure (not committed to Git)

### For Production
- Use environment variables for sensitive data
- Enable CORS only for trusted domains
- Use HTTPS for all API calls
- Implement rate limiting
- Add input validation and sanitization

---

## 📚 Project Structure

```
Health-O-Plus-main/
├── backend/
│   ├── Controllers/
│   │   └── adminController.js  # Admin CRUD logic
│   ├── Routes/
│   │   └── admin.js            # Admin API routes
│   ├── db-models/
│   │   ├── UserSchema.js
│   │   ├── DoctorSchema.js
│   │   └── BookingSchema.js
│   ├── index.js                # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin-Home.jsx
│   │   │   ├── Admin-Users.jsx
│   │   │   ├── Admin-Doctors.jsx
│   │   │   ├── Admin-Bookings.jsx
│   │   │   ├── Admin-Update.jsx
│   │   │   ├── DeleteUser.jsx
│   │   │   └── DeleteDoctor.jsx
│   │   ├── components/
│   │   │   └── Error/
│   │   │       └── ErrorBoundary.jsx
│   │   ├── layout/
│   │   │   └── Admin-Layout.jsx
│   │   ├── App.jsx
│   │   └── config.js
│   └── package.json
│
├── TESTING_CHECKLIST.md        # Comprehensive testing guide
├── BUG_FIXES_SUMMARY.md        # All fixes documented
└── README.md                   # Project documentation
```

---

## 🎓 For B.Tech Project Submission

### What to Demonstrate
1. **Full-Stack Architecture**: React frontend + Node.js backend + MongoDB
2. **Authentication**: JWT-based admin login
3. **Authorization**: Role-based access control
4. **CRUD Operations**: Create, Read, Update, Delete for all entities
5. **Modern UI**: Tailwind CSS with gradients and animations
6. **Error Handling**: ErrorBoundary and toast notifications
7. **Search & Filter**: Advanced filtering on all admin pages
8. **Data Relationships**: Populated user/doctor data in bookings
9. **Code Quality**: Clean, commented, student-friendly code
10. **Responsive Design**: Works on all screen sizes

### Skills Highlighted
- React 18 (hooks, context, functional components)
- Node.js & Express.js (RESTful APIs)
- MongoDB & Mongoose (database modeling)
- JWT authentication
- Tailwind CSS
- Git version control
- Problem-solving & debugging

---

## 📞 Need Help?

Check these files:
- `TESTING_CHECKLIST.md` - Detailed testing procedures
- `BUG_FIXES_SUMMARY.md` - All bug fixes and implementations
- `README.md` - Project overview and features

---

**Happy Coding! 🚀**
