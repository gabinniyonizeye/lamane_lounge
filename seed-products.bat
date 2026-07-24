@echo off
REM Seed Database with Products

echo.
echo ========================================
echo   SEEDING DATABASE WITH PRODUCTS
echo ========================================
echo.

cd /d "d:\my_website\LAMANE project\lamane_bakery_coffee"

echo Connecting to MongoDB and adding products...
echo.

node seed-direct.js

echo.
pause
