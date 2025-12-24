# 🏥 Health-O-Plus: AI-Powered Healthcare Platform

<div align="center">

![Health-O-Plus Banner](https://img.shields.io/badge/Health--O--Plus-Healthcare%20Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**A comprehensive healthcare management system with AI-powered disease prediction, doctor consultation, and appointment booking**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 🌟 Inspiration

In today's fast-paced world, accessing quality healthcare remains a significant challenge. Long waiting times, difficulty finding specialized doctors, and lack of preliminary health assessments create barriers to timely medical care. **Health-O-Plus** was born from the vision to bridge this gap by leveraging modern technology and artificial intelligence.

### The Problem We're Solving

1. **Accessibility Crisis**: Patients struggle to find and book appointments with qualified doctors
2. **Delayed Diagnosis**: Lack of preliminary symptom analysis leads to delayed treatment
3. **Information Gap**: Patients lack tools to understand their symptoms before visiting doctors
4. **Fragmented Systems**: Healthcare data is scattered across multiple platforms
5. **Administrative Burden**: Manual appointment management and patient record handling is time-consuming

### Our Solution

Health-O-Plus provides a **unified healthcare ecosystem** that:
- 🤖 **AI-Powered Disease Prediction**: Analyzes symptoms using machine learning to predict potential conditions
- 👨‍⚕️ **Smart Doctor Matching**: Connects patients with specialized doctors based on their health concerns
- 📅 **Seamless Booking**: Streamlined appointment scheduling with real-time availability
- 💬 **Virtual Consultations**: Integrated video calling for remote consultations
- 📊 **Comprehensive Dashboard**: Centralized health records and appointment management
- 🔐 **Secure & Private**: HIPAA-compliant data handling with JWT authentication

---

## 📖 About the Project

### My Approach

As a final-year B.Tech student, I designed Health-O-Plus following **industry-standard software development practices**:

#### 1. **Problem Analysis & Research**
- Studied existing healthcare platforms (Practo, Zocdoc, WebMD)
- Identified pain points through user surveys
- Researched AI/ML models for disease prediction

#### 2. **System Design**
- Created **RESTful API architecture** for scalability
- Designed **role-based access control** (Patient, Doctor, Admin)
- Implemented **microservices-inspired** modular structure
- Planned **database schema** with proper relationships (User, Doctor, Booking, Review)

#### 3. **Technology Selection**
- **Frontend**: React 18 with functional components and hooks for modern, maintainable code
- **Backend**: Node.js + Express for fast, non-blocking API server
- **Database**: MongoDB for flexible, document-based storage
- **AI/ML**: Python with scikit-learn for disease prediction models
- **Styling**: Tailwind CSS for responsive, utility-first design

#### 4. **Development Methodology**
- **Agile Approach**: Iterative development with feature sprints
- **Component-Based Architecture**: Reusable React components
- **API-First Design**: Backend endpoints designed before frontend integration
- **Error-First Handling**: Comprehensive try-catch blocks and user feedback

#### 5. **Quality Assurance**
- Input validation on both frontend and backend
- JWT token-based authentication
- Protected routes with role verification
- Error boundaries for graceful failure handling
- Toast notifications for user feedback

---

## ✨ Features

### For Patients
- ✅ **User Registration & Authentication** - Secure signup/login with JWT
- 🔍 **Doctor Discovery** - Browse doctors by specialization, ratings, and availability
- 🤖 **AI Symptom Checker** - Get preliminary diagnosis based on symptoms
- 📅 **Appointment Booking** - Book slots with preferred doctors
- 💬 **Video Consultations** - WebRTC-based virtual consultations
- ⭐ **Doctor Reviews** - Rate and review doctor experiences
- 📱 **Profile Management** - Update personal and medical information
- 🩺 **Disease Information** - Learn about various medical conditions

### For Doctors
- 📊 **Professional Dashboard** - Manage appointments and patient records
- 👥 **Patient Management** - Access patient history and medical records
- 📅 **Schedule Management** - Set availability and time slots
- 💬 **Consultation Tools** - Video calling with patients
- ⭐ **Reputation Building** - Collect patient reviews and ratings
- 📈 **Earnings Tracking** - Monitor consultation fees and revenue

### For Admins
- 🎛️ **Admin Dashboard** - System-wide statistics and analytics
- 👨‍👩‍👧‍👦 **User Management** - CRUD operations on user accounts
- 👨‍⚕️ **Doctor Management** - Approve/reject doctor registrations
- 📅 **Booking Oversight** - Monitor and manage all appointments
- 💰 **Revenue Tracking** - View total earnings and payment status
- 🔍 **Advanced Search & Filters** - Find users, doctors, bookings quickly
- 📊 **Live Statistics** - Real-time counts of users, doctors, bookings

### AI/ML Features
- 🧠 **Disease Prediction Models**:
  - Symptom-based disease prediction (Training.csv with 132 diseases)
  - Heart disease prediction
  - Liver disease prediction
  - Kidney disease prediction
  - Breast cancer detection
  - Pneumonia detection (CNN model)
  - Malaria detection (CNN model)
- 📋 **Personalized Recommendations**:
  - Diet suggestions based on predicted condition
  - Workout plans for specific health issues
  - Medication information
  - Precautionary measures

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **React Router** | Navigation | 6.x |
| **Tailwind CSS** | Styling | 3.x |
| **Material Tailwind** | UI Components | Latest |
| **React Icons** | Icon Library | Latest |
| **React Toastify** | Notifications | Latest |
| **Vite** | Build Tool | 4.x |
| **Context API** | State Management | Built-in |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 18.x |
| **Express.js** | Web Framework | 4.x |
| **MongoDB** | Database | 6.x |
| **Mongoose** | ODM | 7.x |
| **JWT** | Authentication | Latest |
| **bcrypt** | Password Hashing | Latest |
| **WebSocket** | Real-time Communication | Latest |
| **cors** | CORS Handling | Latest |
| **dotenv** | Environment Variables | Latest |

### AI/ML
| Technology | Purpose |
|------------|---------|
| **Python** | ML Backend |
| **scikit-learn** | Disease Prediction |
| **TensorFlow/Keras** | Deep Learning (Pneumonia, Malaria) |
| **pandas** | Data Processing |
| **NumPy** | Numerical Computing |
| **Flask** | ML API (via child_process) |

---

---

## 📂 Project Structure

```
Health-O-Plus-main/
│
├── frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── components/               # Reusable UI Components
│   │   │   ├── About/               # About section
│   │   │   ├── Doctors/             # Doctor listing components
│   │   │   ├── Header/              # Navigation header
│   │   │   ├── Footer/              # Footer component
│   │   │   ├── Loader/              # Loading spinner
│   │   │   ├── Error/               # Error boundary
│   │   │   └── FloatingConsultation/ # Floating chat widget
│   │   │
│   │   ├── pages/                    # Page Components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # User login
│   │   │   ├── Signup.jsx           # User registration
│   │   │   ├── AdminLogin.jsx       # Admin login
│   │   │   ├── Doctors.jsx          # Doctor listing page
│   │   │   ├── DoctorDetails.jsx    # Doctor profile
│   │   │   ├── Services.jsx         # Services page
│   │   │   ├── Contact.jsx          # Contact form
│   │   │   ├── Admin-Home.jsx       # Admin dashboard
│   │   │   ├── Admin-Users.jsx      # User management
│   │   │   ├── Admin-Doctors.jsx    # Doctor management
│   │   │   ├── Admin-Bookings.jsx   # Booking management
│   │   │   ├── Admin-Update.jsx     # Edit user form
│   │   │   ├── DeleteUser.jsx       # Delete confirmation
│   │   │   └── DeleteDoctor.jsx     # Delete confirmation
│   │   │
│   │   ├── Dashboard/                # User Dashboards
│   │   │   ├── user-account/        # Patient dashboard
│   │   │   └── doctor-account/      # Doctor dashboard
│   │   │
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.jsx      # Authentication state
│   │   │
│   │   ├── routes/                   # Route Components
│   │   │   ├── Routers.jsx          # Main routes
│   │   │   └── ProtectedRoute.jsx   # Auth guard
│   │   │
│   │   ├── layout/                   # Layout Components
│   │   │   ├── Layout.jsx           # User layout
│   │   │   └── Admin-Layout.jsx     # Admin layout
│   │   │
│   │   ├── hooks/                    # Custom Hooks
│   │   │   └── useFetchData.jsx     # Data fetching hook
│   │   │
│   │   ├── utils/                    # Utility Functions
│   │   ├── assets/                   # Static Assets
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   └── config.js                 # API configuration
│   │
│   ├── public/                       # Public Assets
│   ├── package.json                  # Dependencies
│   ├── tailwind.config.js           # Tailwind configuration
│   └── vite.config.js               # Vite configuration
│
├── backend/                          # Node.js Backend Application
│   ├── Controllers/                  # Business Logic
│   │   ├── authController.js        # Authentication logic
│   │   ├── userController.js        # User operations
│   │   ├── doctorController.js      # Doctor operations
│   │   ├── bookingController.js     # Booking logic
│   │   ├── reviewController.js      # Review management
│   │   ├── adminController.js       # Admin operations
│   │   ├── helathPredict.js         # AI prediction logic
│   │   └── predictionControler.js   # Disease predictions
│   │
│   ├── Routes/                       # API Routes
│   │   ├── auth.js                  # Auth endpoints
│   │   ├── user.js                  # User endpoints
│   │   ├── doctor.js                # Doctor endpoints
│   │   ├── booking.js               # Booking endpoints
│   │   ├── review.js                # Review endpoints
│   │   ├── admin.js                 # Admin endpoints
│   │   ├── disease.js               # Disease info endpoints
│   │   ├── healthPredict.js         # AI prediction endpoints
│   │   ├── aiConsult.js             # AI consultation
│   │   ├── contact.js               # Contact form
│   │   └── forgot-password.js       # Password reset
│   │
│   ├── db-models/                    # Mongoose Schemas
│   │   ├── UserSchema.js            # User model
│   │   ├── DoctorSchema.js          # Doctor model
│   │   ├── BookingSchema.js         # Booking model
│   │   └── ReviewSchema.js          # Review model
│   │
│   ├── auth/                         # Authentication
│   │   └── verifyToken.js           # JWT verification
│   │
│   ├── HealthPredict/                # ML Training Data
│   │   ├── Training.csv             # Disease dataset
│   │   ├── Symptom-severity.csv     # Symptom weights
│   │   ├── description.csv          # Disease descriptions
│   │   ├── diets.csv                # Diet recommendations
│   │   ├── medications.csv          # Medicine info
│   │   ├── precautions_df.csv       # Precautions
│   │   └── workout_df.csv           # Exercise plans
│   │
│   ├── aimodels/                     # Trained AI Models
│   │   ├── pneumonia.h5             # Pneumonia detection
│   │   └── malaria.h5               # Malaria detection
│   │
│   ├── Python Scripts/               # ML Prediction Scripts
│   │   ├── predict.py               # Main prediction
│   │   ├── symptoms.py              # Symptom analysis
│   │   ├── heart.py                 # Heart disease
│   │   ├── liver.py                 # Liver disease
│   │   ├── kidney.py                # Kidney disease
│   │   ├── breast-cancer.py         # Cancer detection
│   │   ├── pneumonia.py             # Pneumonia CNN
│   │   └── malaria.py               # Malaria CNN
│   │
│   ├── index.js                      # Server entry point
│   ├── config.js                     # MongoDB config
│   ├── package.json                  # Dependencies
│   ├── seedAdmin.js                  # Admin seeder
│   ├── checkAdmin.js                 # Admin checker
│   └── requirements.txt              # Python dependencies
│
├── QUICK_START.md                    # Quick start guide
├── TESTING_CHECKLIST.md              # Testing procedures
├── BUG_FIXES_SUMMARY.md              # Bug fixes log
└── README.md                         # This file
```

---

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Node.js** (v14.0 or higher) - [Download](https://nodejs.org/)
- ✅ **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Python** (v3.8 or higher) - [Download](https://www.python.org/downloads/)
- ✅ **npm** or **yarn** - Comes with Node.js
- ✅ **Git** - [Download](https://git-scm.com/)

### Step-by-Step Setup

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Health-O-Plus.git
cd Health-O-Plus
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Create .env file (optional, defaults work locally)
echo "MONGO_URI=mongodb://127.0.0.1:27017/MedLab" > .env
echo "JWT_SECRET=your-secret-key-here" >> .env
echo "PORT=8000" >> .env

# Seed admin user (default: admin@example.com / admin123)
node seedAdmin.js

# Start backend server
npm start
```

**Backend will run on:** `http://localhost:8000`

#### 3️⃣ Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run on:** `http://localhost:5173`

#### 4️⃣ Verify Installation

1. **Check MongoDB**: Ensure MongoDB is running
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

2. **Check Backend**: Visit `http://localhost:8000` - should see "Api is working"

3. **Check Frontend**: Visit `http://localhost:5173` - should see landing page

4. **Admin Login**: 
   - Go to `http://localhost:5173/admin-login`
   - Email: `admin@example.com`
   - Password: `admin123`

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 Authentication Endpoints

#### 1. User Registration
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient",
  "gender": "male",
  "photo": "https://example.com/photo.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User successfully created",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

#### 2. User Login
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully login",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "photo": "https://example.com/photo.jpg"
  }
}
```

---

### 👤 User Endpoints

#### 3. Get User Profile
```http
GET /api/v1/users/profile/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile info is getting",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "photo": "https://example.com/photo.jpg",
    "role": "patient",
    "gender": "male",
    "bloodType": "A+",
    "appointments": []
  }
}
```

#### 4. Update User Profile
```http
PUT /api/v1/users/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "bloodType": "O+",
  "gender": "male"
}
```

#### 5. Delete User
```http
DELETE /api/v1/users/:id
Authorization: Bearer <token>
```

---

### 👨‍⚕️ Doctor Endpoints

#### 6. Get All Doctors
```http
GET /api/v1/doctors
```

**Query Parameters:**
- `query` - Search by name (optional)

**Response:**
```json
{
  "success": true,
  "message": "Doctors found",
  "data": [
    {
      "_id": "doctor_id",
      "name": "Dr. Smith",
      "email": "smith@example.com",
      "specialization": "Cardiologist",
      "qualifications": ["MBBS", "MD"],
      "experiences": [
        {
          "startingDate": "2015-01-01",
          "endingDate": "2020-12-31",
          "position": "Senior Cardiologist",
          "hospital": "City Hospital"
        }
      ],
      "bio": "Expert in heart diseases",
      "about": "Dedicated doctor with 10 years experience",
      "timeSlots": [],
      "reviews": [],
      "averageRating": 4.5,
      "totalRating": 100,
      "isApproved": "approved",
      "photo": "https://example.com/doctor.jpg",
      "ticketPrice": 500
    }
  ]
}
```

#### 7. Get Single Doctor
```http
GET /api/v1/doctors/:id
```

#### 8. Update Doctor Profile
```http
PUT /api/v1/doctors/:id
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "specialization": "Neurologist",
  "ticketPrice": 600,
  "qualifications": ["MBBS", "MD", "DM"],
  "experiences": [],
  "timeSlots": [],
  "bio": "Updated bio",
  "about": "Updated about"
}
```

#### 9. Get Doctor Profile (Self)
```http
GET /api/v1/doctors/profile/me
Authorization: Bearer <token>
```

---

### 📅 Booking Endpoints

#### 10. Get Checkout Session (Book Appointment)
```http
POST /api/v1/bookings/checkout-session/:doctorId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully paid",
  "session": {
    "orderId": "ORDER_123456",
    "amount": 500,
    "currency": "INR"
  }
}
```

#### 11. Get User's Appointments
```http
GET /api/v1/bookings/user/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Bookings are getting",
  "data": [
    {
      "_id": "booking_id",
      "doctor": {
        "name": "Dr. Smith",
        "photo": "doctor.jpg",
        "specialization": "Cardiologist"
      },
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "ticketPrice": 500,
      "orderId": "ORDER_123456",
      "transactionId": "TXN_789",
      "status": "approved",
      "isPaid": true,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### 12. Get Doctor's Appointments
```http
GET /api/v1/bookings/doctor/:doctorId
Authorization: Bearer <token>
```

---

### ⭐ Review Endpoints

#### 13. Get All Reviews for a Doctor
```http
GET /api/v1/reviews/:doctorId
```

**Response:**
```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": [
    {
      "_id": "review_id",
      "doctor": "doctor_id",
      "user": {
        "_id": "user_id",
        "name": "John Doe",
        "photo": "user.jpg"
      },
      "reviewText": "Excellent doctor, very professional",
      "rating": 5,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### 14. Create Review
```http
POST /api/v1/reviews/:doctorId
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "reviewText": "Great experience!",
  "rating": 5
}
```

---

### 🔬 AI Prediction Endpoints

#### 15. Symptom-Based Disease Prediction
```http
POST /api/v1/healthPredict
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "symptoms": ["Itching", "Skin Rash", "Nodal Skin Eruptions"]
}
```

**Response:**
```json
{
  "success": true,
  "predicted_disease": "Fungal infection",
  "description": "Fungal infection is a common skin condition...",
  "precautions": [
    "bath twice",
    "use detol or neem in bathing water",
    "keep infected area dry",
    "use clean cloths"
  ],
  "medications": ["Antifungal Cream", "Fluconazole"],
  "workouts": ["Yoga", "Light exercise"],
  "diets": ["Avoid sugar", "Eat probiotics"]
}
```

#### 16. Heart Disease Prediction
```http
POST /api/v1/disease/heart
```

**Request Body:**
```json
{
  "age": 55,
  "sex": 1,
  "cp": 3,
  "trestbps": 140,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

**Response:**
```json
{
  "prediction": 1,
  "message": "The model predicts Heart Disease"
}
```

#### 17. Liver Disease Prediction
```http
POST /api/v1/disease/liver
```

#### 18. Kidney Disease Prediction
```http
POST /api/v1/disease/kidney
```

#### 19. Breast Cancer Prediction
```http
POST /api/v1/disease/breast-cancer
```

#### 20. Pneumonia Detection
```http
POST /api/v1/disease/pneumonia
```

**Request Body:**
```json
{
  "image": "base64_encoded_xray_image"
}
```

#### 21. Malaria Detection
```http
POST /api/v1/disease/malaria
```

---

### 🛡️ Admin Endpoints

All admin endpoints require `role: "admin"` in JWT token.

#### 22. Get All Users
```http
GET /api/v1/admin/users
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Users Found",
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient",
      "gender": "male",
      "bloodType": "A+",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 23. Get Single User
```http
GET /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
```

#### 24. Update User
```http
PUT /api/v1/admin/users/:id
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "role": "doctor",
  "gender": "male",
  "bloodType": "B+"
}
```

#### 25. Delete User
```http
DELETE /api/v1/admin/users/delete/:id
Authorization: Bearer <admin_token>
```

#### 26. Get All Doctors
```http
GET /api/v1/admin/doctors
Authorization: Bearer <admin_token>
```

#### 27. Delete Doctor
```http
DELETE /api/v1/admin/doctors/delete/:id
Authorization: Bearer <admin_token>
```

#### 28. Update Doctor Approval Status
```http
PUT /api/v1/admin/doctors/:id
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "isApproved": "approved"  // "pending" | "approved" | "cancelled"
}
```

#### 29. Get All Bookings
```http
GET /api/v1/admin/bookings
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "counts": 150,
  "success": true,
  "message": "Bookings Found",
  "data": [
    {
      "_id": "booking_id",
      "doctor": {
        "name": "Dr. Smith",
        "specialization": "Cardiologist",
        "photo": "doctor.jpg"
      },
      "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "photo": "user.jpg"
      },
      "ticketPrice": "500",
      "orderId": "ORDER_123",
      "transactionId": "TXN_456",
      "status": "approved",
      "isPaid": true,
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### 📞 Contact Endpoint

#### 30. Submit Contact Form
```http
POST /api/v1/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "I have a question about..."
}
```

---

### 🔑 Password Reset Endpoints

#### 31. Forgot Password (Send Reset Link)
```http
POST /api/v1/forgot-password
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### 32. Reset Password
```http
POST /api/v1/reset-password/:id/:token
```

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

---

---

## 🎨 UI/UX Features

### Design Principles
- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **Modern Aesthetics**: Gradient backgrounds, smooth animations, glassmorphism
- **Intuitive Navigation**: Clear menu structure and breadcrumbs
- **Fast Performance**: Optimized images, lazy loading, code splitting

### Key UI Components

#### 1. Landing Page
- Hero section with call-to-action
- Service cards with hover effects
- Featured doctors carousel
- Patient testimonials
- Statistics showcase
- FAQ accordion
- Footer with quick links

#### 2. User Dashboard
- Profile overview card
- Upcoming appointments timeline
- Medical history table
- Quick actions menu
- Notification center

#### 3. Doctor Dashboard
- Earnings summary
- Appointment calendar
- Patient list
- Reviews & ratings
- Profile completion progress

#### 4. Admin Dashboard
- **Live Statistics**: Real-time user, doctor, booking counts
- **Data Visualization**: Progress bars for booking status breakdown
- **Recent Activity Tables**: Latest bookings and user registrations
- **Quick Actions**: Direct links to manage users, doctors, bookings
- **Search & Filter**: Advanced filtering on all admin pages
- **Color-Coded Status**: Visual indicators for pending/approved/cancelled

#### 5. Loading States
- Skeleton screens during data fetching
- Spinner components for actions
- Progress indicators for multi-step forms

#### 6. Error Handling UI
- Error boundary with friendly messages
- Toast notifications for success/error feedback
- Inline form validation errors
- 404 page for invalid routes

### Color Palette
```css
Primary: #0067FF (Blue)
Secondary: #01B5C5 (Cyan)
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Neutral: #6B7280 (Gray)
```

---

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Tokens**: Secure, stateless authentication
- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **Role-Based Access Control**: Patient, Doctor, Admin roles
- ✅ **Protected Routes**: Frontend and backend route guards
- ✅ **Token Expiry**: Automatic logout on token expiration

### Data Security
- ✅ **Input Validation**: Server-side validation on all endpoints
- ✅ **MongoDB Injection Prevention**: Mongoose sanitization
- ✅ **CORS Configuration**: Restricted origin access
- ✅ **Environment Variables**: Sensitive data in .env files
- ✅ **Password Exclusion**: Never send passwords in responses

### Best Practices
- HTTPS in production (recommended)
- Rate limiting for API endpoints (recommended)
- SQL/NoSQL injection prevention
- XSS protection with input sanitization
- CSRF token protection (recommended for production)

---

## 📊 Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  phone: String,
  photo: String,
  role: String (enum: ["patient", "doctor", "admin"]),
  gender: String (enum: ["male", "female", "other"]),
  bloodType: String,
  appointments: [ObjectId] (ref: Booking),
  createdAt: Date,
  updatedAt: Date
}
```

### Doctor Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  phone: String,
  photo: String,
  ticketPrice: Number,
  role: String (default: "doctor"),
  specialization: String,
  qualifications: [
    {
      startingDate: Date,
      endingDate: Date,
      degree: String,
      university: String
    }
  ],
  experiences: [
    {
      startingDate: Date,
      endingDate: Date,
      position: String,
      hospital: String
    }
  ],
  bio: String,
  about: String,
  timeSlots: [
    {
      day: String,
      startingTime: String,
      endingTime: String
    }
  ],
  reviews: [ObjectId] (ref: Review),
  averageRating: Number (default: 0),
  totalRating: Number (default: 0),
  isApproved: String (enum: ["pending", "approved", "cancelled"], default: "pending"),
  appointments: [ObjectId] (ref: Booking),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Schema
```javascript
{
  _id: ObjectId,
  doctor: ObjectId (ref: Doctor, required),
  user: ObjectId (ref: User, required),
  ticketPrice: String (required),
  orderId: String (required),
  transactionId: String,
  videoCallRoomId: String,
  status: String (enum: ["pending", "approved", "cancelled"], default: "pending"),
  isPaid: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  _id: ObjectId,
  doctor: ObjectId (ref: Doctor, required),
  user: ObjectId (ref: User, required),
  reviewText: String (required),
  rating: Number (required, 0-5),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing

### Manual Testing Checklist
See `TESTING_CHECKLIST.md` for comprehensive testing procedures.

**Quick Test:**
```bash
# 1. Start backend
cd backend && npm start

# 2. Start frontend
cd frontend && npm run dev

# 3. Test flows:
- User registration & login
- Doctor listing & details
- Appointment booking
- Admin login & dashboard
- CRUD operations on users/doctors/bookings
```

### Test Coverage
- ✅ Authentication flows (signup, login, logout)
- ✅ User management (create, read, update, delete)
- ✅ Doctor management & approval workflow
- ✅ Booking creation & status updates
- ✅ Review submission & display
- ✅ AI prediction endpoints
- ✅ Admin dashboard statistics
- ✅ Protected route access control
- ✅ Error handling & validation

---

## 🚀 Deployment

### Production Checklist

#### Backend
```bash
# 1. Set production environment variables
NODE_ENV=production
MONGO_URI=<your_atlas_connection_string>
JWT_SECRET=<strong_random_secret>
CLIENT_URL=<your_frontend_url>

# 2. Install production dependencies only
npm ci --production

# 3. Use process manager
pm2 start index.js --name health-o-plus-api

# 4. Enable CORS for your domain only
# 5. Set up HTTPS with SSL certificate
# 6. Configure rate limiting
# 7. Set up logging (Winston/Morgan)
```

#### Frontend
```bash
# 1. Update API URL in config.js
export const BASE_URL = "https://your-api-domain.com/api/v1"

# 2. Build production bundle
npm run build

# 3. Deploy to hosting service
# - Vercel (recommended for Vite)
# - Netlify
# - AWS S3 + CloudFront
# - DigitalOcean App Platform
```

### Recommended Hosting
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas (Free tier available)
- **File Storage**: AWS S3, Cloudinary (for user photos)

---

## 🎓 Learning Outcomes

### Skills Demonstrated

#### Full-Stack Development
- ✅ RESTful API design and implementation
- ✅ CRUD operations with MongoDB
- ✅ Authentication & authorization with JWT
- ✅ Frontend-backend integration
- ✅ State management with Context API
- ✅ Responsive UI design with Tailwind CSS

#### Software Engineering
- ✅ MVC architecture pattern
- ✅ Modular code organization
- ✅ Error handling best practices
- ✅ API documentation
- ✅ Git version control
- ✅ Environment-based configuration

#### AI/ML Integration
- ✅ Model integration with web applications
- ✅ Python-Node.js communication
- ✅ Disease prediction algorithms
- ✅ Data preprocessing and feature engineering
- ✅ Model deployment strategies

#### Problem Solving
- ✅ Healthcare domain understanding
- ✅ User-centric design thinking
- ✅ Performance optimization
- ✅ Security implementation
- ✅ Scalability considerations

---

## 📈 Future Enhancements

### Planned Features
- [ ] Real-time chat between patients and doctors
- [ ] Email notifications for appointments
- [ ] SMS reminders for upcoming appointments
- [ ] Prescription management system
- [ ] Lab report upload and analysis
- [ ] Insurance integration
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Telemedicine with screen sharing
- [ ] Electronic Health Records (EHR) system
- [ ] Doctor-to-doctor referral system
- [ ] Medical billing and invoicing

### Scalability Roadmap
- Microservices architecture
- Redis caching layer
- Load balancing with NGINX
- Database sharding
- CDN for static assets
- Elasticsearch for advanced search
- GraphQL API layer

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/Health-O-Plus.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Commit Your Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Wait for review

### Contribution Guidelines
- Write clean, readable code
- Follow React and Node.js best practices
- Test your changes thoroughly
- Update README if adding new features
- Be respectful and constructive

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 Health-O-Plus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Author

**Your Name**
- B.Tech Final Year Student
- Computer Science & Engineering

### Connect With Me
- 🔗 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- 🐙 GitHub: [Your GitHub](https://github.com/yourusername)
- 📧 Email: your.email@example.com
- 🌐 Portfolio: [Your Portfolio](https://yourportfolio.com)

---

## 🙏 Acknowledgments

### Inspiration & Resources
- **Design Inspiration**: Dribbble, Behance healthcare designs
- **UI Components**: Material Tailwind, Headless UI
- **Icons**: React Icons, Heroicons
- **AI/ML Models**: Kaggle datasets, scikit-learn documentation
- **Learning Resources**: 
  - [React Documentation](https://react.dev)
  - [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
  - [MongoDB University](https://university.mongodb.com)
  - [Tailwind CSS](https://tailwindcss.com)

### Special Thanks
- My college professors for guidance
- Open-source community for amazing tools
- Beta testers for valuable feedback
- Family and friends for support

---

## 📞 Support

### Need Help?

- 📖 **Documentation**: Read `QUICK_START.md` for setup guide
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Create an issue with "enhancement" label
- ❓ **Questions**: Check existing issues or start a discussion

### Troubleshooting

**Backend won't start:**
```bash
# Check if MongoDB is running
mongod --version

# Check if port 8000 is available
netstat -ano | findstr :8000

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Frontend won't load:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

**Admin can't login:**
```bash
# Recreate admin user
cd backend
node resetAdmin.js
node seedAdmin.js
```

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/Health-O-Plus?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/Health-O-Plus?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/Health-O-Plus?style=social)

**Lines of Code**: ~15,000+ | **Files**: 100+ | **Components**: 50+

</div>

---

## 🎯 Project Goals Achieved

✅ **Healthcare Accessibility** - Made healthcare consultation accessible online  
✅ **AI Integration** - Implemented 7 disease prediction models  
✅ **User Experience** - Created intuitive, responsive UI  
✅ **Security** - Implemented industry-standard authentication  
✅ **Scalability** - Designed modular, maintainable architecture  
✅ **Documentation** - Comprehensive README and guides  
✅ **Best Practices** - Followed React, Node.js, MongoDB conventions  

---

<div align="center">

## ⭐ Star this repository if you found it helpful!

**Made with ❤️ by a B.Tech Student**

*Health-O-Plus - Bringing Healthcare to Your Fingertips*

[⬆ Back to Top](#-health-o-plus-ai-powered-healthcare-platform)

</div>


