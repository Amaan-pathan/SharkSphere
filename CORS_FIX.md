# 🔴 CORS Issue - Backend Needs CORS Configuration

## Problem

Your backend at `https://sharkssphere-backend.onrender.com` doesn't have CORS (Cross-Origin Resource Sharing) configured. This means:

- ✅ Backend is running and accessible
- ❌ Browser blocks requests from `http://localhost:5173` due to CORS policy
- ❌ Login/Signup requests fail with "Login failed" error

## Solution: Add CORS to Backend

You need to add CORS middleware to your backend. Since you said not to modify the server folder, here's what needs to be added:

### In `server/app.js`, add this:

```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Add this import
import router from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Add CORS middleware BEFORE other middleware
app.use(cors({
  origin: [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',  // Alternative port
    process.env.FRONTEND_URL   // Production frontend URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ... rest of your code
```

### Install CORS package:

In your backend (on Render), you need to add `cors` to `package.json`:

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    // ... other dependencies
  }
}
```

## Quick Fix Steps:

1. **Add CORS to backend** (in Render dashboard or locally):
   - Install: `npm install cors`
   - Add CORS middleware to `server/app.js` (code above)
   - Redeploy on Render

2. **Or use a workaround** (temporary):
   - Use a browser extension to disable CORS (not recommended for production)
   - Or deploy frontend to same domain as backend

## Check Browser Console

After adding the improved error logging, check your browser console (F12) when you try to login. You should see:

```
API Error: {
  message: "Network Error" or "CORS policy blocked",
  status: undefined,
  ...
}
```

This confirms it's a CORS issue.

## Alternative: Test with curl

Test if backend works directly:
```bash
curl -X POST https://sharkssphere-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@nst.edu.in","password":"test123"}'
```

If this works but browser doesn't → **CORS issue confirmed**

