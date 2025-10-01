# Getting Started with Fruit Quality Analysis System

This guide will help you set up and run the Fruit Quality Analysis System on your local machine.

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git (optional, for version control)

## Setup Instructions

### 1. Clone the Repository (if you haven't already)

```bash
git clone <repository-url>
cd fruit_quality_analysis
```

### 2. Set Up the Environment

#### Windows (PowerShell)

1. Open PowerShell and navigate to the project directory
2. Run the initialization script:
   ```powershell
   .\init_env.ps1
   ```
   This will:
   - Create a virtual environment
   - Install all required dependencies
   - Set up the necessary directories
   - Create a `.env` file from the example

#### Linux/macOS

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Create necessary directories:
   ```bash
   mkdir -p data/raw data/processed logs
   ```

## Running the Application

### Windows (PowerShell)

```powershell
.\run.ps1
```

### Linux/macOS

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at: http://localhost:8000

## Using the API

### Interactive Documentation

Access the interactive API documentation at:
http://localhost:8000/docs

### Testing with a Sample Image

1. Place your fruit image in the `data/raw` directory
2. Run the test script:
   ```bash
   python test_api_with_image.py data/raw/your_image.jpg
   ```

Or use the web interface at http://localhost:8000/docs to upload an image directly.

## Project Structure

```
fruit_quality_analysis/
├── app/                    # Application code
│   ├── __init__.py
│   ├── main.py            # FastAPI application
│   ├── models/            # Data models
│   ├── utils/             # Utility functions
│   └── routes/            # API routes
├── data/                  # Data storage
│   ├── raw/              # Raw uploaded images
│   └── processed/        # Processed images
├── tests/                # Test files
├── logs/                 # Application logs
├── .env.example         # Example environment variables
├── requirements.txt     # Python dependencies
├── run.ps1             # PowerShell run script
├── run.py              # Python run script
└── README.md           # Project documentation
```

## Next Steps

1. **Add Test Images**: Place fruit images in the `data/raw` directory for testing
2. **Explore the API**: Use the interactive docs at http://localhost:8000/docs
3. **Review the Code**: Check out the implementation in the `app` directory
4. **Run Tests**: Execute `pytest` to run the test suite

## Troubleshooting

- **Port already in use**: If port 8000 is in use, change the port in `.env`
- **Missing dependencies**: Run `pip install -r requirements.txt`
- **Virtual environment issues**: Delete the `venv` directory and rerun the setup

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
