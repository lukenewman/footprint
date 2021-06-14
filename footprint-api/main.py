from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins
)

class EmissionType(BaseModel):
  id: int
  name: str
  emissions_factor: float

class Category(BaseModel):
  id: int
  name: str
  emission_types: List[EmissionType]

categories = [ 
  Category(id=0, name="Housing", emission_types=[
    EmissionType(id=0, name="Electricity", emissions_factor=2),
    EmissionType(id=1, name="Natural Gas", emissions_factor=2),
    EmissionType(id=2, name="Fuel Oil", emissions_factor=2),
    EmissionType(id=3, name="LPG", emissions_factor=2),
    EmissionType(id=4, name="Waste", emissions_factor=2),
    EmissionType(id=5, name="Water", emissions_factor=2),
  ]),
  Category(id=1, name="Travel", emission_types=[
    EmissionType(id=6, name="Vehicle", emissions_factor=2),
    EmissionType(id=7, name="Bus", emissions_factor=2),
    EmissionType(id=8, name="Metro", emissions_factor=2),
    EmissionType(id=9, name="Taxi", emissions_factor=2),
    EmissionType(id=10, name="Rail", emissions_factor=2),
    EmissionType(id=11, name="Flying", emissions_factor=2),
  ]),
  Category(id=2, name="Food", emission_types=[
    EmissionType(id=6, name="Red meat", emissions_factor=2),
    EmissionType(id=7, name="White meat", emissions_factor=2),
    EmissionType(id=8, name="Dairy", emissions_factor=2),
    EmissionType(id=9, name="Cereals", emissions_factor=2),
    EmissionType(id=10, name="Vegetables", emissions_factor=2),
    EmissionType(id=11, name="Fruits", emissions_factor=2),
    EmissionType(id=11, name="Oils", emissions_factor=2),
    EmissionType(id=11, name="Snacks", emissions_factor=2),
    EmissionType(id=11, name="Drinks", emissions_factor=2),
  ]),
  Category(id=3, name="Products", emission_types=[
    EmissionType(id=6, name="Electrical", emissions_factor=2),
    EmissionType(id=7, name="Household", emissions_factor=2),
    EmissionType(id=8, name="Clothes", emissions_factor=2),
    EmissionType(id=9, name="Medical", emissions_factor=2),
    EmissionType(id=10, name="Recreational", emissions_factor=2),
    EmissionType(id=11, name="Other", emissions_factor=2),
  ]),
  Category(id=4, name="Services", emission_types=[
    EmissionType(id=6, name="Health", emissions_factor=2),
    EmissionType(id=7, name="Finance", emissions_factor=2),
    EmissionType(id=8, name="Recreation", emissions_factor=2),
    EmissionType(id=9, name="Education", emissions_factor=2),
    EmissionType(id=10, name="Vehicle", emissions_factor=2),
    EmissionType(id=11, name="Communications", emissions_factor=2),
    EmissionType(id=11, name="Other", emissions_factor=2),
  ]),
]

all_emission_types = [c.emission_types for c in categories]
flattened_emission_types = [item for sublist in all_emission_types for item in sublist]

@app.get("/")
def get_root():
  return { "healthy" }

@app.get("/categories")
def get_categories():
  return { "categories": categories }

@app.get("/emission_types/{id}")
def get_emission_type(id: int):
  return next(x for x in flattened_emission_types if x.id == id)

@app.get("/calculate/{emission_type_id}")
def calculate_emission(emission_type_id: int):
  emission_type = next(x for x in flattened_emission_types if x.id == emission_type_id)
  return { "emissions": emission_type.emissions_factor }
