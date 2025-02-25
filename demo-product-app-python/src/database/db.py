from flask_sqlalchemy import SQLAlchemy
import logging

db = SQLAlchemy()

def init_db(app, force_create=False):
    logging.debug("init_db:: init_db called with force_create=%s", force_create)
    if not hasattr(app, 'db_initialized'):
        logging.info("init_db:: Initializing the database")
        db.init_app(app)
        app.db_initialized = True
        logging.info("init_db:: Database initialized")

    if force_create:
        with app.app_context():
            logging.info("Dropping all tables for testing")
            db.drop_all()
            logging.info("All tables dropped")
            logging.info("Creating all tables")
            try:
                db.create_all()
                logging.info("Tables created successfully")
            except Exception as e:
                logging.error(f"Error creating tables: {e}")