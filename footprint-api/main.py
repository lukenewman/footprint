from typing import List
from fastapi import FastAPI, Path
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
  units: str

class Category(BaseModel):
  id: int
  name: str
  emission_types: List[EmissionType]

categories = [ 
  Category(id=0, name="Housing", emission_types=[
    EmissionType(id=0, name="Electricity", emissions_factor=0.92, units="kWh/year"),
    EmissionType(id=1, name="Natural Gas", emissions_factor=117.0, units="therms/year"),
    EmissionType(id=4, name="Waste", emissions_factor=6, units="lbs/year"),
    EmissionType(id=5, name="Water", emissions_factor=7, units="gal/year"),
  ]),
  Category(id=1, name="Travel", emission_types=[
    EmissionType(id=6, name="Vehicle", emissions_factor=2, units="miles/year"),
    EmissionType(id=7, name="Bus", emissions_factor=2, units="miles/year"),
    EmissionType(id=8, name="Metro", emissions_factor=2, units="miles/year"),
    EmissionType(id=9, name="Taxi", emissions_factor=2, units="miles/year"),
    EmissionType(id=10, name="Rail", emissions_factor=2, units="miles/year"),
    EmissionType(id=11, name="Flying", emissions_factor=2, units="miles/year"),
  ]),
  Category(id=2, name="Food", emission_types=[
    EmissionType(id=12, name="Red meat", emissions_factor=2, units="lbs/year"),
    EmissionType(id=13, name="White meat", emissions_factor=2, units="lbs/year"),
    EmissionType(id=14, name="Dairy", emissions_factor=2, units="lbs/year"),
    EmissionType(id=15, name="Cereals", emissions_factor=2, units="lbs/year"),
    EmissionType(id=16, name="Vegetables", emissions_factor=2, units="lbs/year"),
    EmissionType(id=17, name="Fruits", emissions_factor=2, units="lbs/year"),
    EmissionType(id=18, name="Oils", emissions_factor=2, units="lbs/year"),
    EmissionType(id=19, name="Snacks", emissions_factor=2, units="lbs/year"),
    EmissionType(id=20, name="Drinks", emissions_factor=2, units="lbs/year"),
  ]),
  Category(id=3, name="Products", emission_types=[
    EmissionType(id=21, name="Electrical", emissions_factor=2, units="dollars/year"),
    EmissionType(id=22, name="Household", emissions_factor=2, units="dollars/year"),
    EmissionType(id=23, name="Clothes", emissions_factor=2, units="dollars/year"),
    EmissionType(id=24, name="Medical", emissions_factor=2, units="dollars/year"),
    EmissionType(id=25, name="Recreational", emissions_factor=2, units="dollars/year"),
    EmissionType(id=26, name="Other", emissions_factor=2, units="dollars/year"),
  ]),
  Category(id=4, name="Services", emission_types=[
    EmissionType(id=27, name="Health", emissions_factor=2, units="dollars/year"),
    EmissionType(id=28, name="Finance", emissions_factor=2, units="dollars/year"),
    EmissionType(id=29, name="Recreation", emissions_factor=2, units="dollars/year"),
    EmissionType(id=30, name="Education", emissions_factor=2, units="dollars/year"),
    EmissionType(id=31, name="Vehicle", emissions_factor=2, units="dollars/year"),
    EmissionType(id=32, name="Communications", emissions_factor=2, units="dollars/year"),
    EmissionType(id=33, name="Other", emissions_factor=2, units="dollars/year"),
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

@app.get("/calculate/{emission_type_id}")
def calculate_emission(emission_type_id: int, value: int = 1):
  emission_type = next(x for x in flattened_emission_types if x.id == emission_type_id)
  return { "emissions": emission_type.emissions_factor * value }
