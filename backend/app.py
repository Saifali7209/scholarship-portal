import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend integration
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify Flask API status."""
    return jsonify({
        "status": "online",
        "service": "Scholarship IIC Flask API",
        "version": "1.0.0"
    }), 200


@app.route("/api/scholarships", methods=["GET"])
def get_scholarships():
    """Sample endpoint listing available scholarships."""
    scholarships = [
        {
            "id": 1,
            "title": "National Merit Innovation Scholarship",
            "amount": "$5,000",
            "deadline": "2026-10-15",
            "category": "STEM",
            "eligibility": "Undergraduate Students"
        },
        {
            "id": 2,
            "title": "Global Excellence Academic Award",
            "amount": "$10,000",
            "deadline": "2026-11-01",
            "category": "All Majors",
            "eligibility": "High School Seniors & Undergraduates"
        },
        {
            "id": 3,
            "title": "IIC Women in Tech Grant",
            "amount": "$7,500",
            "deadline": "2026-12-01",
            "category": "Computer Science & Engineering",
            "eligibility": "Female Undergraduates & Graduates"
        }
    ]
    return jsonify({
        "success": True,
        "count": len(scholarships),
        "data": scholarships
    }), 200


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    print(f"🚀 Flask server running on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=debug)
