from flask import Flask, request
from src.simulation import Simulation

app = Flask(__name__)

@app.route('/test/df')
def df():
    sim = Simulation(100, dim=(100, 100, 100), init="center")
    df = sim.animate(steps=10)
    return df.to_json(orient="records")
