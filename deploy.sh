#!/bin/bash

echo "🚀 Urban Forest Intelligence - GitHub + Vercel Deployment"
echo "=========================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✅ Git found"
echo ""

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""

# Add all files
echo "📝 Adding files to Git..."
git add .
echo "✅ Files added"

echo ""

# Commit
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update: Urban Forest Intelligence System"
fi

git commit -m "$commit_msg"
echo "✅ Changes committed"

echo ""

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already exists"
    echo ""
    echo "📤 Pushing to GitHub..."
    git push
else
    echo "🌐 Setting up GitHub remote..."
    echo ""
    read -p "Enter your GitHub username: " github_user
    read -p "Enter repository name (default: urban-forest-intelligence): " repo_name
    
    if [ -z "$repo_name" ]; then
        repo_name="urban-forest-intelligence"
    fi
    
    git remote add origin "https://github.com/$github_user/$repo_name.git"
    git branch -M main
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
fi

echo ""
echo "✅ Code pushed to GitHub!"
echo ""

# Ask about Vercel deployment
read -p "Deploy to Vercel now? (y/n): " deploy_vercel

if [ "$deploy_vercel" = "y" ]; then
    echo ""
    echo "🚀 Deploying to Vercel..."
    
    # Check if vercel is installed
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    cd standalone
    vercel --prod
    
    echo ""
    echo "✅ Deployed to Vercel!"
else
    echo ""
    echo "ℹ️  To deploy to Vercel later, run:"
    echo "   cd standalone && vercel --prod"
fi

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📱 Next Steps:"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Import your GitHub repository"
echo "3. Configure root directory: standalone"
echo "4. Deploy!"
echo ""
echo "🌐 Your app will be live at:"
echo "   https://urban-forest-intelligence.vercel.app"
echo ""
echo "📱 Install on mobile:"
echo "   Android: Chrome → Install"
echo "   iOS: Safari → Add to Home Screen"
echo ""
