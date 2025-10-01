"""
Run the Fruit Quality Analysis API.

This script starts the FastAPI server for the fruit quality analysis application.
"""
import uvicorn
import os

if __name__ == "__main__":
    # Create data directories if they don't exist
    os.makedirs("data/raw", exist_ok=True)
    os.makedirs("data/processed", exist_ok=True)
    
    # Start the FastAPI server
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1
    )
