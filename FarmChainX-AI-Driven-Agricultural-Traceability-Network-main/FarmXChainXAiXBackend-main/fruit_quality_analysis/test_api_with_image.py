"""
Test script to verify the API with a sample fruit image.

This script demonstrates how to use the API to analyze a fruit image
and display the results in a user-friendly format.
"""
import os
import sys
import requests
from pathlib import Path

def print_analysis_result(result):
    """Print the analysis result in a user-friendly format."""
    print("\n" + "="*60)
    print("FRUIT QUALITY ANALYSIS REPORT".center(60))
    print("="*60)
    
    # Basic information
    print(f"\n{'Fruit Type:':<20} {result.get('fruit_type')}")
    print(f"{'Confidence:':<20} {result.get('confidence')}")
    print(f"{'Freshness:':<20} {result.get('freshness')}")
    print(f"{'Ripeness:':<20} {result.get('ripeness')}")
    print(f"{'Shelf Life:':<20} {result.get('shelf_life_days')} days")
    print(f"{'Overall Condition:':<20} {result.get('overall_condition')}")
    
    # Recommendations
    print("\nRECOMMENDATIONS:")
    print("-" * 60)
    for i, rec in enumerate(result.get('recommendations', []), 1):
        print(f"{i}. {rec}")
    
    print("\n" + "="*60 + "\n")

def test_api_with_image(api_url, image_path):
    """Test the API with a sample image."""
    try:
        # Check if image exists
        if not os.path.exists(image_path):
            print(f"Error: Image file not found at {image_path}")
            return False
        
        # Prepare the request
        with open(image_path, 'rb') as img:
            files = {'file': (os.path.basename(image_path), img, 'image/jpeg')}
            
            # Send the request
            print(f"Sending request to {api_url}...")
            response = requests.post(api_url, files=files)
            
            # Handle the response
            if response.status_code == 200:
                result = response.json()
                print_analysis_result(result)
                return True
            else:
                print(f"Error: {response.status_code} - {response.text}")
                return False
                
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return False

if __name__ == "__main__":
    # API endpoint
    API_URL = "http://localhost:8000/analyze"
    
    # Check if an image path was provided as a command-line argument
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
    else:
        # Default to a sample image if no path is provided
        image_path = "data/raw/sample.jpg"
        
        # Create a sample image if it doesn't exist
        if not os.path.exists(image_path):
            os.makedirs(os.path.dirname(image_path), exist_ok=True)
            print(f"No image provided and {image_path} not found.")
            print("Please provide a path to a fruit image as a command-line argument.")
            print("Example: python test_api_with_image.py path/to/your/fruit.jpg")
            sys.exit(1)
    
    print("Fruit Quality Analysis - API Test")
    print("=" * 50)
    print(f"Testing with image: {image_path}")
    
    # Run the test
    success = test_api_with_image(API_URL, image_path)
    
    if success:
        print("Test completed successfully!")
        print("You can also access the interactive API documentation at:")
        print("http://localhost:8000/docs")
    else:
        print("Test failed. Please check the error message above.")
