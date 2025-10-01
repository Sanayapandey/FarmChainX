# Fruit Quality Analysis System

An AI-powered system for analyzing fruit quality from images. The system can identify fruit types, assess freshness and ripeness, estimate shelf life, and provide actionable recommendations.

# Fruit Quality Analysis System

An AI-powered system for analyzing fruit quality from images. The system can identify fruit types, assess freshness and ripeness, estimate shelf life, and provide actionable recommendations.

## Features

- **Fruit Type Detection**: Identifies common fruits (Apple, Banana, Orange, Mango, Grapes, Strawberry)
- **Quality Metrics**:
  - Freshness percentage
  - Ripeness percentage
  - Confidence level
  - Estimated shelf life in days
- **Actionable Recommendations**: Provides storage and usage recommendations
- **RESTful API**: Easy integration with other systems
- **Web Interface**: Interactive API documentation

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fruit_quality_analysis
   ```

2. Set up the environment:
   - **Windows**:
     ```powershell
     .\init_env.ps1
     ```
   - **Linux/macOS**:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: .\venv\Scripts\activate
     pip install -r requirements.txt
     cp .env.example .env
     mkdir -p data/raw data/processed logs
     ```

3. Start the application:
   - **Windows**:
     ```powershell
     .\run.ps1
     ```
   - **Linux/macOS**:
     ```bash
     python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
     ```

4. Access the API documentation at: http://localhost:8000/docs

## Usage

### API Endpoints

- `POST /analyze`: Analyze a fruit image
- `GET /health`: Check API status

### Example Request

```bash
curl -X 'POST' \
  'http://localhost:8000/analyze' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@path/to/your/fruit.jpg;type=image/jpeg'
```

### Example Response

```json
{
  "fruit_type": "Apple",
  "confidence": "92%",
  "freshness": "97%",
  "ripeness": "96%",
  "shelf_life_days": 9,
  "overall_condition": "Excellent",
  "recommendations": [
    "Premium quality - perfect for high-end markets",
    "Store in optimal conditions to maintain quality",
    "Perfect for fresh consumption and export",
    "Consider premium pricing strategy"
  ]
}
```

## Project Structure

```
fruit_quality_analysis/
├── app/                    # Application code
│   ├── __init__.py
│   ├── main.py            # FastAPI application
│   ├── models/            # Data models
│   │   ├── __init__.py
│   │   └── fruit_analysis.py
│   ├── utils/             # Utility functions
│   │   ├── __init__.py
│   │   ├── image_processor.py
│   │   └── analysis.py
│   └── routes/            # API routes
│       └── __init__.py
├── data/                  # Data storage
│   ├── raw/              # Raw uploaded images
│   └── processed/        # Processed images
├── tests/                # Test files
│   └── test_api.py
├── .env.example          # Example environment variables
├── config.py             # Configuration settings
├── requirements.txt      # Production dependencies
├── requirements-dev.txt  # Development dependencies
├── run.py                # Python run script
├── run.ps1               # PowerShell run script
├── run.bat               # Batch run script
├── setup.bat             # Windows setup script
├── init_env.ps1          # PowerShell environment setup
└── README.md             # This file
```

## Development

### Setting Up for Development

1. Clone the repository and navigate to the project directory
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install development dependencies:
   ```bash
   pip install -r requirements-dev.txt
   ```

### Running Tests

```bash
pytest
```

### Linting and Formatting

```bash
# Format code with black
black .

# Sort imports
isort .

# Run linter
flake8

# Run type checking
mypy .
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Uses [OpenCV](https://opencv.org/) for image processing
- Inspired by agricultural technology innovations
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

2. The API will be available at `http://localhost:8000`

3. Access the interactive API documentation at `http://localhost:8000/docs`

## API Endpoints

### Analyze Fruit Image

- **URL**: `/analyze`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: Image file to analyze

**Example Request**:
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@path/to/your/fruit.jpg"
```

**Example Response**:
```json
{
  "fruit_type": "Apple",
  "confidence": 92.5,
  "freshness": "97%",
  "ripeness": "96%",
  "shelf_life_days": 9,
  "overall_condition": "Excellent",
  "recommendations": [
    "Premium quality - perfect for high-end markets",
    "Store in optimal conditions to maintain quality",
    "Perfect for fresh consumption and export",
    "Consider premium pricing strategy"
  ]
}
```

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Response**: API status and timestamp

## Project Structure

```
fruit_quality_analysis/
├── app/
│   ├── __init__.py
│   ├── main.py               # FastAPI application
│   ├── models/
│   │   └── fruit_analysis.py # Data models and schemas
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── image_processor.py # Image processing utilities
│   │   └── analysis.py       # Core analysis logic
│   └── routes/
│       └── __init__.py
├── data/
│   ├── raw/                  # Raw uploaded images
│   └── processed/            # Processed images
├── tests/                    # Test files
├── notebooks/                # Jupyter notebooks for development
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

## Future Enhancements

- Train and integrate a real machine learning model for fruit detection and quality assessment
- Add support for more fruit types
- Implement batch processing of multiple images
- Add user authentication and authorization
- Create a web interface for easier interaction
- Add database integration for storing analysis history

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
