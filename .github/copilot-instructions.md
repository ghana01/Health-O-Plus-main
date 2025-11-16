# AI-MedLab Copilot Instructions

## Project Architecture Overview

This is a **full-stack AI-powered medical laboratory platform** with three distinct user roles: patients, doctors, and admins. The architecture combines traditional web development with AI/ML models for medical predictions and WebRTC for real-time video consultations.

### Tech Stack & Structure
- **Frontend**: React + Vite + TailwindCSS (in `/frontend/`)
- **Backend**: Node.js + Express + MongoDB (in `/backend/`)
- **AI/ML**: Python models (`.pkl`, `.h5`) + Google Gemini AI integration
- **Real-time**: WebSocket server for video consultations using WebRTC
- **Authentication**: JWT tokens with role-based access control

## Critical Development Workflows

### Starting the Application
```bash
# Backend (from /backend/)
npm start                    # Starts nodemon on port 8000

# Frontend (from /frontend/)
npm run dev                 # Starts Vite dev server

# Python Dependencies
npm run install-python-dependencies  # Installs ML model requirements
```

### Admin Management
```bash
# Fix admin login issues
node testAdmin.js           # Tests and fixes admin password

# Reset admin completely
node resetAdmin.js          # Deletes and recreates admin

# Seed initial admin
npm run seed-admin          # Creates admin if not exists
```

**Admin Credentials** (hardcoded):
- Email: `admin@healthoplus.com`
- Password: `Admin@123`
- Login URL: `/admin-login`

### Database & Models
- **Local MongoDB**: `mongodb://127.0.0.1:27017/MedLab`
- **Schemas**: Located in both `/models/` and `/db-models/` (use `/db-models/` for consistency)

## AI/ML Integration Patterns

### Python Model Execution
AI predictions use Python models via `python-shell` package:
```javascript
// Pattern: backend/Controllers/predictionControler.js
import { PythonShell } from 'python-shell';
const options = {
  mode: 'text',
  pythonPath: 'python',
  pythonOptions: ['-u'],
  scriptPath: './',
  args: [disease, JSON.stringify(inputData)]
};
```

### Available ML Models
- **Pickle models** (`.pkl`): diabetes, heart, kidney, liver, breast_cancer, svc
- **H5 models** (`.h5`): malaria, pneumonia (TensorFlow/Keras)
- **Symptom prediction**: Uses `svc.pkl` with symptom dictionary mapping (`Controllers/helathPredict.js`)

### AI Consult Integration
- **Google Gemini API**: Located in `Controllers/aiConsultController.js`
- **API Key**: Requires `GEMINI_API_KEY` environment variable
- **Response formatting**: Custom formatting for medical responses

## WebRTC Video Calling System

### Architecture
- **WebSocket Server**: Handles signaling for WebRTC connections
- **Room-based**: Doctors and patients join rooms using booking IDs
- **Message Types**: offer, answer, ice-candidate, chat-message

### Implementation Pattern
```javascript
// backend/index.js WebSocket setup
const rooms = {};
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    // Handle: join, offer, answer, ice-candidate, chat-message
  });
});
```

### Video Call Flow
1. Patient books appointment → receives booking ID
2. At scheduled time, both join room: `/video-call/:roomId`
3. WebRTC peer connection established via WebSocket signaling
4. Direct video/audio stream between browser clients

## Authentication & Role System

### Three-tier Role Structure
```javascript
// Context: frontend/src/context/AuthContext.jsx
const roles = ['patient', 'doctor', 'admin'];
// App.jsx renders different layouts based on role
```

### Route Protection Patterns
- **Backend**: `auth/verifyToken.js` middleware for protected endpoints
- **Frontend**: Role-based routing in `routes/` directory
- **API Base**: All backend routes prefixed with `/api/v1/` (except `/api/ai-consult`)

### Admin Login Security
- **No public registration**: Admin role blocked in signup
- **Separate login**: `/admin-login` endpoint (`/api/v1/auth/admin-login`)
- **Hardcoded credentials**: Only pre-seeded admin can access
- **Password hashing**: Uses bcrypt with salt (10 rounds)

## Booking System Architecture

### Simplified Flow (No Payment Confirmation)
1. Patient browses doctors (with filters)
2. Patient books appointment → creates booking record
3. **No payment required** → booking confirmed immediately
4. At scheduled time → video call enabled for both parties

### Doctor Listing
- **Default**: Show ALL doctors on `/doctors` page
- **Filters**: City, specialization, availability
- **API**: `GET /api/v1/doctors` with optional query params

### Booking Schema
```javascript
{
  doctor: ObjectId,
  user: ObjectId,
  appointmentDate: Date,
  appointmentTime: String,
  status: 'pending' | 'confirmed' | 'completed',
  videoRoomId: String  // For WebRTC room access
}
```

## Key Architectural Decisions

### Route Organization
Backend routes follow RESTful patterns with role-specific endpoints:
```
/api/v1/auth/*          # Authentication
/api/v1/users/*         # Patient operations
/api/v1/doctors/*       # Doctor operations  
/api/v1/admin/*         # Admin operations
/api/v1/bookings/*      # Appointment bookings
/api/ai-consult         # AI consultation (no v1 prefix)
/video-call/:roomId     # WebRTC video room
```

### File Upload Structure
- **Upload directory**: `backend/public/uploads/`
- **Multer configuration**: Handles medical image uploads for AI analysis
- **Static serving**: Express serves uploaded files directly

## Development Conventions

### Error Handling Pattern
Controllers use consistent response structure:
```javascript
res.status(200).json({
  success: true,
  message: "Operation successful",
  data: result
});
```

### Environment Configuration
- **Backend config**: `backend/config.js` for payment gateways
- **Frontend config**: `frontend/src/config.js` for API base URL (`http://localhost:8000/api/v1`)
- **Required env vars**: `GEMINI_API_KEY`, `STRIPE_SECRET_KEY` (optional)

### Model Integration
Python scripts follow this input/output pattern:
```python
# Input: sys.argv[1] = disease, sys.argv[2] = JSON data
# Output: JSON.stringify(prediction.tolist())
```

## Important File Locations

- **Health predictions**: `Controllers/helathPredict.js` (note typo in filename)
- **Symptom data**: `HealthPredict/` directory contains CSV datasets
- **AI models**: `aimodels/` directory with trained models
- **Schema definitions**: Use `/db-models/` (not `/models/`)
- **Route definitions**: `Routes/` directory with modular route files
- **WebRTC logic**: `pages/VideoCall.jsx` (frontend)
- **WebSocket server**: `backend/index.js` (bottom of file)

## UI/UX Patterns

### Modern Glassmorphism Design
- **Gradient backgrounds**: `bg-gradient-to-br from-primaryColor via-blue-800 to-purple-900`
- **Glass effect**: `bg-white/10 backdrop-blur-lg`
- **Borders**: `border border-white/20`
- **Hover effects**: `hover:scale-105 transition-all duration-300`

### Color Scheme
- **Primary**: `primaryColor` (defined in Tailwind config)
- **Admin**: Blue/Purple gradients
- **Success**: Green tones
- **Alerts**: Yellow/Amber for warnings

## Testing & Debugging

- **No formal test suite**: Manual testing via frontend interactions
- **Python model testing**: Use `predict.py` directly with sample data
- **Database inspection**: Connect to local MongoDB instance
- **WebSocket testing**: Browser dev tools for WebSocket connection debugging
- **Admin login debug**: Check backend console for login attempt logs