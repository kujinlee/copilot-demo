from flask import Blueprint, request, jsonify
from ..models.product import Product
from ..database.db import db
from ..services.product_service import ProductService  # Import ProductService

product_routes = Blueprint('product_routes', __name__)

@product_routes.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        quantity=data['quantity']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@product_routes.route('/products', methods=['GET'])
def get_products():
    try:
        products = ProductService.get_all_products()
        return jsonify(products), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@product_routes.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = db.session.get(Product, id)
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    return jsonify(product.to_dict()), 200

@product_routes.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = db.session.get(Product, id)
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    product.name = data['name']
    product.description = data.get('description')
    product.price = data['price']
    product.quantity = data['quantity']
    db.session.commit()
    return jsonify(product.to_dict()), 200

@product_routes.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = db.session.get(Product, id)
    if product is None:
        return jsonify({'message': 'Product not found'}), 404
    db.session.delete(product)
    db.session.commit()
    return '', 204