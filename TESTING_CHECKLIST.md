# Health-O-Plus Testing Checklist

## Backend Testing

### Admin API Endpoints
- [ ] **GET /api/v1/admin/users** - Get all users
- [ ] **GET /api/v1/admin/users/:id** - Get single user by ID
- [ ] **PUT /api/v1/admin/users/:id** - Update user by ID
- [ ] **DELETE /api/v1/admin/users/delete/:id** - Delete user
- [ ] **GET /api/v1/admin/doctors** - Get all doctors
- [ ] **DELETE /api/v1/admin/doctors/delete/:id** - Delete doctor
- [ ] **PUT /api/v1/admin/doctors/:id** - Update doctor approval status
- [ ] **GET /api/v1/admin/bookings** - Get all bookings with populated user/doctor data

### Backend Server
```bash
# Start backend server
cd backend
npm install
npm start
```
Server should start on: **http://localhost:8000**

### Database
- [ ] MongoDB running on **mongodb://127.0.0.1:27017/MedLab**
- [ ] Check if admin user exists in Users collection
- [ ] Verify sample data exists for testing

---

## Frontend Testing

### Admin Login
- [ ] Navigate to `/admin-login`
- [ ] Login with admin credentials
- [ ] Should redirect to `/admin/home`
- [ ] Verify token is stored in localStorage

### Admin Dashboard (Admin-Home)
- [ ] **Statistics Cards Display**: Total Users, Total Doctors, Total Bookings, Pending Bookings
- [ ] **Booking Status Breakdown**: Progress bars for Pending, Approved, Cancelled
- [ ] **Recent Bookings Table**: Shows last 5 bookings with patient name, doctor, date, status
- [ ] **Recent Users Table**: Shows last 5 users with name, email, role
- [ ] **System Overview Panel**: Quick stats for pending/approved doctors
- [ ] **Loading State**: Shows Loading component while fetching data
- [ ] **Error Handling**: Shows error message if API fails

### Admin Users Page (Admin-Users)
- [ ] **User List Display**: All users shown in card format
- [ ] **Search Functionality**: Search by name, email, or ID
- [ ] **User Cards**: Show photo, name, email, gender, role, blood type
- [ ] **Edit Button**: Navigates to `/admin/users/:id/edit`
- [ ] **Delete Button**: Navigates to `/delete/user/:id`
- [ ] **Loading State**: Shows Loading component
- [ ] **Error State**: Shows Error component if fetch fails

### Admin Doctors Page (Admin-Doctors)
- [ ] **Doctor List Display**: All doctors shown in card format
- [ ] **Search Functionality**: Search by name, email, specialization
- [ ] **Status Filter**: Filter by All/Pending/Approved/Cancelled
- [ ] **Doctor Cards**: Show photo, name, email, specialization, gender, approval status
- [ ] **Approval Dropdown**: Change status (pending/approved/cancelled)
- [ ] **Color Coding**: 
  - Pending = Yellow background
  - Approved = Green background
  - Cancelled = Red background
- [ ] **Toast Notification**: Success/error message on status update
- [ ] **Delete Button**: Navigates to `/delete/doctor/:id`
- [ ] **Loading State**: Shows Loading component
- [ ] **Error State**: Shows Error component

### Admin Bookings Page (Admin-Bookings)
- [ ] **Bookings List Display**: All bookings shown in card format
- [ ] **Patient Name Search**: Search by patient name
- [ ] **Doctor Name Search**: Search by doctor name
- [ ] **Booking ID Search**: Search by booking ID
- [ ] **Status Filter**: Filter by All/Pending/Approved/Cancelled
- [ ] **Payment Filter**: Filter by All/Paid/Unpaid
- [ ] **Revenue Dashboard**: Total revenue from paid bookings displayed
- [ ] **Booking Cards**: Show patient info, doctor info, date, status, payment status, price
- [ ] **Populated Data**: User and doctor data should be populated (not just IDs)
- [ ] **Color-Coded Status**: Visual indicators for booking status
- [ ] **Loading State**: Shows Loading component
- [ ] **Error State**: Shows Error component

### Admin Update User Page (Admin-Update)
- [ ] **Navigate**: From Admin-Users page, click Edit button
- [ ] **Form Fields**: Name, Email, Gender, Role, Blood Type, Photo URL
- [ ] **Pre-filled Data**: Form should load existing user data
- [ ] **Validation**: All required fields validated
- [ ] **Submit Button**: Updates user data via PUT request
- [ ] **Success Toast**: "User updated successfully"
- [ ] **Error Toast**: Shows error message if update fails
- [ ] **Redirect**: After success, navigate back to `/admin/users`
- [ ] **Loading State**: Shows loading spinner on submit

