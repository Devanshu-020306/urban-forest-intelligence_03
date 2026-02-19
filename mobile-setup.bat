@echo off
echo ========================================
echo Urban Forest Mobile App Setup (Windows)
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
echo.

echo Choose mobile app option:
echo 1) PWA (Already ready! Just deploy)
echo 2) Capacitor (Native app with web code)
echo 3) React Native (Full native rewrite)
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo [OK] PWA is already configured!
    echo.
    echo Files ready:
    echo   - standalone/manifest.json
    echo   - standalone/service-worker.js
    echo   - PWA meta tags in index.html
    echo.
    echo [MOBILE] To install on mobile:
    echo   Android: Chrome -^> Menu -^> Install app
    echo   iOS: Safari -^> Share -^> Add to Home Screen
    echo.
    echo [DEPLOY] Deploy options:
    echo   1. GitHub Pages (free^)
    echo   2. Netlify (free^)
    echo   3. Vercel (free^)
    echo.
    echo [QUICK] Quick deploy:
    echo   cd standalone
    echo   python -m http.server 8000
    echo   Open: http://localhost:8000
    echo.
) else if "%choice%"=="2" (
    echo.
    echo [SETUP] Setting up Capacitor...
    echo.
    
    echo Installing Capacitor...
    call npm install @capacitor/core @capacitor/cli
    
    echo Initializing Capacitor...
    call npx cap init "Urban Forest" "com.urbanforest.app" --web-dir=standalone
    
    set /p android="Install Android? (y/n): "
    if /i "%android%"=="y" (
        call npm install @capacitor/android
        call npx cap add android
        echo [OK] Android platform added
    )
    
    set /p ios="Install iOS? (Mac only^) (y/n): "
    if /i "%ios%"=="y" (
        call npm install @capacitor/ios
        call npx cap add ios
        echo [OK] iOS platform added
    )
    
    call npx cap copy
    
    echo.
    echo [OK] Capacitor setup complete!
    echo.
    echo [NEXT] Next steps:
    echo   Android: npx cap open android
    echo   iOS: npx cap open ios
    echo.
    echo [BUILD] Build APK:
    echo   1. npx cap open android
    echo   2. In Android Studio: Build -^> Generate Signed Bundle/APK
    echo.
) else if "%choice%"=="3" (
    echo.
    echo [SETUP] Setting up React Native...
    echo.
    
    set /p projectname="Enter project name (no spaces): "
    
    echo Creating React Native project...
    call npx react-native init %projectname%
    
    cd %projectname%
    
    echo Installing dependencies...
    call npm install @react-navigation/native @react-navigation/stack
    call npm install react-native-screens react-native-safe-area-context
    
    echo.
    echo [OK] React Native project created!
    echo.
    echo [NEXT] Next steps:
    echo   cd %projectname%
    echo   npx react-native run-android
    echo   npx react-native run-ios (Mac only^)
    echo.
    echo [WARNING] Note: You'll need to rewrite components for React Native
    echo.
) else (
    echo Invalid choice
    pause
    exit /b 1
)

echo.
echo [DONE] Setup complete!
echo.
echo [DOCS] Read MOBILE-APP-GUIDE.md for detailed instructions
echo.
pause
