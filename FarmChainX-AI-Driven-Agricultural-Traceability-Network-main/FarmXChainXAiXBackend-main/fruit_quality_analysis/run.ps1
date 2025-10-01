# PowerShell script to run the Fruit Quality Analysis System

# Display header
Write-Host "Fruit Quality Analysis System" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Error: Virtual environment not found. Please run .\init_env.ps1 first." -ForegroundColor Red
    exit 1
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\activate

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item -Path ".env.example" -Destination ".env" -Force
        Write-Host "Created .env file. Please update it with your configuration." -ForegroundColor Yellow
    } else {
        Write-Host "Error: .env.example file not found. Please create a .env file manually." -ForegroundColor Red
        exit 1
    }
}

# Create data directories if they don't exist
$directories = @("data/raw", "data/processed", "logs")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

# Start the FastAPI server
Write-Host "Starting FastAPI server..." -ForegroundColor Yellow
Write-Host "API will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "API documentation: http://localhost:8000/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Run the application
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
