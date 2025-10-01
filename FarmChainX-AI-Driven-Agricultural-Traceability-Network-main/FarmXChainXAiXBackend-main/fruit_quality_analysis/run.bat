@echo off
REM Run script for Fruit Quality Analysis System

echo Starting Fruit Quality Analysis System...
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Virtual environment not found. Please run setup.bat first.
    pause
    exit /b 1
)

REM Activate virtual environment and run the application
call venv\Scripts\activate
python run.py

if %ERRORLEVEL% NEQ 0 (
    echo Failed to start the application
    pause
    exit /b 1
)
