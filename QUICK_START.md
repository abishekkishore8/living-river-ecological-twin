# Quick Start - Deploy to GitHub & Vercel

## ⚡ Quick Steps

### 1. Configure Git (if not already done)
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. Create First Commit
```bash
git commit -m "Initial commit: Living Ganga Ecological Digital Twin Portal"
```

### 3. Create GitHub Repository
1. Go to [github.com](https://github.com) → Click "+" → "New repository"
2. Name it (e.g., `living-ganga-ecological-twin`)
3. Choose Public or Private
4. **DO NOT** initialize with README/gitignore (we already have these)
5. Click "Create repository"

### 4. Push to GitHub
```bash
# Replace YOUR_USERNAME and REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

**Note:** If prompted for password, use a GitHub Personal Access Token (not your password)
- Get token: GitHub Settings → Developer settings → Personal access tokens → Generate new token

### 5. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project" → "Import Project"
3. Select your GitHub repository
4. Click "Deploy" (settings are auto-detected from `vercel.json`)
5. Wait for deployment (~2-3 minutes)
6. Click "Visit" to see your live site! 🚀

---

**For detailed instructions, see `DEPLOYMENT_GUIDE.md`**
