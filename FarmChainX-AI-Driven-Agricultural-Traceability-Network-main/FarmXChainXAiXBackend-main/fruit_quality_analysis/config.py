"""
Configuration settings for the Fruit Quality Analysis System.
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Data directories
DATA_DIR = BASE_DIR / 'data'
RAW_IMAGE_DIR = DATA_DIR / 'raw'
PROCESSED_IMAGE_DIR = DATA_DIR / 'processed'

# Create directories if they don't exist
os.makedirs(RAW_IMAGE_DIR, exist_ok=True)
os.makedirs(PROCESSED_IMAGE_DIR, exist_ok=True)

# API settings
API_CONFIG = {
    'title': 'Fruit Quality Analysis API',
    'description': 'API for analyzing fruit quality from images',
    'version': '1.0.0',
    'host': '0.0.0.0',
    'port': 8000,
    'reload': True,
    'workers': 1,
}

# Image processing settings
IMAGE_PROCESSING = {
    'target_size': (224, 224),  # Target size for image resizing
    'color_space': 'RGB',       # Color space for processing
    'normalize': True,          # Whether to normalize pixel values
    'hist_bins': 256,           # Number of bins for color histogram
}

# Analysis settings
ANALYSIS_CONFIG = {
    'freshness_weights': {
        'color': 0.4,
        'texture': 0.3,
        'defects': 0.3,
    },
    'ripeness_thresholds': {
        'underripe': 40,
        'optimal': 70,
        'overripe': 90,
    },
    'shelf_life_factors': {
        'freshness': 0.6,
        'ripeness': 0.4,
    },
}

# Model settings (for future implementation)
MODEL_CONFIG = {
    'model_path': None,  # Path to pre-trained model
    'input_shape': (224, 224, 3),
    'num_classes': len(['apple', 'banana', 'orange', 'mango', 'grapes', 'strawberry']),
    'confidence_threshold': 0.7,
}

# Logging configuration
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'logs' / 'app.log',
            'formatter': 'standard',
            'level': 'DEBUG',
        },
    },
    'loggers': {
        '': {  # root logger
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# Create logs directory if it doesn't exist
os.makedirs(BASE_DIR / 'logs', exist_ok=True)
