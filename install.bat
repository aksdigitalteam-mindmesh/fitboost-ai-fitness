@echo off
echo Installing FitBoost AI Fitness App...
echo.

echo Installing dependencies...
npm install

echo.
echo Creating environment file...
if not exist .env.local (
    echo # Genkit AI API Key (optional - app works without it using mock data) > .env.local
    echo GENKIT_API_KEY=your_actual_genkit_api_key_here >> .env.local
    echo. >> .env.local
    echo # AdMob Configuration >> .env.local
    echo NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-yourappid~id >> .env.local
    echo NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-yourbannerid >> .env.local
    echo NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-yourinterstitialid >> .env.local
    echo Environment file created! Edit .env.local with your API keys.
) else (
    echo Environment file already exists.
)

echo.
echo ========================================
echo SETUP OPTIONS:
echo ========================================
echo 1. Run as Web App (Development)
echo 2. Build for Web App (Production)
echo 3. Setup Android Development
echo 4. Build Android App
echo ========================================
echo.

set /p choice="Choose an option (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting development server...
    echo Open http://localhost:3000 in your browser
    echo.
    npm run dev
) else if "%choice%"=="2" (
    echo.
    echo Building for web production...
    npm run web:build
    echo.
    echo Starting production server...
    echo Open http://localhost:3000 in your browser
    npm run web:serve
) else if "%choice%"=="3" (
    echo.
    echo Setting up Android development...
    echo.
    echo First, make sure you have Android Studio installed!
    echo Download from: https://developer.android.com/studio
    echo.
    echo Initializing Capacitor Android project...
    npx cap add android
    echo.
    echo Syncing web assets to Android...
    npm run android:build
    echo.
    echo Opening Android Studio...
    echo Build and run your app from Android Studio!
    npx cap open android
) else if "%choice%"=="4" (
    echo.
    echo Building Android app...
    npm run android:build
    echo.
    echo Opening Android Studio for final build...
    echo In Android Studio, click "Build" then "Build Bundle(s) / APK(s)"
    npx cap open android
) else (
    echo Invalid choice. Please run the script again.
)
