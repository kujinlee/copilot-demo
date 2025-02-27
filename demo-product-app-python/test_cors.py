import requests

def test_cors():
    try:
        print(f"In test_core(): Before accessing /api/cors-test")
        response = requests.get('http://localhost:5000/api/cors-test')
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"Headers: {dict(response.headers)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("In main before calling test_cors()")
    test_cors()