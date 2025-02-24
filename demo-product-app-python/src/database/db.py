from flask_sqlalchemy import SQLAlchemy
import logging

db = SQLAlchemy()

def init_db(app, force_create=False):
    if not hasattr(app, 'db_initialized') or force_create:
        logging.info("Initializing the database")
        if not hasattr(app, 'db_initialized'):
            db.init_app(app)
        with app.app_context():
            if force_create:
                logging.info("Dropping all tables for testing")
                db.drop_all()
                logging.info("All tables dropped")
            logging.info("Creating all tables")
            try:
                db.create_all()
                logging.info("Tables created successfully")
            except Exception as e:
                logging.error(f"Error creating tables: {e}")
        app.db_initialized = True