import unittest
from src.database import create_app
from src.database.db import init_db
import logging

class TestProductCRUD(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Set up logging for debugging purposes
        logging.basicConfig(level=logging.DEBUG)
        
        # Use the factory function to create the Flask application instance
        # This ensures that the same initialization logic is used across the main application and tests
        cls.app = create_app().test_client()
        cls.app.testing = True
        
        # Use the application context to perform database operations
        with cls.app.application.app_context():
            # Initialize the database for testing
            # The init_db function will check if the database has already been initialized
            # and will drop and recreate the tables if force_create is True
            logging.info("TestProductCRUD:: Initializing the database for testing")
            init_db(cls.app.application, force_create=True)
            logging.info("TestProductCRUD:: Database initialized for testing")

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
        self.assertIn('id', response.get_json())
        self.assertEqual(response.get_json()['name'], 'Test Product')

    def test_read_product(self):
        response = self.create_product()
        product_id = response.get_json()['id']
        logging.info("Reading a product")
        response = self.app.get(f'/products/{product_id}')
        logging.info(f"Test read product response: {response.get_json()}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()['id'], product_id)

    def test_get_all_products(self):
        # Create a product to ensure there is at least one product in the database
        self.create_product()
        logging.info("Getting all products")
        response = self.app.get('/products')
        logging.info(f"Test get all products response: {response.get_json()}")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json(), list)
        self.assertGreater(len(response.get_json()), 0)

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
        self.assertEqual(response.get_json()['name'], 'Updated Product')

    def test_delete_product(self):
        response = self.create_product()
        product_id = response.get_json()['id']
        logging.info("Deleting a product")
        response = self.app.delete(f'/products/{product_id}')
        logging.info(f"Test delete product response: {response.status_code}")
        self.assertEqual(response.status_code, 204)

        # Verify that the product was deleted
        response = self.app.get(f'/products/{product_id}')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()