# 🔧 Backend CORS Fix for Production

## Problem
Your frontend on Vercel (`https://sharks-sphere.vercel.app`) cannot access your backend on Render because the backend doesn't allow CORS requests from your frontend domain.

## Solution
Add CORS middleware to your backend to allow requests from your Vercel domain.

---

## Step 1: Install CORS Package

In your project root, run:

```bash
npm install cors
```

---

## Step 2: Update `server/app.js`

Add CORS middleware **before** your routes. Here's what to add:

### Option A: Allow All Origins (Quick Fix - Less Secure)

```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ADD THIS
import router from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// ADD CORS MIDDLEWARE HERE (before other middleware)
app.use(cors({
  origin: '*', // Allows all origins (for development/testing)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ... rest of your code
```

### Option B: Allow Specific Origins (Recommended - More Secure)

```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ADD THIS
import router from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// ADD CORS MIDDLEWARE HERE (before other middleware)
const allowedOrigins = [
  'https://sharks-sphere.vercel.app', // Your Vercel frontend
  'http://localhost:5173', // Local development
  'http://localhost:3000', // Local backend (if needed)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ... rest of your code
```

### Option C: Using Environment Variable (Best Practice)

```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ADD THIS
import router from './routes/authRoutes.js';
import ideaRoutes from './routes/ideaRoutes.js';
import voteRoutes from './routes/voteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// ADD CORS MIDDLEWARE HERE (before other middleware)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://sharks-sphere.vercel.app',
  'http://localhost:5173', // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ... rest of your code
```

---

## Step 3: Update Your `.env` (If Using Option C)

Add to your `.env` file:

```
FRONTEND_URL=https://sharks-sphere.vercel.app
```

---

## Step 4: Update Render Environment Variables

If you're using Option C, add this to your Render backend service:

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add:
   ```
   FRONTEND_URL=https://sharks-sphere.vercel.app
   ```
5. Save and redeploy

---

## Step 5: Commit and Push

```bash
git add .
git commit -m "Add CORS middleware for production"
git push origin main
```

Render will automatically redeploy your backend.

---

## Step 6: Test

After deployment, test your frontend:
1. Go to `https://sharks-sphere.vercel.app`
2. Try logging in
3. CORS error should be gone!

---

## ✅ Recommended: Use Option B or C

**Option B** is good for production - it only allows your specific frontend domain.

**Option C** is best practice - uses environment variables for flexibility.

---

## 🆘 Troubleshooting

**Still getting CORS errors?**
- Make sure CORS middleware is added **before** your routes
- Check that your frontend URL is exactly correct (no trailing slash)
- Verify the backend has been redeployed on Render
- Check browser console for the exact error message

**Backend not redeploying?**
- Check Render deployment logs
- Make sure `cors` package is in `package.json`
- Verify `server/app.js` changes are pushed to GitHub

