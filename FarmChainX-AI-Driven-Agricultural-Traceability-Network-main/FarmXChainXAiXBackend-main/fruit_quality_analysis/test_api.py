"""
Test script for the Fruit Quality Analysis API.

This script demonstrates how to use the API to analyze a fruit image.
"""
import requests
import os
from pathlib import Path

def test_analysis(api_url, image_path):
    """Test the analysis endpoint with a sample image."""
    try:
        # Check if image exists
        if not os.path.exists(image_path):
            print(f"Error: Image file not found at {image_path}")
            return
        
        # Prepare the request
        with open(image_path, 'rb') as img:
            files = {'file': (os.path.basename(image_path), img, 'image/jpeg')}
            
            # Send the request
            print(f"Sending request to {api_url}...")
            response = requests.post(api_url, files=files)
            
            # Handle the response
            if response.status_code == 200:
                result = response.json()
                print("\nAnalysis Results:")
                print("-" * 50)
                print(f"Fruit Type: {result.get('fruit_type')}")
                print(f"Confidence: {result.get('confidence')}")
                print(f"Freshness: {result.get('freshness')}")
                print(f"Ripeness: {result.get('ripeness')}")
                print(f"Shelf Life: {result.get('shelf_life_days')} days")
                print(f"Overall Condition: {result.get('overall_condition')}")
                print("\nRecommendations:")
                for i, rec in enumerate(result.get('recommendations', []), 1):
                    print(f"{i}. {rec}")
                print("-" * 50)
            else:
                print(f"Error: {response.status_code} - {response.text}")
                
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    # API endpoint
    API_URL = "http://localhost:8000/analyze"
    
    # Path to a sample image (update this to point to a real image file)
    SAMPLE_IMAGE = "data/raw/sample.jpg"
    
    # Check if sample image exists, if not, create a placeholder
    if not os.path.exists(SAMPLE_IMAGE):
        # Create the directory if it doesn't exist
        os.makedirs(os.path.dirname(SAMPLE_IMAGE), exist_ok=True)
        
        # Create a placeholder text file since we can't create an actual image here
        with open(SAMPLE_IMAGE, 'w') as f:
            f.write("This is a placeholder for a sample image.\n")
            f.write("Please replace this file with an actual fruit image for testing.")
        
        print(f"Created placeholder file at {SAMPLE_IMAGE}")
        print("Please replace it with an actual fruit image and run the test again.")
    else:
        # Run the test
        test_analysis(API_URL, SAMPLE_IMAGE)
