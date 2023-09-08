from flask import Flask, request
from src.simulation import Simulation
import plotly.express as px

app = Flask(__name__)

@app.route('/api/sim', methods=['POST'])
def api_sim():
    data = request.json
    n = int(data.get('number_particles'))
    steps = int(data.get('steps'))
    dim = (int(data.get('dim')[0]), int(data.get('dim')[1]), int(data.get('dim')[2]))
    v = (float(data.get('v')[0]), float(data.get('v')[1]), float(data.get('v')[2]))
    init = data.get('init')
    print(f"[Backend] Simulation with {n} particles, {steps} steps, dim={dim}, v={v}, init={init}")

    sim = Simulation(n, dim=dim, init=init, v=v)
    df = sim.animate(steps=steps)
    fig = px.scatter_3d(df, x="x", y="y", z="z", animation_frame="step", range_x=[0, dim[0]], range_y=[0, dim[1]], range_z=[0, dim[2]])
    fig.update_layout(
        title="Random Walk Simulation",
        title_x=0.5,
        scene={
            'xaxis': {'range': [0, dim[0]]},
            'yaxis': {'range': [0, dim[1]]},
            'zaxis': {'range': [0, dim[2]]},
            'aspectmode': 'cube',
        },
    )
    
    fig.show()

    return [{
        "x": df_step["x"].to_json(orient="records"),
        "y": df_step["y"].to_json(orient="records"),
        "z": df_step["z"].to_json(orient="records")
        } for step, df_step in df.groupby('step')]

@app.route('/test/plotly')
def plotly():
    sim = Simulation(100, dim=(100, 100, 100), init="random")
    df = sim.rw.get_df()
    fig = px.scatter_3d(df, x="x", y="y", z="z")
    fig.show()
    return df.to_json(orient="records")


@app.route('/test/df')
def df():
    sim = Simulation(100, dim=(100, 100, 100), init="center")
    df = sim.animate(steps=10)
    return df.to_json(orient="records")
