# 🚀 Netlify Deployment Guide

## Deploy Your Urban Forest App to Netlify (FREE!)

---

## 🎯 Method 1: Drag & Drop (EASIEST - 2 Minutes!)

### Step 1: Prepare Files
1. Open your project folder
2. Go to `standalone` folder
3. That's it! This folder has everything

### Step 2: Deploy
1. Go to **https://app.netlify.com/drop**
2. **Drag the `standalone` folder** onto the page
3. Wait 10-30 seconds
4. **Done!** You get a live URL! 🎉

### Step 3: Get Your URL
```
Your app is live at:
https://random-name-123456.netlify.app
```

### Step 4: Test on Mobile
1. Open URL on your phone
2. Install as PWA
3. Test camera feature!

---

## 🎯 Method 2: Netlify CLI (Advanced)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```
Browser opens → Login with GitHub/Email

### Step 3: Deploy
```bash
cd standalone
netlify deploy
```

### Step 4: Choose Options
```
? What would you like to do? 
  > Create & configure a new site

? Team: 
  > Your Name's team

? Site name (optional): 
  > urban-forest-app (or leave blank)

? Publish directory: 
  > . (current directory)
```

### Step 5: Deploy to Production
```bash
netlify deploy --prod
```

### Your URL:
```
https://urban-forest-app.netlify.app
```

---

## 🎯 Method 3: GitHub Integration (Best for Updates)

### Step 1: Push to GitHub
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Urban Forest App ready"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/urban-forest.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to **https://app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Configure:
   ```
   Base directory: standalone
   Build command: (leave empty)
   Publish directory: .
   ```
6. Click **"Deploy site"**

### Step 3: Auto-Deploy
Now every time you push to GitHub:
```bash
git add .
git commit -m "Update"
git push
```
Netlify automatically deploys! 🎉

---

## ⚙️ Netlify Configuration

### Create `netlify.toml` in `standalone` folder:

<function_calls>
<invoke name="fsWrite">
<parameter name="path">standalone/netlify.tomletlify Configuration
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/service-worker.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Content-Type = "application/manifest+json"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
