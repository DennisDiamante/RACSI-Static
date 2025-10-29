# 🚀 Quick Start Guide - Deploy to GitHub in 5 Minutes

## Prerequisites Checklist
- [ ] GitHub account created
- [ ] Git installed on your computer
- [ ] Project files ready

---

## 🎯 Super Quick Deployment (Copy-Paste These Commands)

### **Step 1: Create GitHub Repo**
Go to https://github.com/new and create a repository named `radians-automation-website` (keep it **Private**)

### **Step 2: Run These Commands**

```bash
# Navigate to your project
cd /home/ubuntu/radians_automation_website/nextjs_space

# Initialize Git
git init

# Configure Git (replace with your info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Radians Automation website with admin CMS"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/radians-automation-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 3: Deploy to Vercel (Easiest Option)**

1. Go to https://vercel.com and sign up with GitHub
2. Click "New Project" → Import your repository
3. Set **Root Directory** to `nextjs_space`
4. Add these environment variables:
   ```
   DATABASE_URL=your-database-url
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-domain.vercel.app
   AWS_BUCKET_NAME=your-bucket-name
   AWS_FOLDER_PREFIX=radians-automation/
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   ```
5. Click "Deploy"
6. Done! ✅

---

## 📝 Future Updates

To update your deployed site:

```bash
# Make your changes, then:
git add .
git commit -m "Your update description"
git push origin main
```

Vercel will automatically redeploy! 🎉

---

## 🆘 Common Issues

**"Permission denied"**: Use a GitHub Personal Access Token instead of your password
- Create one at: https://github.com/settings/tokens

**"Build failed"**: Check that all environment variables are set in Vercel

**"Database error"**: Verify your DATABASE_URL is correct

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
