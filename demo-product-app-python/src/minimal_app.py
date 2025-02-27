import logging
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.debug = True

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Allow CORS for all domains on all routes - simplified configuration
CORS(app)
logger.debug("CORS has been configured")

@app.before_request
def before_request():
    logger.debug(f"Before request: {request.method} {request.url}")
    logger.debug(f"Request headers: {dict(request.headers)}")

@app.after_request
def after_request(response):
    logger.debug(f"After request: {request.method} {request.url}")
    # The following headers are added by flask-cors automatically, but we're adding them explicitly for clarity
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    logger.debug(f"Response headers: {dict(response.headers)}")
    return response

@app.route('/test', methods=['GET'])
def test():
    logger.debug("Handling /test route")
    return jsonify({"message": "CORS is working!"})

# Add a specific test endpoint for CORS
@app.route('/api/cors-test', methods=['GET', 'OPTIONS'])
def cors_test():
    logger.debug("Handling /api/cors-test route")
    return jsonify({"status": "success", "message": "CORS is working!"})

if __name__ == '__main__':
    logger.debug("Starting Flask app")
    app.run(debug=True, port=5001)