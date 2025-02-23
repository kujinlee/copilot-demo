from flask import Blueprint, request, jsonify
from ..services.product_service import ProductService

product_routes = Blueprint('product_routes', __name__)

@product_routes.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.json
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
        product = ProductService.create_product(data)
        return jsonify(product), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@product_routes.route('/products', methods=['GET'])
def get_products():
    try:
        products = ProductService.get_all_products()
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@product_routes.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = ProductService.get_product(product_id)
        if product:
            return jsonify(product), 200
        return jsonify({'message': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@product_routes.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        data = request.json
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
        updated_product = ProductService.update_product(product_id, data)
        if updated_product:
            return jsonify(updated_product), 200
        return jsonify({'message': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@product_routes.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        success = ProductService.delete_product(product_id)
        if success:
            return jsonify({'message': 'Product deleted successfully'}), 204
        return jsonify({'message': 'Product not found'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 500