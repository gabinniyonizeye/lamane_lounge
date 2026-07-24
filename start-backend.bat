@echo off
REM Start Backend Server for LAMANE Bakery & Coffee

echo.
echo ========================================
echo LAMANE Bakery & Coffee - Backend Server
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found!
    echo Please run this script from the project root directory.
    echo Expected: d:\my_website\LAMANE project\lamane_bakery_coffee
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo Error: npm install failed!
        pause
        exit /b 1
    )
)

REM Check if .env exists
if not exist ".env" (
    echo Error: .env file not found!
    echo Please create .env file with MongoDB configuration.
    pause
    exit /b 1
)

echo.
echo Prerequisites:
echo - MongoDB must be running on localhost:27017
echo - .env file is configured
echo.

REM Start the backend server
echo Starting backend server...
echo.
call npm run dev:server

pause
