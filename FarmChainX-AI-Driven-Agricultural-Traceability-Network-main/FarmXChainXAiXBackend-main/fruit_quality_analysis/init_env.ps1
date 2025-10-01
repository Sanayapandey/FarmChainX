# PowerShell script to initialize the Fruit Quality Analysis System environment

# Display header
Write-Host "Fruit Quality Analysis System - Environment Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "Found Python: $pythonVersion" -ForegroundColor Green

# Check if virtual environment exists, create if not
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to create virtual environment" -ForegroundColor Red
        exit 1
    }
    Write-Host "Virtual environment created successfully" -ForegroundColor Green
} else {
    Write-Host "Virtual environment already exists" -ForegroundColor Green
}

# Activate virtual environment and install dependencies
Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
.\venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "`nCreating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item -Path ".env.example" -Destination ".env" -Force
    Write-Host "Created .env file. Please update it with your configuration." -ForegroundColor Yellow
}

# Create data directories if they don't exist
$directories = @("data/raw", "data/processed", "logs")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# Display completion message
Write-Host "`nEnvironment setup completed successfully!" -ForegroundColor Green
Write-Host "To start the application, run: .\run.ps1" -ForegroundColor Cyan
Write-Host ""

# Keep the window open
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
