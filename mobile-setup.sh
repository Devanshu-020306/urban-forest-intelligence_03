#!/bin/bash

echo "🚀 Urban Forest Mobile App Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Ask user which option they want
echo "Choose mobile app option:"
echo "1) PWA (Already ready! Just deploy)"
echo "2) Capacitor (Native app with web code)"
echo "3) React Native (Full native rewrite)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "✅ PWA is already configured!"
        echo ""
        echo "Files ready:"
        echo "  - standalone/manifest.json"
        echo "  - standalone/service-worker.js"
        echo "  - PWA meta tags in index.html"
        echo ""
        echo "📱 To install on mobile:"
        echo "  Android: Chrome → Menu → Install app"
        echo "  iOS: Safari → Share → Add to Home Screen"
        echo ""
        echo "🌐 Deploy options:"
        echo "  1. GitHub Pages (free)"
        echo "  2. Netlify (free)"
        echo "  3. Vercel (free)"
        echo ""
        echo "🚀 Quick deploy:"
        echo "  cd standalone"
        echo "  python -m http.server 8000"
        echo "  Open: http://localhost:8000"
        ;;
        
    2)
        echo ""
        echo "📦 Setting up Capacitor..."
        echo ""
        
        # Install Capacitor
        echo "Installing Capacitor..."
        npm install @capacitor/core @capacitor/cli
        
        # Initialize Capacitor
        echo "Initializing Capacitor..."
        npx cap init "Urban Forest" "com.urbanforest.app" --web-dir=standalone
        
        # Install platforms
        read -p "Install Android? (y/n): " android
        if [ "$android" = "y" ]; then
            npm install @capacitor/android
            npx cap add android
            echo "✅ Android platform added"
        fi
        
        read -p "Install iOS? (Mac only) (y/n): " ios
        if [ "$ios" = "y" ]; then
            npm install @capacitor/ios
            npx cap add ios
            echo "✅ iOS platform added"
        fi
        
        # Copy files
        npx cap copy
        
        echo ""
        echo "✅ Capacitor setup complete!"
        echo ""
        echo "📱 Next steps:"
        echo "  Android: npx cap open android"
        echo "  iOS: npx cap open ios"
        echo ""
        echo "🔧 Build APK:"
        echo "  1. npx cap open android"
        echo "  2. In Android Studio: Build → Generate Signed Bundle/APK"
        ;;
        
    3)
        echo ""
        echo "⚛️ Setting up React Native..."
        echo ""
        
        read -p "Enter project name (no spaces): " projectname
        
        echo "Creating React Native project..."
        npx react-native init $projectname
        
        cd $projectname
        
        echo "Installing dependencies..."
        npm install @react-navigation/native @react-navigation/stack
        npm install react-native-screens react-native-safe-area-context
        
        echo ""
        echo "✅ React Native project created!"
        echo ""
        echo "📱 Next steps:"
        echo "  cd $projectname"
        echo "  npx react-native run-android"
        echo "  npx react-native run-ios (Mac only)"
        echo ""
        echo "⚠️ Note: You'll need to rewrite components for React Native"
        ;;
        
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📚 Read MOBILE-APP-GUIDE.md for detailed instructions"
