# 🚀 Frontend Deployment Guide

## ⭐ Recommendation: Use Vercel (Best for React/Vite)

**Vercel is the best choice** because:
- ✅ Optimized for React/Vite apps
- ✅ Automatic deployments from GitHub
- ✅ Free tier with excellent performance
- ✅ Global CDN
- ✅ Easy environment variable setup
- ✅ Automatic HTTPS

**Render** also works but is better for backends. Use it if you prefer.

---

## Option 1: Deploy to Vercel (Recommended) ⭐

### Step 1: Push Code to GitHub

```bash
# Make sure your code is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New..."** → **"Project"**
4. **Import your GitHub repository** (`Ecell3` or your repo name)
5. **Configure Project**:

   **Framework Preset:**
   ```
   Vite
   ```
   (Vercel should auto-detect this)

   **Root Directory:**
   ```
   ./
   ```
   (Leave as default)

   **Build Command:**
   ```
   npm run build
   ```
   (Auto-filled)

   **Output Directory:**
   ```
   dist
   ```
   (Auto-filled)

   **Install Command:**
   ```
   npm install
   ```
   (Auto-filled)

### Step 3: Add Environment Variable

**Before deploying**, click **"Environment Variables"** and add:

```
VITE_API_URL=https://sharkssphere-backend.onrender.com
```

**Important**: 
- Add to **Production**, **Preview**, and **Development**
- Click "Save" after adding

### Step 4: Deploy

Click **"Deploy"**

Vercel will:
1. Install dependencies
2. Build your app (`npm run build`)
3. Deploy to a URL like: `https://ecell3.vercel.app`

**Done!** Your frontend is live in ~2 minutes.

---

## Option 2: Deploy to Render (Alternative)

### Step 1: Push to GitHub
(Same as above)

### Step 2: Create Static Site on Render

1. **Go to**: https://render.com
2. **Click "New +"** → **"Static Site"**
3. **Connect GitHub** and select your repo

### Step 3: Configure Static Site

**Name:**
```
ecell-frontend
```

**Branch:**
```
main
```

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
dist
```

### Step 4: Add Environment Variable

In **Environment** section, add:

```
VITE_API_URL=https://sharkssphere-backend.onrender.com
```

### Step 5: Deploy

Click **"Create Static Site"**

---

## 🔧 Pre-Deployment Checklist

### 1. Test Build Locally

```bash
npm run build
npm run preview
```

Make sure the build works and preview looks good.

### 2. Verify Environment Variable

Your `.env` should have:
```
VITE_API_URL=https://sharkssphere-backend.onrender.com
```

### 3. Check for Hardcoded URLs

Make sure there are no hardcoded `localhost` URLs in your code.

---

## 📝 After Deployment

### 1. Get Your Frontend URL

- **Vercel**: `https://your-project-name.vercel.app`
- **Render**: `https://ecell-frontend.onrender.com`

### 2. Update Backend CORS (If Needed)

If you get CORS errors in production, you'll need to add CORS to your backend. But test first - it might work!

### 3. Test Everything

- ✅ Visit your deployed URL
- ✅ Try Login
- ✅ Try Signup
- ✅ Create Idea
- ✅ View Dashboard
- ✅ Vote on Ideas

---

## 🎯 Quick Start (Vercel - Recommended)

1. **Push code to GitHub**
2. **Go to vercel.com** → New Project
3. **Import repo** → Vercel auto-detects Vite
4. **Add env var**: `VITE_API_URL=https://sharkssphere-backend.onrender.com`
5. **Deploy!**

**That's it!** Your frontend will be live in ~2 minutes.

---

## 🆘 Troubleshooting

**Build fails?**
- Check Vercel/Render build logs
- Ensure all dependencies are in `package.json`
- Verify `npm run build` works locally

**CORS errors in production?**
- Backend needs CORS middleware
- Allow your frontend domain in backend CORS config

**Environment variables not working?**
- Make sure they start with `VITE_`
- Redeploy after adding env vars
- Check Vercel/Render environment variable settings

**404 errors on page refresh?**
- Vercel handles this automatically
- Render: May need to configure redirects (add `_redirects` file)

---

## ✅ My Recommendation

**Use Vercel** - It's specifically designed for frontend apps and will give you the best experience with minimal setup.
