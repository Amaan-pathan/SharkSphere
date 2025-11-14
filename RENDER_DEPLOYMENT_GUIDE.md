# Render Deployment Guide for Backend

## ⚠️ IMPORTANT: Use "Web Service" NOT "Static Site"

You're currently looking at a **Static Site** form, but for your Node.js backend, you need to create a **Web Service**.

### Steps:
1. Go to your Render dashboard
2. Click **"New +"** button
3. Select **"Web Service"** (NOT Static Site)
4. Connect your GitHub repository

---

## 📋 Render Web Service Configuration

### Basic Settings:

**Name:**
```
ecell-backend
```
or
```
nst-ecell-api
```

**Region:**
```
Singapore (closest to India)
```
or
```
Oregon (US West)
```

**Branch:**
```
main
```
(or your main branch name)

**Root Directory:**
```
server
```

**Runtime:**
```
Node
```

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma migrate deploy
```

**Start Command:**
```bash
node server/app.js
```

**Plan:**
```
Free (for testing)
```
or
```
Starter ($7/month) - recommended for production
```

---

## 🔐 Environment Variables

Add ALL these environment variables in Render's Environment Variables section:

### Required Variables:

```
PORT=10000
```
(Render automatically sets PORT, but set this as fallback)

```
NODE_ENV=production
```

```
DATABASE_URL=mysql://root:hhevSqlEfypnYEapGYeVTdIRRMRmnmfv@hopper.proxy.rlwy.net:34194/railway
```
(Your existing Railway MySQL connection string)

```
JWT_SECRET=f7ac68893192f58bf96687095ddbf974f3c49ec904fc98a4f957e532d9765c9e
```

```
JWT_EXPIRE=7d
```

```
EMAIL_HOST=smtp.gmail.com
```

```
EMAIL_PORT=587
```

```
EMAIL_USER=vanshdagar2705@gmail.com
```

```
EMAIL_PASSWORD=smwababgzopnaafw
```

```
FRONTEND_URL=https://your-frontend-domain.com
```
(Update this with your frontend URL once deployed)

---

## 🚀 Additional Setup

### 1. Update package.json (if needed)

Make sure your root `package.json` has a production start script:

```json
{
  "scripts": {
    "start": "node server/app.js"
  }
}
```

### 2. Prisma Setup

Render will run:
- `npx prisma generate` - Generates Prisma Client
- `npx prisma migrate deploy` - Applies migrations to production database

### 3. CORS Configuration

Make sure your backend allows requests from your frontend domain. You may need to update CORS settings in `server/app.js` if you have any.

---

## 📝 Quick Checklist

- [ ] Created **Web Service** (not Static Site)
- [ ] Connected GitHub repository
- [ ] Set Root Directory: `server`
- [ ] Set Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Set Start Command: `node server/app.js`
- [ ] Added all environment variables
- [ ] Selected appropriate plan (Free or Starter)
- [ ] Clicked "Create Web Service"

---

## 🔗 After Deployment

1. **Get your backend URL**: Render will give you a URL like `https://ecell-backend.onrender.com`

2. **Update frontend**: Update your frontend `.env` or environment variables:
   ```
   VITE_API_URL=https://ecell-backend.onrender.com
   ```

3. **Test the API**: Visit `https://ecell-backend.onrender.com/api` to verify it's running

---

## ⚡ Important Notes

- **Free tier**: Services spin down after 15 minutes of inactivity (first request will be slow)
- **Database**: Your Railway MySQL database should work fine from Render
- **Email**: Gmail SMTP should work, but consider using a service like SendGrid for production
- **Logs**: Check Render logs if deployment fails

---

## 🆘 Troubleshooting

**Build fails?**
- Check Render logs
- Ensure all dependencies are in `package.json`
- Verify Prisma schema is correct

**Database connection fails?**
- Verify `DATABASE_URL` is correct
- Check if Railway database allows external connections
- Ensure database is running

**Server crashes?**
- Check Render logs
- Verify all environment variables are set
- Test locally with same environment variables

