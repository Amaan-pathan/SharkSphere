# 🚀 Deploy Frontend to Render (Static Site)

## Step-by-Step Guide

---

## Step 1: Push Code to GitHub

Make sure your code is committed and pushed:

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## Step 2: Create Static Site on Render

1. **Go to**: https://render.com
2. **Click "New +"** button (top right)
3. **Select "Static Site"**

---

## Step 3: Connect GitHub Repository

1. **Connect GitHub** (if not already connected)
2. **Select your repository** (`Ecell3` or your repo name)
3. **Click "Connect"**

---

## Step 4: Configure Static Site

Fill in the following settings:

### Basic Settings

**Name:**
```
sharks-sphere-frontend
```
(or any name you prefer)

**Branch:**
```
main
```
(or your default branch)

**Root Directory:**
```
./
```
(Leave as default - root of repo)

### Build Settings

**Build Command:**
```
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Node Version:**
```
18
```
(or latest LTS - Render will suggest one)

---

## Step 5: Add Environment Variable

**Before deploying**, add your environment variable:

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://sharkssphere-backend.onrender.com`
4. Click **"Save"**

---

## Step 6: Deploy

1. Click **"Create Static Site"** button at the bottom
2. Render will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your app (`npm run build`)
   - Deploy to a URL like: `https://sharks-sphere-frontend.onrender.com`

**Deployment takes 2-5 minutes.**

---

## Step 7: Update Backend CORS

After deployment, you'll get a URL like:
```
https://sharks-sphere-frontend.onrender.com
```

**Update your backend CORS** to allow this new domain:

1. Go to `server/app.js`
2. Update the `allowedOrigins` array:

```javascript
const allowedOrigins = [
  'https://sharks-sphere-frontend.onrender.com', // Your Render frontend
  'https://sharks-sphere.vercel.app', // Keep Vercel if you still use it
  'http://localhost:5173', // Local development
];
```

3. Commit and push:
```bash
git add server/app.js
git commit -m "Update CORS for Render frontend"
git push origin main
```

4. Wait for Render backend to redeploy

---

## Step 8: Test Your Frontend

1. Visit your Render frontend URL
2. Test login/signup
3. Verify everything works!

---

## 🔧 Configuration Summary

| Setting | Value |
|---------|-------|
| **Name** | `sharks-sphere-frontend` |
| **Branch** | `main` |
| **Root Directory** | `./` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Environment Variable** | `VITE_API_URL=https://sharkssphere-backend.onrender.com` |

---

## 📝 Custom Domain (Optional)

If you want a custom domain:

1. Go to your Static Site settings on Render
2. Click **"Custom Domain"**
3. Add your domain
4. Follow DNS configuration instructions

---

## 🆘 Troubleshooting

### Build Fails

**Check:**
- All dependencies are in `package.json`
- Build command is correct: `npm install && npm run build`
- Node version is compatible (18+)

**View logs:**
- Go to your Static Site on Render
- Click **"Logs"** tab
- Check for error messages

### CORS Errors

**Solution:**
- Make sure backend CORS includes your Render frontend URL
- Backend must be redeployed after CORS changes
- Check exact URL (no trailing slash)

### 404 Errors on Page Refresh

**Solution:**
Render Static Sites handle this automatically, but if you have issues:

1. Create `public/_redirects` file:
```
/*    /index.html   200
```

2. Or create `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
```

### Environment Variables Not Working

**Check:**
- Variable name starts with `VITE_`
- Variable is added in Render dashboard
- Redeploy after adding variables

---

## ✅ Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Static Site created on Render
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variable added: `VITE_API_URL`
- [ ] Backend CORS updated with Render frontend URL
- [ ] Backend redeployed
- [ ] Frontend tested and working

---

## 🎯 After Deployment

Your frontend will be live at:
```
https://sharks-sphere-frontend.onrender.com
```

**Note:** Render Static Sites are free and include:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Custom domains support

---

## 💡 Pro Tips

1. **Auto-Deploy**: Render automatically redeploys when you push to `main` branch
2. **Preview Deployments**: Create preview deployments for pull requests
3. **Environment Variables**: You can have different env vars for different environments
4. **Build Logs**: Always check build logs if something goes wrong

---

## 🚀 You're Done!

Your frontend is now live on Render! 🎉

