# AI-based Medical Laboratory

## Project Overview

The AI-based Medical Laboratory project aims to revolutionize laboratory medicine through the use of artificial intelligence (AI) and machine learning (ML). By enhancing the precision and speed of laboratory processes, the project seeks to reduce human errors, cut costs, and ultimately improve patient outcomes and satisfaction.

### Features

- **Customer Module**: Allows patients to submit samples and receive results.
- **Doctor Module**: Provides doctors with tools to analyze lab results and make informed decisions.
- **Lab Assistant Module**: Assists lab technicians with managing samples and running analyses using AI/ML tools.

### Pros and Cons

#### Pros

- Enhances precision and speed of laboratory medicine.
- Reduces human errors and operational costs.
- Improves patient outcomes and satisfaction.

#### Cons

- Challenges with data quality and availability.
- Requires significant computing power.
- Issues of trust, acceptance, and the need for education.

### Technologies Used

- **Frontend**: React, Redux, HTML, CSS, JavaScript
- **Backend**: Node.js, Express, MongoDB
- **AI/ML Tools**: Python, R, TensorFlow, PyTorch, scikit-learn, pandas, NumPy, matplotlib, seaborn

## Project Structure

The project is structured into two main directories:

- `frontend`: It has a react based Frontend––.
- `backend`: Contains the backend code built with Node.js and Express.

## Route Mappings and Functionalities

### Authentication Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/login` | `/api/v1/auth/login` | User authentication and login
`/register` | `/api/v1/auth/register` | New user registration
`/forgot-password` | `/api/v1/forgot-password` | Password recovery initiation
`/reset-password/:id/:token` | `/api/v1/reset-password` | Password reset with token

### User Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/users/profile/me` | `/api/v1/users/profile/me` | User profile management
`/services` | `/api/v1/users/services` | Available medical services
`/symptomchk` | `/api/v1/healthPredict` | AI-based symptom checking
`/contact` | `/api/v1/contact` | Contact form submission

### Doctor Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/doctors` | `/api/v1/doctors` | List all doctors
`/doctors/:id` | `/api/v1/doctors/:id` | Doctor details
`/doctors/profile/me` | `/api/v1/doctors/profile/me` | Doctor dashboard
`/disease/:id` | `/api/v1/disease/:id` | Disease-specific information

### Booking Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/checkout-success` | `/api/v1/bookings` | Appointment booking confirmation
`/users/profile/me/appointments` | `/api/v1/bookings/user/:userId` | User's appointment history
`/doctors/profile/me/appointments` | `/api/v1/bookings/doctor/:doctorId` | Doctor's appointment schedule

### Review Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/doctors/:id/reviews` | `/api/v1/reviews/:doctorId` | Doctor reviews
`/users/profile/me/reviews` | `/api/v1/reviews/user/:userId` | User's submitted reviews

### Admin Routes
Frontend Path | Backend Endpoint | Functionality
-------------|------------------|---------------
`/admin/dashboard` | `/api/v1/admin/stats` | Admin dashboard statistics
`/admin/users` | `/api/v1/admin/users` | User management
`/admin/doctors` | `/api/v1/admin/doctors` | Doctor management

### Protected Routes
The following routes require authentication:
- All routes under `/users/profile`
- All routes under `/doctors/profile`
- `/services`
- Admin dashboard and management routes

### Role-based Access
- **Patient Role**: Can access basic services, book appointments, and manage their profile
- **Doctor Role**: Can manage their profile, view appointments, and handle patient interactions
- **Admin Role**: Has full access to all system functionalities

## Detailed Route Documentation

### Authentication Routes

