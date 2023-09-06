from io import BytesIO
import base64
from matplotlib.figure import Figure

def get_graph(fig: Figure):
    # Save it to a temporary buffer.
    buf = BytesIO()
    fig.savefig(buf, format="png")
    # Embed the result in the html output.
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    return f"<img src='data:image/png;base64,{data}'/>"

def get_graph_bytes(fig: Figure):
    # Save it to a temporary buffer.
    buf = BytesIO()
    fig.savefig(buf, format="png")
    buf.seek(0)
    return buf