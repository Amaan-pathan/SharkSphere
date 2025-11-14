# Development Setup Guide

## ✅ Backend Configuration

**You do NOT need to run the local backend server!**

The frontend is configured to use your Render backend:
- **Backend URL**: `https://sharkssphere-backend.onrender.com`

## 🚀 Running the Frontend

### Option 1: Development Mode (Recommended)
```bash
npm run dev
```
- Frontend runs on `http://localhost:5173`
- Automatically connects to Render backend
- Hot reload enabled for fast development

### Option 2: Production Build
```bash
npm run build
npm run preview
```
- Production-optimized build
- Uses Render backend
- Tests production behavior

## 📝 Current Configuration

**Frontend API calls go to:**
- `https://sharkssphere-backend.onrender.com/api/*`

**No local backend needed** ✅

## ⚠️ Important Notes

1. **Render Free Tier**: 
   - Backend spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - Subsequent requests are fast

2. **If you want to use local backend** (for faster development):
   - Start backend: `cd server && node app.js`
   - Update `src/api/api.js` to use Vite proxy in dev mode
   - But current setup works fine with Render backend

3. **CORS**: 
   - Render backend should allow requests from `http://localhost:5173`
   - If you see CORS errors, you may need to update backend CORS settings

## 🧪 Testing

1. Start frontend: `npm run dev`
2. Open `http://localhost:5173`
3. Try logging in or signing up
4. Check browser console for API calls to Render backend

## ✅ Summary

**Answer: NO, you don't need to start the backend server locally.**

The frontend is configured to use your Render backend at:
`https://sharkssphere-backend.onrender.com`

Just run `npm run dev` and you're good to go! 🚀

