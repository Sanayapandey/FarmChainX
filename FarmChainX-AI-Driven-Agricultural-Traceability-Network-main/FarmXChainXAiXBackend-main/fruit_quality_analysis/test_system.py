"""
System test script for Fruit Quality Analysis.

This script tests the end-to-end functionality of the system.
"""
import os
import sys
import numpy as np
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent))

from app.utils.image_processor import ImageProcessor
from app.utils.analysis import FruitQualityAnalyzer
from app.models.fruit_analysis import FruitType

def test_system():
    """Test the entire system with sample data."""
    print("Fruit Quality Analysis - System Test")
    print("=" * 60)
    
    # Create a sample image (random noise for testing)
    print("\n1. Creating sample image...")
    sample_image = np.random.randint(0, 255, (500, 500, 3), dtype=np.uint8)
    
    # Save the sample image
    os.makedirs("data/raw", exist_ok=True)
    sample_path = "data/raw/test_sample.jpg"
    import cv2
    cv2.imwrite(sample_path, sample_image)
    print(f"Sample image saved to: {sample_path}")
    
    # Test image processing
    print("\n2. Testing image processing...")
    try:
        processor = ImageProcessor()
        processed = processor.preprocess_for_model(sample_image)
        print(f"Image processed successfully. Shape: {processed.shape}")
        print("✓ Image processing test passed")
    except Exception as e:
        print(f"✗ Image processing test failed: {str(e)}")
        return
    
    # Test analysis
    print("\n3. Testing analysis...")
    try:
        analyzer = FruitQualityAnalyzer()
        sample_data = {
            'original_image': sample_image,
            'processed_image': processed,
            'color_histogram': np.random.random(768).astype('float32'),
            'image_path': sample_path
        }
        
        result = analyzer.analyze(sample_data)
        print(f"Analysis completed for: {result.fruit_type}")
        print(f"- Freshness: {result.freshness:.1f}%")
        print(f"- Ripeness: {result.ripeness:.1f}%")
        print(f"- Shelf Life: {result.shelf_life_days} days")
        print(f"- Condition: {result.overall_condition}")
        print("✓ Analysis test passed")
    except Exception as e:
        print(f"✗ Analysis test failed: {str(e)}")
        return
    
    # Test API endpoint (if server is running)
    print("\n4. Testing API endpoint (if server is running)...")
    try:
        import requests
        from fastapi.testclient import TestClient
        from app.main import app
        
        client = TestClient(app)
        
        # Test health check
        response = client.get("/health")
        print(f"Health check status: {response.status_code}")
        
        # Test image upload
        with open(sample_path, "rb") as img:
            files = {"file": ("test_sample.jpg", img, "image/jpeg")}
            response = client.post("/analyze", files=files)
            
            if response.status_code == 200:
                print("API test successful!")
                print("Response:", response.json())
                print("✓ API test passed")
            else:
                print(f"API test failed with status {response.status_code}")
                print("Make sure the server is running with: python run.py")
    except Exception as e:
        print(f"✗ API test failed: {str(e)}")
        print("Make sure the server is running with: python run.py")
    
    print("\nSystem test completed!")

if __name__ == "__main__":
    test_system()
