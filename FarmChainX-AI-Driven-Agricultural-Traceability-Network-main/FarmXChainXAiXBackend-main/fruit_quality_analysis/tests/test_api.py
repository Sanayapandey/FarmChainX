import os
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "healthy"

def test_analyze_invalid_file():
    """Test analysis with invalid file type"""
    # Create a temporary text file
    with open("test.txt", "w") as f:
        f.write("This is not an image")
    
    with open("test.txt", "rb") as f:
        response = client.post("/analyze", files={"file": ("test.txt", f, "text/plain")})
    
    # Clean up
    if os.path.exists("test.txt"):
        os.remove("test.txt")
    
    assert response.status_code == 400
    assert "detail" in response.json()
    assert "must be an image" in response.json()["detail"]

# Note: To test with actual images, you would need to add test images to the test directory
# and write additional test cases. This is left as an exercise for the user.