### Delete User Page (DeleteUser)
- [ ] **Navigate**: From Admin-Users page, click Delete button
- [ ] **Confirmation Dialog**: Shows warning message with user info
- [ ] **Cancel Button**: Goes back to previous page
- [ ] **Delete Button**: Confirms deletion
- [ ] **Loading State**: Shows loading spinner during deletion
- [ ] **Success Toast**: "User deleted successfully"
- [ ] **Error Toast**: Shows error if deletion fails
- [ ] **Redirect**: After deletion, navigate back to `/admin/users`

### Delete Doctor Page (DeleteDoctor)
- [ ] **Navigate**: From Admin-Doctors page, click Delete button
- [ ] **Confirmation Dialog**: Shows warning message with doctor info
- [ ] **Cancel Button**: Goes back to previous page
- [ ] **Delete Button**: Confirms deletion
- [ ] **Loading State**: Shows loading spinner during deletion
- [ ] **Success Toast**: "Doctor deleted successfully"
- [ ] **Error Toast**: Shows error if deletion fails
- [ ] **Redirect**: After deletion, navigate back to `/admin/doctors`

---

## Error Handling

### ErrorBoundary Component
- [ ] **Component Errors**: Catches and displays errors in child components
- [ ] **Development Mode**: Shows error stack trace (only in dev)
- [ ] **Production Mode**: Shows user-friendly error message
- [ ] **Refresh Button**: Allows page reload
- [ ] **Home Button**: Navigates back to home page

### API Error Handling
- [ ] **Network Errors**: Proper error messages for network failures
- [ ] **401 Unauthorized**: Redirects to login if token expired
- [ ] **404 Not Found**: Shows "Resource not found" message
- [ ] **500 Server Error**: Shows "Server error" message
- [ ] **Console Logging**: All errors logged to console for debugging

---

## UI/UX Testing

### Design & Layout
- [ ] **Responsive Design**: Works on desktop, tablet, mobile
- [ ] **Gradient Colors**: Proper use of gradient backgrounds
- [ ] **Icons**: All icons from react-icons display correctly
- [ ] **Typography**: Proper font sizes and weights
- [ ] **Spacing**: Consistent padding and margins
- [ ] **Shadows**: Card shadows for depth
- [ ] **Animations**: Smooth transitions and hover effects

### Navigation
- [ ] **Admin Sidebar**: Shows all admin menu items
- [ ] **Active Route Highlighting**: Current page highlighted in sidebar
- [ ] **Breadcrumbs**: Optional breadcrumb navigation
- [ ] **Back Buttons**: All pages have way to navigate back

### Performance
- [ ] **Loading Speed**: Pages load within 2-3 seconds
- [ ] **API Response Time**: Backend responds quickly
- [ ] **Image Loading**: Images load without breaking layout
- [ ] **Memory Leaks**: No memory leaks in long sessions

---

## Common Issues & Solutions

### Issue: "user is not defined" in booking cards
**Solution**: Backend now populates user and doctor data in getAllBookings controller

### Issue: Admin login redirects to /home instead of /admin/home
**Solution**: Already fixed - AdminLogin.jsx navigates to '/admin/home'

### Issue: Icons not found (FaUserDoctor, FaCalendarAlt)
**Solution**: Fixed imports - FaUserDoctor from 'react-icons/fa6', FaCalendarAlt from 'react-icons/fa'

### Issue: Toast notifications not showing
**Solution**: Added toast.success() and toast.error() to all CRUD operations

### Issue: Loading state not showing
**Solution**: All admin pages now have Loading component from react-spinners

---

## Testing Commands

### Start Backend
```bash
cd backend
npm install
npm start
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Create Admin User (if not exists)
```bash
cd backend
node seedAdmin.js
```

### Check Admin User
```bash
cd backend
node checkAdmin.js
```

---

## Expected Results

### All Tests Pass ✅
- Backend API responds correctly
- Frontend displays data properly
- CRUD operations work (Create, Read, Update, Delete)
- Error handling shows proper messages
- Loading states display during API calls
- Toast notifications appear on success/error
- Navigation works between all pages
- Responsive design looks good on all devices

### Code Quality ✅
- No console errors in browser
- No ESLint warnings
- Proper comments explaining logic
- Student-friendly variable names
- Intermediate-level code complexity
- Modern React patterns (hooks, functional components)
- Clean and organized file structure

---

## Notes for Developer

This is a **B.Tech final year student project**, so the code is designed to be:
- **Intermediate level** - Not too basic, not overly professional
- **Well-commented** - Every section has comments explaining the logic
- **Modern stack** - React 18, Tailwind CSS, Express, MongoDB
- **Feature-rich** - Admin dashboard, user management, doctor management, booking system
- **Error-handled** - Proper error boundaries and toast notifications

The project demonstrates:
1. Full-stack development skills (React + Node.js + MongoDB)
2. RESTful API design and implementation
3. JWT authentication and authorization
4. Role-based access control (Admin vs User)
5. Modern UI/UX with Tailwind CSS
6. State management with Context API
7. Error handling and user feedback
8. CRUD operations across multiple entities
