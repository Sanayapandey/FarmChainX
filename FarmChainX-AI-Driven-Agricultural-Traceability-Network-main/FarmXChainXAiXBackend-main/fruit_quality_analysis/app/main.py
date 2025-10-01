from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import uvicorn
import os
from datetime import datetime
import uuid

from .models.fruit_analysis import FruitAnalysis, FruitType, AnalysisResult
from .utils.image_processor import process_image
from .utils.analysis import analyze_fruit_quality

app = FastAPI(
    title="Fruit Quality Analysis API",
    description="API for analyzing fruit quality from images",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
UPLOAD_DIR = "data/raw"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze", response_model=AnalysisResult)
async def analyze_fruit_image(file: UploadFile = File(...)):
    """
    Analyze a fruit image and return quality metrics.
    
    Args:
        file: Image file of the fruit to analyze
        
    Returns:
        AnalysisResult: Detailed analysis of the fruit's quality
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Save uploaded file
        file_extension = file.filename.split('.')[-1]
        filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as f:
            f.write(await file.read())
        
        # Process image and analyze
        processed_image = process_image(file_path)
        analysis_result = analyze_fruit_quality(processed_image)
        
        return analysis_result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
