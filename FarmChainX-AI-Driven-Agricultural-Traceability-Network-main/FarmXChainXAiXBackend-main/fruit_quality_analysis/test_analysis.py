"""
Test script to verify the functionality of the FruitQualityAnalyzer class.
"""
import sys
import os
import cv2
import numpy as np
from app.utils.analysis import FruitQualityAnalyzer
from app.models.fruit_analysis import FruitType

def test_analyzer_with_sample_data():
    """Test the FruitQualityAnalyzer with sample data."""
    print("Testing FruitQualityAnalyzer with sample data...")
    
    # Create a sample image data dictionary
    # In a real scenario, this would come from process_image()
    sample_image_data = {
        'original_image': np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8),
        'processed_image': np.random.random((1, 224, 224, 3)).astype('float32'),
        'color_histogram': np.random.random(768).astype('float32'),
        'image_path': 'sample_image.jpg'
    }
    
    # Initialize and run the analyzer
    analyzer = FruitQualityAnalyzer()
    result = analyzer.analyze(sample_image_data)
    
    # Print results
    print("\nTest Results:")
    print("-" * 50)
    print(f"Fruit Type: {result.fruit_type}")
    print(f"Confidence: {result.confidence:.1f}%")
    print(f"Freshness: {result.freshness:.1f}%")
    print(f"Ripeness: {result.ripeness:.1f}%")
    print(f"Shelf Life: {result.shelf_life_days} days")
    print(f"Overall Condition: {result.overall_condition}")
    print("\nRecommendations:")
    for i, rec in enumerate(result.recommendations, 1):
        print(f"{i}. {rec}")
    print("-" * 50)

def test_all_fruit_types():
    """Test the analyzer with all supported fruit types."""
    print("\nTesting all supported fruit types...")
    
    # Create a sample analyzer
    analyzer = FruitQualityAnalyzer()
    
    # Test each fruit type
    for fruit in FruitType:
        if fruit == FruitType.UNKNOWN:
            continue
            
        print(f"\nTesting {fruit.value}...")
        
        # Create sample data with the specific fruit type
        sample_data = {
            'original_image': np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8),
            'processed_image': np.random.random((1, 224, 224, 3)).astype('float32'),
            'color_histogram': np.random.random(768).astype('float32'),
            'image_path': f'sample_{fruit.value.lower()}.jpg'
        }
        
        # Override the fruit type detection for testing
        analyzer.fruit_type = fruit
        
        # Run analysis
        result = analyzer.analyze(sample_data)
        
        # Print summary
        print(f"  - Freshness: {result.freshness:.1f}%")
        print(f"  - Ripeness: {result.ripeness:.1f}%")
        print(f"  - Shelf Life: {result.shelf_life_days} days")
        print(f"  - Condition: {result.overall_condition}")

if __name__ == "__main__":
    print("Fruit Quality Analysis - Test Script")
    print("=" * 50)
    
    # Run tests
    test_analyzer_with_sample_data()
    test_all_fruit_types()
    
    print("\nAll tests completed!")
