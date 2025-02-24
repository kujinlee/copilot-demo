import unittest
from src.app import app
from src.database.db import db, init_db
import logging

class TestProductCRUD(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        logging.basicConfig(level=logging.DEBUG)
        cls.app = app.test_client()
        cls.app.testing = True
        with app.app_context():
            logging.info("Initializing the database for testing")
            init_db(app, force_create=True)
            logging.info("Database initialized for testing")

    def create_product(self):
        logging.info("Creating a product")
        response = self.app.post('/products', json={
            'name': 'Test Product',
            'description': 'A product for testing',
            'price': 10.99,
            'quantity': 100
        })
        logging.info(f"Product creation response: {response.get_json()}")
        return response

    def test_create_product(self):
        response = self.create_product()
        logging.info(f"Test create product response: {response.get_json()}")
        self.assertEqual(response.status_code, 201)

    def test_read_product(self):
        response = self.create_product()
        product_id = response.get_json()['id']
        logging.info("Reading a product")
        response = self.app.get(f'/products/{product_id}')
        logging.info(f"Test read product response: {response.get_json()}")
        self.assertEqual(response.status_code, 200)

    def test_update_product(self):
        response = self.create_product()
        product_id = response.get_json()['id']
        logging.info("Updating a product")
        response = self.app.put(f'/products/{product_id}', json={
            'name': 'Updated Product',
            'description': 'An updated product for testing',
            'price': 12.99,
            'quantity': 80
        })
        logging.info(f"Test update product response: {response.get_json()}")
        self.assertEqual(response.status_code, 200)

    def test_delete_product(self):
        response = self.create_product()
        product_id = response.get_json()['id']
        logging.info("Deleting a product")
        response = self.app.delete(f'/products/{product_id}')
        logging.info(f"Test delete product response: {response.get_json()}")
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()