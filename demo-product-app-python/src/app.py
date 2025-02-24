from flask import Flask, jsonify
from .database.db import db, init_db
from .routes.product_routes import product_routes
from .models.product import Product  # Import the Product model
import logging

app = Flask(__name__)
app.config.from_object('src.config.Config')

logging.basicConfig(level=logging.DEBUG)

# Initialize the database if not already initialized
if not hasattr(app, 'db_initialized'):
    init_db(app)

# Register the 'product_routes' Blueprint with the Flask application
app.register_blueprint(product_routes)

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Products API'}), 200

if __name__ == '__main__':
    app.run(debug=True)