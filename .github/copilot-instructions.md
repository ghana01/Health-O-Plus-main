# AI-MedLab Copilot Instructions

## Project Architecture Overview

This is a **full-stack AI-powered medical laboratory platform** with three distinct user roles: patients, doctors, and admins. The architecture combines traditional web development with AI/ML models for medical predictions.

### Tech Stack & Structure
- **Frontend**: React + Vite + TailwindCSS (in `/frontend/`)
- **Backend**: Node.js + Express + MongoDB (in `/backend/`)
- **AI/ML**: Python models (`.pkl`, `.h5`) + Google Gemini AI integration
- **Real-time**: WebSocket server for video consultations
- **Authentication**: JWT tokens with role-based access control

## Critical Development Workflows

### Starting the Application
```bash
# Backend (from /backend/)
npm start                    # Starts nodemon on port 8000
npm run seed-admin          # Seeds admin user to MongoDB

# Frontend (from /frontend/)
npm run dev                 # Starts Vite dev server

# Python Dependencies
npm run install-python-dependencies  # Installs ML model requirements
```

### Database & Models
- **Local MongoDB**: `mongodb://127.0.0.1:27017/MedLab`
- **Schemas**: Located in both `/models/` and `/db-models/` (legacy structure)
- **Admin Seeding**: Use `npm run seed-admin` to create initial admin user

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
- **Pickle models** (`.pkl`): diabetes, heart, kidney, liver, breast_cancer
- **H5 models** (`.h5`): malaria, pneumonia (TensorFlow/Keras)
- **Symptom prediction**: Uses `svc.pkl` with symptom dictionary mapping

### AI Consult Integration
- **Google Gemini API**: Located in `Controllers/aiConsultController.js`
- **API Key**: Requires `GEMINI_API_KEY` environment variable
- **Response formatting**: Custom formatting for medical responses

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
- **API Base**: All backend routes prefixed with `/api/v1/`

## Key Architectural Decisions

### Route Organization
Backend routes follow RESTful patterns with role-specific endpoints:
```
/api/v1/auth/*          # Authentication
/api/v1/users/*         # Patient operations
/api/v1/doctors/*       # Doctor operations  
/api/v1/admin/*         # Admin operations
/api/ai-consult         # AI consultation (no v1 prefix)
```

### File Upload Structure
- **Upload directory**: `backend/public/uploads/`
- **Multer configuration**: Handles medical image uploads for AI analysis
- **Static serving**: Express serves uploaded files directly

### WebSocket Implementation
Real-time video consultation system:
- **Rooms-based**: Clients join room IDs for private consultations
- **Message types**: offer, answer, ice-candidate, chat-message
- **Server**: HTTP server wraps Express app with WebSocket overlay

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
- **Frontend config**: `frontend/src/config.js` for API base URL
- **Required env vars**: `GEMINI_API_KEY`, `STRIPE_SECRET_KEY`

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
- **Schema definitions**: Check both `/models/` and `/db-models/`
- **Route definitions**: `Routes/` directory with modular route files

## Testing & Debugging

- **No formal test suite**: Manual testing via frontend interactions
- **Python model testing**: Use `predict.py` directly with sample data
- **Database inspection**: Connect to local MongoDB instance
- **WebSocket testing**: Browser dev tools for WebSocket connection debugging