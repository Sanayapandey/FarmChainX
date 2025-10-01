"""
Tests for utility functions in the Fruit Quality Analysis System.
"""
import pytest
import numpy as np
from pathlib import Path
from app.utils.image_processor import ImageProcessor
from app.utils.analysis import FruitQualityAnalyzer
from app.models.fruit_analysis import FruitType

class TestImageProcessor:
    """Test cases for the ImageProcessor class."""
    
    def setup_method(self):
        """Set up test fixtures."""
        self.processor = ImageProcessor()
        self.test_image = np.random.randint(0, 255, (500, 500, 3), dtype=np.uint8)
        self.test_image_path = "tests/test_data/test_image.jpg"
        
        # Create test directory if it doesn't exist
        Path("tests/test_data").mkdir(parents=True, exist_ok=True)
        
        # Save test image
        import cv2
        cv2.imwrite(self.test_image_path, self.test_image)
    
    def test_load_image(self):
        """Test loading an image from disk."""
        image = self.processor.load_image(self.test_image_path)
        assert image is not None
        assert image.shape == (500, 500, 3)
    
    def test_resize_image(self):
        """Test image resizing."""
        resized = self.processor.resize_image(self.test_image, (224, 224))
        assert resized.shape == (224, 224, 3)
    
    def test_normalize_image(self):
        """Test image normalization."""
        normalized = self.processor.normalize_image(self.test_image)
        assert np.all(normalized >= 0) and np.all(normalized <= 1.0)
    
    def test_preprocess_for_model(self):
        """Test full preprocessing pipeline."""
        processed = self.processor.preprocess_for_model(self.test_image)
        assert processed.shape == (1, 224, 224, 3)  # Batch of 1, 224x224 RGB image
    
    def test_extract_color_histogram(self):
        """Test color histogram extraction."""
        hist = self.processor.extract_color_histogram(self.test_image)
        assert hist.shape == (768,)  # 256 bins * 3 channels (H,S,V)


class TestFruitQualityAnalyzer:
    """Test cases for the FruitQualityAnalyzer class."""
    
    def setup_method(self):
        """Set up test fixtures."""
        self.analyzer = FruitQualityAnalyzer()
        self.sample_data = {
            'original_image': np.random.randint(0, 255, (500, 500, 3), dtype=np.uint8),
            'processed_image': np.random.random((1, 224, 224, 3)).astype('float32'),
            'color_histogram': np.random.random(768).astype('float32'),
            'image_path': 'test_image.jpg'
        }
    
    def test_analyze(self):
        """Test the main analysis method."""
        result = self.analyzer.analyze(self.sample_data)
        
        # Check that all required attributes are present
        assert hasattr(result, 'fruit_type')
        assert hasattr(result, 'confidence')
        assert hasattr(result, 'freshness')
        assert hasattr(result, 'ripeness')
        assert hasattr(result, 'shelf_life_days')
        assert hasattr(result, 'overall_condition')
        assert hasattr(result, 'recommendations')
        
        # Check types
        assert isinstance(result.fruit_type, FruitType)
        assert isinstance(result.confidence, float)
        assert isinstance(result.freshness, float)
        assert isinstance(result.ripeness, float)
        assert isinstance(result.shelf_life_days, int)
        assert isinstance(result.recommendations, list)
        
        # Check value ranges
        assert 0 <= result.confidence <= 100
        assert 0 <= result.freshness <= 100
        assert 0 <= result.ripeness <= 100
        assert result.shelf_life_days >= 0
    
    def test_detect_fruit_type(self):
        """Test fruit type detection."""
        self.analyzer._detect_fruit_type(self.sample_data)
        assert self.analyzer.fruit_type in list(FruitType)
        assert 0 <= self.analyzer.confidence <= 100
    
    def test_calculate_quality_metrics(self):
        """Test quality metrics calculation."""
        self.analyzer._detect_fruit_type(self.sample_data)
        self.analyzer._calculate_quality_metrics(self.sample_data)
        
        assert 0 <= self.analyzer.freshness <= 100
        assert 0 <= self.analyzer.ripeness <= 100
        assert self.analyzer.shelf_life_days >= 0
    
    def test_generate_recommendations(self):
        """Test recommendation generation."""
        self.analyzer._detect_fruit_type(self.sample_data)
        self.analyzer._calculate_quality_metrics(self.sample_data)
        recommendations = self.analyzer._generate_recommendations()
        
        assert isinstance(recommendations, list)
        assert len(recommendations) > 0
        assert all(isinstance(rec, str) for rec in recommendations)
    
    def test_determine_overall_condition(self):
        """Test overall condition determination."""
        self.analyzer._detect_fruit_type(self.sample_data)
        self.analyzer._calculate_quality_metrics(self.sample_data)
        self.analyzer._determine_overall_condition()
        
        assert self.analyzer.overall_condition in [
            'Excellent', 'Good', 'Fair', 'Poor', 'Spoiled'
        ]


def test_process_image():
    """Test the process_image utility function."""
    from app.utils.image_processor import process_image
    
    # Create a test image
    test_image = np.random.randint(0, 255, (500, 500, 3), dtype=np.uint8)
    test_path = "tests/test_data/process_test.jpg"
    
    # Save test image
    import cv2
    cv2.imwrite(test_path, test_image)
    
    # Process the image
    try:
        result = process_image(test_path)
        
        # Check that all required keys are present
        assert 'original_image' in result
        assert 'processed_image' in result
        assert 'color_histogram' in result
        assert 'image_path' in result
        
        # Check types
        assert isinstance(result['original_image'], np.ndarray)
        assert isinstance(result['processed_image'], np.ndarray)
        assert isinstance(result['color_histogram'], np.ndarray)
        assert isinstance(result['image_path'], str)
        
        # Check shapes
        assert result['original_image'].shape == (500, 500, 3)
        assert result['processed_image'].shape == (1, 224, 224, 3)
        assert result['color_histogram'].shape == (768,)
        
    finally:
        # Clean up
        if Path(test_path).exists():
            Path(test_path).unlink()
