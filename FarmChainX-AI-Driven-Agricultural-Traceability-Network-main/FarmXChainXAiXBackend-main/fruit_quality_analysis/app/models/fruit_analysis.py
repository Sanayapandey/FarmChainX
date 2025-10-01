from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field

class FruitType(str, Enum):
    """Supported fruit types for analysis"""
    APPLE = "Apple"
    BANANA = "Banana"
    ORANGE = "Orange"
    MANGO = "Mango"
    GRAPES = "Grapes"
    STRAWBERRY = "Strawberry"
    UNKNOWN = "Unknown"

class ConditionLevel(str, Enum):
    """Condition levels for fruit quality"""
    EXCELLENT = "Excellent"
    GOOD = "Good"
    FAIR = "Fair"
    POOR = "Poor"
    SPOILED = "Spoiled"

class FruitAnalysis(BaseModel):
    """Base model for fruit analysis"""
    fruit_type: FruitType = Field(..., description="Type of the fruit")
    confidence: float = Field(..., ge=0.0, le=100.0, description="Confidence score of the analysis (0-100)")
    freshness: float = Field(..., ge=0.0, le=100.0, description="Freshness percentage (0-100)")
    ripeness: float = Field(..., ge=0.0, le=100.0, description="Ripeness percentage (0-100)")
    shelf_life_days: int = Field(..., ge=0, description="Estimated shelf life in days")
    
    class Config:
        schema_extra = {
            "example": {
                "fruit_type": "Apple",
                "confidence": 92.5,
                "freshness": 97.0,
                "ripeness": 96.0,
                "shelf_life_days": 9
            }
        }

class AnalysisResult(FruitAnalysis):
    """Extended model with recommendations and overall condition"""
    overall_condition: ConditionLevel = Field(..., description="Overall condition assessment")
    recommendations: List[str] = Field(..., description="Actionable recommendations")
    
    class Config:
        schema_extra = {
            "example": {
                "fruit_type": "Apple",
                "confidence": 92.5,
                "freshness": 97.0,
                "ripeness": 96.0,
                "shelf_life_days": 9,
                "overall_condition": "Excellent",
                "recommendations": [
                    "Premium quality - perfect for high-end markets",
                    "Store in optimal conditions to maintain quality",
                    "Perfect for fresh consumption and export",
                    "Consider premium pricing strategy"
                ]
            }
        }

    def format_response(self) -> dict:
        """Format the response with percentage strings"""
        result = self.dict()
        result["confidence"] = f"{int(round(self.confidence))}%"
        result["freshness"] = f"{int(round(self.freshness))}%"
        result["ripeness"] = f"{int(round(self.ripeness))}%"
        return result
