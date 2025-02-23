from flask import Flask, jsonify
from .database.db import init_db
from .routes.product_routes import product_routes

app = Flask(__name__)
app.config.from_object('src.config.Config')

init_db(app)

# Register the 'product_routes' Blueprint with the Flask application
app.register_blueprint(product_routes)

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the Products API'}), 200

if __name__ == '__main__':
    app.run(debug=True)