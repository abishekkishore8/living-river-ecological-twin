# Deployment Guide - Living River Ecological Digital Twin

This guide will walk you through deploying your project to GitHub and then to Vercel.

## Step 1: Configure Git (One-time setup)

If you haven't configured Git before, run these commands with your information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Or for this repository only (without --global):

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Create Initial Commit

Git is already initialized. Create your first commit:

```bash
git add .
git commit -m "Initial commit: Living River Ecological Digital Twin Portal"
```

## Step 3: Create GitHub Repository

1. **Go to GitHub:**
   - Visit [github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository:**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `living-ganga-ecological-twin` (or your preferred name)
   - Description: "Advanced GIS & Biodiversity Intelligence Platform for Namami Gange"
   - Choose **Public** or **Private** (recommended for private project)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

## Step 4: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
If your username is `johndoe` and repo name is `living-ganga-ecological-twin`:
```bash
git remote add origin https://github.com/johndoe/living-ganga-ecological-twin.git
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub credentials. Use a Personal Access Token (not password).

## Step 5: Deploy to Vercel

### 5.1 Create Vercel Account (if needed)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (recommended for easier setup)

### 5.2 Import Project

1. Once logged in, click **"Add New Project"** or **"Import Project"**
2. You'll see a list of your GitHub repositories
3. Find your repository (`living-ganga-ecological-twin` or whatever you named it)
4. Click **"Import"**

### 5.3 Configure Project

Vercel will auto-detect your Vite configuration:
- **Framework Preset:** Vite (should be auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` (should be auto-filled)
- **Output Directory:** `dist` (should be auto-filled)
- **Install Command:** `npm install` (should be auto-filled)

The `vercel.json` file is already configured, so you can click **"Deploy"** directly!

### 5.4 Wait for Deployment

- Vercel will install dependencies
- Build your project
- Deploy it to a URL like: `https://your-project-name.vercel.app`

### 5.5 Verify Deployment

1. Once deployment completes, click **"Visit"** to see your live site
2. Test all features:
   - Hero section with Three.js scene
   - Navigation
   - GIS Dashboard
   - Data widgets

## Step 6: Future Updates

For future updates:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically detect the push and redeploy your site!

## Troubleshooting

### If you get authentication errors when pushing to GitHub:

1. **Use Personal Access Token instead of password:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
   - Use this token as your password when pushing

### If Vercel deployment fails:

1. **Check build logs:**
   - Go to your project in Vercel
   - Click on the failed deployment
   - Review the build logs for errors

2. **Common issues:**
   - Make sure `vercel.json` is correct
   - Ensure `dist` is in `.gitignore` (it is)
   - Check that all dependencies are in `package.json`

### If you need to update Vercel settings:

1. Go to your project in Vercel
2. Click "Settings"
3. Update build settings if needed
4. The `vercel.json` file should handle most settings automatically

## What's Already Configured

✅ **Git initialized** - Repository ready  
✅ **.gitignore** - Proper exclusions (node_modules, dist, etc.)  
✅ **vercel.json** - Optimal Vercel configuration  
✅ **Build configuration** - Vite configured for production  
✅ **TypeScript** - Type checking enabled  
✅ **All dependencies** - Installed and ready  

## Next Steps After Deployment

1. **Custom Domain (Optional):**
   - Go to Vercel project settings
   - Add your custom domain

2. **Environment Variables (if needed):**
   - Add any API keys or secrets in Vercel project settings
   - Under "Environment Variables"

3. **Analytics (Optional):**
   - Enable Vercel Analytics for insights

## Support

If you encounter any issues:
- Check Vercel documentation: https://vercel.com/docs
- Check Vite documentation: https://vitejs.dev
- Review build logs in Vercel dashboard

---

**Your project is ready for deployment!** 🚀
