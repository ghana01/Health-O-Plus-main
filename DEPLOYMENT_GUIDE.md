# 🚀 Health-O-Plus Deployment Guide

This guide will help you deploy Health-O-Plus with:
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → MongoDB Atlas (free tier)

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:
- [ ] GitHub account with your code pushed
- [ ] Vercel account (free)
- [ ] Render account (free)
- [ ] MongoDB Atlas account (free)
- [ ] Cloudinary account (for image uploads)
- [ ] Gmail account (for sending emails)
- [ ] Google Gemini API key (for AI features)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and log in
3. Create a new cluster (choose FREE tier)
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/MedLab?retryWrites=true&w=majority
   ```
6. Replace `username` and `password` with your credentials
7. Save this URL - you'll need it for Render

---

## 🖥️ Step 2: Deploy Backend on Render

1. Go to [Render](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `health-o-plus-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):

   | Key | Value |
   |-----|-------|
   | `PORT` | `8000` |
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | `mongodb+srv://...` (your Atlas URL) |
   | `JWT_SECRET_KEY` | `your_super_secret_random_string` |
   | `FRONTEND_URL` | `https://your-app.vercel.app` (add after Vercel deploy) |
   | `EMAIL_USER` | `your_email@gmail.com` (optional - for contact form) |
   | `EMAIL_APP_PASS` | `your_gmail_app_password` (optional) |
   | `GEMINI_API_KEY` | `your_gemini_api_key` |

6. Click **"Create Web Service"**
7. Wait for deployment (takes 2-5 minutes)
8. Copy your Render URL: `https://health-o-plus-backend.onrender.com`

---

## 🌐 Step 3: Deploy Frontend on Vercel

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:

   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | `https://health-o-plus-backend.onrender.com/api/v1` |
   | `VITE_AI_CONSULT_URL` | `https://health-o-plus-backend.onrender.com/api/ai-consult` |
   | `VITE_CLOUD_NAME` | `your_cloudinary_cloud_name` |
   | `VITE_UPLOAD_PRESET` | `your_cloudinary_upload_preset` |

6. Click **"Deploy"**
7. Wait for deployment
8. Copy your Vercel URL: `https://your-app.vercel.app`

---

## 🔄 Step 4: Update Backend with Frontend URL

1. Go back to Render Dashboard
2. Go to your backend service → **"Environment"**
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Click **"Save Changes"** - this will trigger a redeploy

---

## 📧 Gmail App Password Setup

To send emails, you need a Gmail App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create a new app password for "Mail"
5. Copy the 16-character password
6. Use this as `EMAIL_APP_PASS` in your environment variables

---

## ☁️ Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com) and create a free account
2. Go to Dashboard and copy:
   - **Cloud Name**: Use as `VITE_CLOUD_NAME`
3. Go to Settings → Upload → Upload Presets
4. Create a new **unsigned** preset
5. Copy the preset name: Use as `VITE_UPLOAD_PRESET`

---

## 🔑 Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy and use as `GEMINI_API_KEY`

---

## 🧪 Test Your Deployment

After deployment, test these endpoints:

1. **Backend Health Check**:
   ```
   https://your-backend.onrender.com/
   → Should return: "Api is working"
   ```

2. **Frontend**:
   ```
   https://your-app.vercel.app/
   → Should load the homepage
   ```

3. **Test Features**:
   - [ ] User Registration
   - [ ] User Login
   - [ ] Doctor Search
   - [ ] AI Chat
   - [ ] Disease Prediction

---

## 📁 Environment Variables Summary

### Backend (Render)
```env
PORT=8000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/MedLab
JWT_SECRET_KEY=your_super_secret_key_here
FRONTEND_URL=https://your-app.vercel.app
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASS=your_gmail_app_password
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (Vercel)
```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1
VITE_AI_CONSULT_URL=https://your-backend.onrender.com/api/ai-consult
```

---

## ⚠️ Common Issues & Solutions

### 1. CORS Errors
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Don't include trailing slash

### 2. Database Connection Failed
- Check if your IP is whitelisted in MongoDB Atlas
- Go to Atlas → Network Access → Add `0.0.0.0/0` to allow all IPs

### 3. Render Free Tier Sleeps
- Free tier services sleep after 15 mins of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading for production use

### 4. Email Not Sending
- Make sure 2FA is enabled on Gmail
- Use App Password, not regular password
- Check spam folder

---

## 🎉 You're Done!

Your Health-O-Plus platform is now live! Share your Vercel URL with users.

**Support**: If you face issues, check the Render and Vercel logs for errors.
