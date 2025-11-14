# 🚀 Render Backend Deployment Guide

## ⚠️ CRITICAL: You Need "Web Service" NOT "Static Site"

The form you're looking at is for **Static Sites** (HTML/CSS/JS files). Your backend is a **Node.js server** that needs a **Web Service**.

### How to Get to the Right Form:

1. **Go back to Render Dashboard**
2. Click **"New +"** button (top right)
3. Select **"Web Service"** (NOT Static Site)
4. Connect your GitHub repository

---

## 📋 Render Web Service Configuration

Once you're on the **Web Service** form, fill in these fields:

### **Name:**
```
ecell-backend
```
or
```
nst-ecell-api
```

### **Region:**
```
Singapore
```
(Closest to India, or choose Oregon if Singapore unavailable)

### **Branch:**
```
main
```
(Your main branch name)

### **Root Directory:**
```
server
```
⚠️ **Important**: This tells Render your backend code is in the `server/` folder

### **Runtime:**
```
Node
```

### **Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

This will:
- Install all dependencies
- Generate Prisma Client
- Run database migrations

### **Start Command:**
```bash
node app.js
```
⚠️ **Note**: Since Root Directory is `server`, you use `app.js` (not `server/app.js`)

### **Plan:**
```
Free
```
(For testing, or upgrade to Starter $7/month for production)

---

## 🔐 Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add ALL of these:

| Key | Value |
|-----|-------|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `mysql://root:hhevSqlEfypnYEapGYeVTdIRRMRmnmfv@hopper.proxy.rlwy.net:34194/railway` |
| `JWT_SECRET` | `f7ac68893192f58bf96687095ddbf974f3c49ec904fc98a4f957e532d9765c9e` |
| `JWT_EXPIRE` | `7d` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `vanshdagar2705@gmail.com` |
| `EMAIL_PASSWORD` | `smwababgzopnaafw` |
| `FRONTEND_URL` | `http://localhost:5173` (update after frontend deployment) |

---

## ✅ Quick Checklist

Before clicking "Create Web Service":

- [ ] Selected **Web Service** (not Static Site)
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start Command: `node app.js`
- [ ] Added all 10 environment variables
- [ ] Selected Free or Starter plan

---

## 🎯 After Deployment

1. **Get your backend URL**: Render will give you something like:
   ```
   https://ecell-backend.onrender.com
   ```

2. **Test it**: Visit `https://ecell-backend.onrender.com/api` - you should see:
   ```json
   {"message": "Entrepreneurship Club API is running!"}
   ```

3. **Update frontend**: In your frontend `.env` or Render environment variables:
   ```
   VITE_API_URL=https://ecell-backend.onrender.com
   ```

---

## 🆘 Common Issues

**"Build failed"**
- Check Render logs
- Ensure Prisma schema is correct
- Verify all dependencies in package.json

**"Cannot connect to database"**
- Verify DATABASE_URL is correct
- Check Railway database allows external connections
- Ensure database is running

**"Port already in use"**
- Render sets PORT automatically, your code should use `process.env.PORT`

---

## 📝 Summary

**DO NOT use Static Site form** - Use **Web Service** instead!

The key difference:
- **Static Site** = HTML/CSS/JS files (for frontend)
- **Web Service** = Node.js/Python/etc server (for backend)

Your backend needs **Web Service** ✅

