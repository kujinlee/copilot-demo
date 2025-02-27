# At the top of your Flask app
from functools import wraps
from flask import Flask, jsonify
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

# Apply this decorator to all routes
def cors_decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        response = f(*args, **kwargs)
        return add_cors_headers(response)
    return decorated_function

# Use it like this
@app.route('/api/cors-test', methods=['GET', 'OPTIONS'])
@cors_decorator
def cors_test():
    logger.debug("Handling /api/cors-test route")
    return jsonify({"status": "success", "message": "CORS is working!"})

# Add a health check endpoint
@app.route('/', methods=['GET'])
@cors_decorator
def index():
    logger.debug("Handling / route")
    return jsonify({"status": "online"})

# This is the critical part that makes the application run
if __name__ == '__main__':
    logger.debug("Starting Flask application...")
    app.run(debug=True, host='0.0.0.0', port=5001)