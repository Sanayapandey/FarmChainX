"""
Test cases for the Fruit Quality Analysis API endpoints.
"""
import os
import pytest
import requests
from fastapi.testclient import TestClient
from app.main import app
from pathlib import Path

# Create a test client
client = TestClient(app)

# Test data directory
TEST_DATA_DIR = Path(__file__).parent / "test_data"

# Ensure test data directory exists
TEST_DATA_DIR.mkdir(parents=True, exist_ok=True)

# Sample test image paths
TEST_IMAGES = [
    str(TEST_DATA_DIR / "apple.jpg"),
    str(TEST_DATA_DIR / "banana.jpg"),
    str(TEST_DATA_DIR / "orange.jpg"),
]

# Create test images if they don't exist
if not all(Path(img).exists() for img in TEST_IMAGES):
    # Import and run the create_test_image script
    import sys
    sys.path.append(str(Path(__file__).parent.parent))
    from tests.create_test_image import create_test_image
    
    create_test_image(str(TEST_DATA_DIR / "apple.jpg"), color=(0, 165, 255), text="Apple")
    create_test_image(str(TEST_DATA_DIR / "banana.jpg"), color=(0, 255, 255), text="Banana")
    create_test_image(str(TEST_DATA_DIR / "orange.jpg"), color=(0, 165, 255), text="Orange")

def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] == "healthy"
    assert "timestamp" in data

def test_analyze_endpoint():
    """Test the analyze endpoint with a valid image."""
    # Test with each test image
    for image_path in TEST_IMAGES:
        with open(image_path, "rb") as img:
            files = {"file": ("test.jpg", img, "image/jpeg")}
            response = client.post("/analyze", files=files)
            
            assert response.status_code == 200
            data = response.json()
            
            # Check response structure
            assert "fruit_type" in data
            assert "confidence" in data
            assert "freshness" in data
            assert "ripeness" in data
            assert "shelf_life_days" in data
            assert "overall_condition" in data
            assert "recommendations" in data
            
            # Check value ranges
            assert data["confidence"].endswith("%")
            assert data["freshness"].endswith("%")
            assert data["ripeness"].endswith("%")
            assert isinstance(data["shelf_life_days"], int)
            assert data["shelf_life_days"] >= 0
            assert isinstance(data["recommendations"], list)
            assert len(data["recommendations"]) > 0

def test_analyze_invalid_file():
    """Test the analyze endpoint with an invalid file."""
    # Create a temporary text file
    test_file = TEST_DATA_DIR / "invalid.txt"
    with open(test_file, "w") as f:
        f.write("This is not an image")
    
    with open(test_file, "rb") as f:
        files = {"file": ("test.txt", f, "text/plain")}
        response = client.post("/analyze", files=files)
        
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        assert "must be an image" in data["detail"].lower()
    
    # Clean up
    if test_file.exists():
        test_file.unlink()

def test_analyze_no_file():
    """Test the analyze endpoint with no file provided."""
    response = client.post("/analyze")
    assert response.status_code == 422  # Validation error
    data = response.json()
    assert "detail" in data

def test_nonexistent_endpoint():
    """Test a non-existent endpoint."""
    response = client.get("/nonexistent")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert "not found" in data["detail"].lower()

# Run the tests
if __name__ == "__main__":
    pytest.main([__file__, "-v"])
