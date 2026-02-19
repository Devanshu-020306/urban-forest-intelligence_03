@echo off
echo ========================================================
echo Urban Forest Intelligence - GitHub + Vercel Deployment
echo ========================================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed. Please install Git first.
    pause
    exit /b 1
)

echo [OK] Git found
echo.

REM Initialize git if not already initialized
if not exist .git (
    echo [INIT] Initializing Git repository...
    git init
    echo [OK] Git initialized
) else (
    echo [OK] Git already initialized
)

echo.

REM Add all files
echo [ADD] Adding files to Git...
git add .
echo [OK] Files added

echo.

REM Commit
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" (
    set commit_msg=Update: Urban Forest Intelligence System
)

git commit -m "%commit_msg%"
echo [OK] Changes committed

echo.

REM Check if remote exists
git remote | findstr "origin" >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Remote 'origin' already exists
    echo.
    echo [PUSH] Pushing to GitHub...
    git push
) else (
    echo [SETUP] Setting up GitHub remote...
    echo.
    set /p github_user="Enter your GitHub username: "
    set /p repo_name="Enter repository name (default: urban-forest-intelligence): "
    
    if "%repo_name%"=="" (
        set repo_name=urban-forest-intelligence
    )
    
    git remote add origin https://github.com/%github_user%/%repo_name%.git
    git branch -M main
    
    echo.
    echo [PUSH] Pushing to GitHub...
    git push -u origin main
)

echo.
echo [OK] Code pushed to GitHub!
echo.

REM Ask about Vercel deployment
set /p deploy_vercel="Deploy to Vercel now? (y/n): "

if /i "%deploy_vercel%"=="y" (
    echo.
    echo [DEPLOY] Deploying to Vercel...
    
    REM Check if vercel is installed
    where vercel >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo [INSTALL] Installing Vercel CLI...
        call npm install -g vercel
    )
    
    cd standalone
    call vercel --prod
    
    echo.
    echo [OK] Deployed to Vercel!
) else (
    echo.
    echo [INFO] To deploy to Vercel later, run:
    echo        cd standalone ^&^& vercel --prod
)

echo.
echo [DONE] Deployment Complete!
echo.
echo [NEXT] Next Steps:
echo 1. Go to: https://vercel.com/dashboard
echo 2. Import your GitHub repository
echo 3. Configure root directory: standalone
echo 4. Deploy!
echo.
echo [URL] Your app will be live at:
echo       https://urban-forest-intelligence.vercel.app
echo.
echo [MOBILE] Install on mobile:
echo          Android: Chrome -^> Install
echo          iOS: Safari -^> Add to Home Screen
echo.
pause
