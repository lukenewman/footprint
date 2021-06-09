from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  # allow_credentials=True
)

@app.get("/")
def get_root():
  return { "healthy" }

@app.get("/categories")
def get_categories():
  return { "categories": [ "Housing", "Travel", "Food", "Products", "Services" ] }

@app.get("/categories/{category}/emission_types")
def get_emission_types(category: str):
  if category == "Housing":
    return ["Electricity", "Natural Gas", "Fuel Oil", "LPG", "Waste", "Water"]
  elif category == "Travel":
    return ["Vehicle", "Bus", "Metro", "Taxi", "Rail", "Flying"]
  elif category == "Food":
    return ["Red meat", "White meat", "Dairy", "Cereals", "Vegetables", "Fruit", "Oils", "Snacks", "Drinks"]
  elif category == "Products":
    return ["Electrical", "Household", "Clothes", "Medical", "Recreational", "Other"]
  elif category == "Services":
    return ["Health", "Finance", "Recreation", "Education", "Vehicle", "Communications", "Other"]