#### POST `/api/v1/auth/login`
- **Description**: Authenticates user and returns JWT token
- **Input**:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```
- **Output**:
```json
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "User Name",
        "role": "patient/doctor/admin"
    }
}
```

#### POST `/api/v1/auth/register`
- **Description**: Creates new user account
- **Input**:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
}
```
- **Output**:
```json
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### User Routes

#### GET `/api/v1/users/profile/me`
- **Description**: Retrieves current user's profile information
- **Authentication**: Required
- **Output**:
```json
{
    "success": true,
    "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "appointments": [],
        "medicalHistory": []
    }
}
```

#### POST `/api/v1/healthPredict`
- **Description**: AI-powered symptom analysis
- **Authentication**: Required
- **Input**:
```json
{
    "symptoms": ["fever", "cough", "fatigue"],
    "duration": "5 days",
    "severity": "moderate"
}
```
- **Output**:
```json
{
    "success": true,
    "prediction": {
        "possibleConditions": [
            {
                "condition": "Common Cold",
                "probability": 0.75
            },
            {
                "condition": "Flu",
                "probability": 0.25
            }
        ],
        "recommendations": []
    }
}
```

### Doctor Routes

#### GET `/api/v1/doctors`
- **Description**: Lists all available doctors with filtering options
- **Query Parameters**:
  - `specialty`: Filter by specialty
  - `availability`: Filter by availability
  - `rating`: Filter by minimum rating
- **Output**:
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": "doctor_id_1",
            "name": "Dr. Smith",
            "specialty": "Cardiology",
            "rating": 4.5,
            "availability": ["Monday", "Wednesday"]
        }
    ]
}
```

#### POST `/api/v1/doctors/:id/reviews`
- **Description**: Adds a review for a doctor
- **Authentication**: Required
- **Input**:
```json
{
    "rating": 5,
    "comment": "Excellent doctor, very professional"
}
```
- **Output**:
```json
{
    "success": true,
    "data": {
        "id": "review_id",
        "rating": 5,
        "comment": "Excellent doctor, very professional",
        "user": "user_id",
        "doctor": "doctor_id"
    }
}
```

### Booking Routes

#### POST `/api/v1/bookings`
- **Description**: Creates new appointment booking
- **Authentication**: Required
- **Input**:
```json
{
    "doctorId": "doctor_id",
    "date": "2024-02-20",
    "timeSlot": "10:00",
    "reason": "Regular checkup"
}
```
- **Output**:
```json
{
    "success": true,
    "data": {
        "id": "booking_id",
        "status": "confirmed",
        "date": "2024-02-20",
        "timeSlot": "10:00",
        "doctor": {
            "id": "doctor_id",
            "name": "Dr. Smith"
        }
    }
}
```

### Admin Routes

#### GET `/api/v1/admin/stats`
- **Description**: Retrieves system-wide statistics
- **Authentication**: Admin only
- **Output**:
```json
{
    "success": true,
    "data": {
        "totalUsers": 1000,
        "totalDoctors": 50,
        "totalAppointments": 500,
        "revenueStats": {
            "daily": 1000,
            "monthly": 30000,
            "yearly": 360000
        }
    }
}
```

#### PUT `/api/v1/admin/doctors/:id`
- **Description**: Updates doctor information
- **Authentication**: Admin only
- **Input**:
```json
{
    "name": "Dr. Jane Smith",
    "specialty": "Neurology",
    "fees": 150,
    "availability": ["Monday", "Wednesday", "Friday"]
}
```
- **Output**:
```json
{
    "success": true,
    "data": {
        "id": "doctor_id",
        "name": "Dr. Jane Smith",
        "specialty": "Neurology",
        "fees": 150,
        "availability": ["Monday", "Wednesday", "Friday"]
    }
}
```

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Steps

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/ai-medical-lab.git
   cd ai-medical-lab
```

2. **Install dependencies for backend**

```bash
   cd backend
   npm install
```

3. **Install dependencies for frontend**

```bash
   cd ../frontend
   npm install
```

4. **Set up environment variables**

   - Create a `.env` file in the `backend` directory and add the following:

```text
   MONGO_URI=your_mongodb_uri
   PORT=5000
```

5. **Run the backend server**

```bash
   cd ../backend
   npm start or nodemon
```

6. **Run the frontend server**

```bash
   cd ../frontend
   npm start
```

## Usage

- Access the application at `http://localhost:5173`.
- Use the frontend interface to interact with the different modules (Customer, Doctor, Lab Assistant).

## Contributors



## Collaboration

We welcome contributions from everyone! If you are interested in contributing to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Feel free to reach out to us with any questions or suggestions. Let's collaborate to extend the exposure and impact of this project!


