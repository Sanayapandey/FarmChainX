import cv2
import numpy as np
from typing import Tuple, Dict, Any
import os

class ImageProcessor:
    """Handles image processing tasks for fruit analysis"""
    
    @staticmethod
    def load_image(image_path: str) -> np.ndarray:
        """
        Load an image from the given path
        
        Args:
            image_path: Path to the image file
            
        Returns:
            np.ndarray: Loaded image in BGR format
        """
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found at {image_path}")
            
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
            
        return image
    
    @staticmethod
    def resize_image(image: np.ndarray, target_size: Tuple[int, int] = (224, 224)) -> np.ndarray:
        """
        Resize the image to the target dimensions
        
        Args:
            image: Input image
            target_size: Target (width, height) dimensions
            
        Returns:
            Resized image
        """
        return cv2.resize(image, target_size, interpolation=cv2.INTER_AREA)
    
    @staticmethod
    def normalize_image(image: np.ndarray) -> np.ndarray:
        """
        Normalize image pixel values to [0, 1]
        
        Args:
            image: Input image
            
        Returns:
            Normalized image
        """
        return image.astype('float32') / 255.0
    
    @staticmethod
    def preprocess_for_model(image: np.ndarray) -> np.ndarray:
        """
        Preprocess image for the model (resize and normalize)
        
        Args:
            image: Input image in BGR format
            
        Returns:
            Preprocessed image ready for model input
        """
        # Convert BGR to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Resize to model's expected sizing
        resized = ImageProcessor.resize_image(image_rgb)
        
        # Normalize pixel values
        normalized = ImageProcessor.normalize_image(resized)
        
        # Add batch dimension
        return np.expand_dims(normalized, axis=0)
    
    @staticmethod
    def extract_color_histogram(image: np.ndarray) -> np.ndarray:
        """
        Extract color histogram features from the image
        
        Args:
            image: Input image in BGR format
            
        Returns:
            Flattened color histogram features
        """
        # Convert to HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Compute histogram for each channel
        hist_h = cv2.calcHist([hsv], [0], None, [256], [0, 256])
        hist_s = cv2.calcHist([hsv], [1], None, [256], [0, 256])
        hist_v = cv2.calcHist([hsv], [2], None, [256], [0, 256])
        
        # Normalize histograms
        hist_h = cv2.normalize(hist_h, hist_h).flatten()
        hist_s = cv2.normalize(hist_s, hist_s).flatten()
        hist_v = cv2.normalize(hist_v, hist_v).flatten()
        
        # Concatenate features
        return np.hstack([hist_h, hist_s, hist_v])

def process_image(image_path: str) -> Dict[str, Any]:
    """
    Process an image and extract features for analysis
    
    Args:
        image_path: Path to the image file
        
    Returns:
        Dictionary containing processed image data and features
    """
    try:
        # Initialize processor
        processor = ImageProcessor()
        
        # Load and process image
        image = processor.load_image(image_path)
        processed_image = processor.preprocess_for_model(image)
        color_hist = processor.extract_color_histogram(image)
        
        return {
            'original_image': image,
            'processed_image': processed_image,
            'color_histogram': color_hist,
            'image_path': image_path
        }
        
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")
