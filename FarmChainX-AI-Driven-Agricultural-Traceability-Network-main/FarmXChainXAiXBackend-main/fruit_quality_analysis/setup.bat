@echo off
REM Setup script for Fruit Quality Analysis System

echo Setting up Fruit Quality Analysis System...
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to create virtual environment
        exit /b 1
    )
)

REM Activate virtual environment and install dependencies
echo Activating virtual environment and installing dependencies...
call venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To start the server, run: run.bat
echo.
