from flask import Blueprint, request
from src.simulation import Simulation

views = Blueprint('views', __name__)

@views.route('/sim', methods=['POST'])
def api_sim():
    data = request.json
    n = int(data.get('number_particles'))
    steps = int(data.get('steps'))
    dim = (int(data.get('dim')[0]), int(data.get('dim')[1]), int(data.get('dim')[2]))
    v = (float(data.get('v')[0]), float(data.get('v')[1]), float(data.get('v')[2]))
    init = data.get('init')

    sim = Simulation(n, dim=dim, init=init, v=v)
    df = sim.animate(steps=steps)

    return [{
        "x": df_step["x"].to_json(orient="records"),
        "y": df_step["y"].to_json(orient="records"),
        "z": df_step["z"].to_json(orient="records")
        } for step, df_step in df.groupby('step')]
