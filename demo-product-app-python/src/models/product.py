from ..database.db import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def validate(self):
        if not isinstance(self.name, str) or not self.name:
            raise ValueError("Name must be a non-empty string.")
        if not isinstance(self.description, str):
            raise ValueError("Description must be a string.")
        if not isinstance(self.price, (int, float)) or self.price < 0:
            raise ValueError("Price must be a non-negative number.")
        if not isinstance(self.quantity, int) or self.quantity < 0:
            raise ValueError("Quantity must be a non-negative integer.")