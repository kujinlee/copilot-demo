from ..models.product import Product
from ..database.db import db

class ProductService:
    @staticmethod
    def create_product(product_data):
        new_product = Product(**product_data)
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def get_product(product_id):
        return db.session.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def update_product(product_id, product_data):
        product = ProductService.get_product(product_id)
        if product:
            for key, value in product_data.items():
                setattr(product, key, value)
            db.session.commit()
        return product

    @staticmethod
    def delete_product(product_id):
        product = ProductService.get_product(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
        return product