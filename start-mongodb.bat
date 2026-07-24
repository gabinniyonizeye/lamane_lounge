@echo off
REM Start MongoDB Server
REM MongoDB is installed at: C:\Program Files\MongoDB\Server\8.2

echo.
echo ========================================
echo   STARTING MONGODB SERVER
echo ========================================
echo.

REM Start MongoDB
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe"

REM Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start MongoDB
    pause
)
