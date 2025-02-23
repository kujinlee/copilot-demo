import unittest
from src.app import app
from src.database.db import init_db

class TestProductCRUD(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = app.test_client()
        cls.app.testing = True
        init_db()

    def test_create_product(self):
        response = self.app.post('/products', json={
            'name': 'Test Product',
            'description': 'A product for testing',
            'price': 10.99,
            'quantity': 100
        })
        self.assertEqual(response.status_code, 201)

    def test_read_product(self):
        response = self.app.get('/products/1')
        self.assertEqual(response.status_code, 200)

    def test_update_product(self):
        response = self.app.put('/products/1', json={
            'name': 'Updated Product',
            'description': 'An updated product for testing',
            'price': 12.99,
            'quantity': 80
        })
        self.assertEqual(response.status_code, 200)

    def test_delete_product(self):
        response = self.app.delete('/products/1')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()