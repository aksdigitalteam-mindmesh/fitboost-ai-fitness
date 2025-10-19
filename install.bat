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
    echo. >> .env.local
    echo # OpenAI API Key (add your key below) >> .env.local
    echo OPENAI_API_KEY= >> .env.local
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
echo 5. Add / Update OpenAI API key (writes to .env.local)
echo 6. Test OpenAI API key (installs test deps and runs a quick request)
echo ========================================
echo.

set /p choice="Choose an option (1-6): "

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
) else if "%choice%"=="5" (
    echo.
    echo Add / Update OpenAI API key in .env.local
    echo NOTE: Do not share this key publicly.
    set /p OPENAI_KEY="Enter your OpenAI API key: "
    if "%OPENAI_KEY%"=="" (
        echo No key entered. Aborting.
    ) else (
        REM Remove any existing OPENAI_API_KEY lines and append new one
        if exist .env.local (
            findstr /v /b "OPENAI_API_KEY=" .env.local > .env.local.tmp 2>nul || type nul > .env.local.tmp
            echo OPENAI_API_KEY=%OPENAI_KEY%>> .env.local.tmp
            move /Y .env.local.tmp .env.local >nul
        ) else (
            echo OPENAI_API_KEY=%OPENAI_KEY% > .env.local
        )
        echo OPENAI_API_KEY updated in .env.local
    )
) else if "%choice%"=="6" (
    echo.
    echo Testing OpenAI API key (this will install small test deps: openai + dotenv)
    echo Make sure you have Node installed.
    echo.

    REM install test dependencies locally (adds openai and dotenv)
    npm install openai dotenv --save-dev

    REM create a simple test script that loads .env.local and makes a request
    (
    echo const fs = require('fs');
    echo require('dotenv').config({ path: '.env.local' });
    echo (async () => {
    echo   try {
    echo     const OpenAI = require('openai');
    echo     const key = process.env.OPENAI_API_KEY;
    echo     if (!key) { console.error('Missing OPENAI_API_KEY in .env.local'); process.exit(2); }
    echo     const client = new OpenAI({ apiKey: key });
    echo     const res = await client.responses.create({
    echo       model: 'gpt-3.5-turbo',
    echo       input: 'Say hello in one short sentence.'
    echo     });
    echo     console.log('Upstream status OK. Example output snippet:');
    echo     try { console.log(JSON.stringify(res).slice(0,1000)); } catch(e){ console.log(res); }
    echo   } catch (err) {
    echo     console.error('Request failed:', err && err.message ? err.message : err);
    echo     process.exit(1);
    echo   }
    echo })();
    ) > .openai-test.js

    echo Running test script...
    node .openai-test.js
    echo.
    echo Test complete. Remove .openai-test.js if desired.
) else (
    echo Invalid choice. Please run the script again.
)
