from fastapi.testclient import TestClient
import main

tester = TestClient(main.app)

def test_get_root():
  response = tester.get("/")
  assert response.status_code == 200
  assert response.json() == ["healthy"]

def test_get_categories():
  response = tester.get("/categories")
  assert response.status_code == 200
  assert response.json() == {"categories": main.categories}

def test_calculate_emission():
  response = tester.get("/calculate/4?value=100")
  assert response.status_code == 200
  assert response.json() == { "emissions": main.categories[0].emission_types[2].emissions_factor * 100}