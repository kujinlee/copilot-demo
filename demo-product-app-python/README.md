# products-app-python/README.md

# Products App Python

This is a Python application that supports CRUD operations for a product entity. The application exposes these operations as REST endpoints and is built using Flask.

## Project Structure

```
products-app-python
├── src
│   ├── __init__.py
│   ├── app.py
│   ├── config.py
│   ├── routes
│   │   ├── __init__.py
│   │   └── product_routes.py
│   ├── services
│   │   ├── __init__.py
│   │   └── product_service.py
│   ├── models
│   │   ├── __init__.py
│   │   └── product.py
│   └── database
│       ├── __init__.py
│       └── db.py
├── tests
│   ├── __init__.py
│   └── test_products.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd demo-product-app-python
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   # Make sure you're in the project root directory
   export PYTHONPATH=$PYTHONPATH:$(pwd)
   python -m src.app
   ```

## Usage

The application exposes the following REST endpoints for managing products:

- `POST /products` - Create a new product
- `GET /products` - Retrieve all products
- `GET /products/<id>` - Retrieve a product by ID
- `PUT /products/<id>` - Update a product by ID
- `DELETE /products/<id>` - Delete a product by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.