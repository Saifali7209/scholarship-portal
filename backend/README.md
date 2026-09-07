# Scholarship IIC - Flask Backend

This is the Python Flask backend service for the Scholarship IIC application.

## Prerequisites

- Python 3.10+ installed

## Setup Instructions

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server**:
   ```bash
   python app.py
   ```

The API will be accessible at `http://127.0.0.1:5000`.

## API Endpoints

- `GET /api/health`: Health status endpoint.
- `GET /api/scholarships`: Retrieve sample scholarship listings.
