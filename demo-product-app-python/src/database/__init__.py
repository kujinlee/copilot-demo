from flask import Flask, jsonify
from .db import db
from ..routes.product_routes import product_routes
import logging

def create_app(config_class='src.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    logging.basicConfig(level=logging.DEBUG)

    # Initialize the database
    db.init_app(app)
    with app.app_context():
        logging.info("create_app:: Creating all tables")
        try:
            db.create_all()
            logging.info("create_app:: Tables created successfully")
        except Exception as e:
            logging.error(f"Error creating tables: {e}")
    app.db_initialized = True  # Set the db_initialized attribute

    # Register the 'product_routes' Blueprint with the Flask application
    app.register_blueprint(product_routes)

    @app.route('/')
    def index():
        return jsonify({'message': 'Welcome to the Products API'}), 200

    return app