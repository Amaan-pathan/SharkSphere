# ✅ Backend URL Configuration

## Production Backend URL
**https://sharkssphere-backend.onrender.com**

## ✅ Configuration Status

### 1. Environment Variables (`.env`)
```
VITE_API_URL=https://sharkssphere-backend.onrender.com
```
✅ **Configured**

### 2. API Configuration (`src/api/api.js`)
- Development: Uses Vite proxy (`/api` → `http://localhost:3000`)
- Production: Uses `https://sharkssphere-backend.onrender.com/api`
✅ **Configured with fallback**

### 3. How It Works

**Development Mode (`npm run dev`):**
- Frontend runs on `http://localhost:5173`
- API calls go through Vite proxy to `http://localhost:3000`
- Works with local backend

**Production Build:**
- Frontend uses `https://sharkssphere-backend.onrender.com/api`
- All API calls go directly to Render backend
- No proxy needed

## 🧪 Testing

### Test Backend is Running:
Visit: https://sharkssphere-backend.onrender.com/api

Expected response:
```json
{"message":"Entrepreneurship Club API is running!"}
```

### Test Frontend Connection:
1. Build frontend: `npm run build`
2. Preview: `npm run preview`
3. Try logging in/signing up
4. Check browser console for API calls

## 📝 API Endpoints

All endpoints will be:
- Development: `http://localhost:5173/api/*`
- Production: `https://sharkssphere-backend.onrender.com/api/*`

Examples:
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Get Ideas: `GET /api/ideas`
- Create Idea: `POST /api/ideas`
- Vote: `POST /api/ideas/:id/vote`

## 🚀 Deployment Notes

When deploying frontend (Vercel/Netlify/etc.), set:
```
VITE_API_URL=https://sharkssphere-backend.onrender.com
```

This ensures production builds use the correct backend URL.

