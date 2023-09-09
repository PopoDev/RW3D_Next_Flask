import dynamic from "next/dynamic";

const Plot = dynamic(
  () => {
    return import("react-plotly.js");
  },
  { ssr: false }
);

interface Data {
  x: number[];
  y: number[];
  z: number[];
}

interface AnimPlotProps {
  df: Map<string, Data>;
  xAxis: number | null;
  yAxis: number | null;
  zAxis: number | null;
}

export default function AnimPlot({ df, xAxis, yAxis, zAxis }: AnimPlotProps) {
  return (
    <Plot
      data={[
        {
          x: df.get("0")?.x,
          y: df.get("0")?.y,
          z: df.get("0")?.z,
          mode: "markers",
          type: "scatter3d",
          marker: {
            size: 5,
          },
        },
      ]}
      layout={{
        title: "3D Random Walk Simulation",
        width: 800,
        height: 600,
        scene: {
          xaxis: { range: [0, xAxis] },
          yaxis: { range: [0, yAxis] },
          zaxis: { range: [0, zAxis] },
          aspectmode: "cube",
        },
        sliders: [
          {
            active: 0,
            steps: Array.from(df.keys()).map((index) => ({
              label: `Step ${index}`,
              method: "animate",
              args: [
                [`frame${index}`],
                {
                  mode: "immediate",
                  transition: { duration: 0 },
                  frame: { duration: 0, redraw: true },
                },
              ],
            })),
            x: 0.1,
            xanchor: "left",
            y: 0,
            yanchor: "top",
            pad: { t: 50, r: 10 },
          },
        ],
        updatemenus: [
          {
            buttons: [
              {
                args: [
                  null, // Set this to null to keep the current frame
                  {
                    fromcurrent: true,
                    transition: {
                      duration: 0,
                    },
                    frame: {
                      duration: 200,
                    },
                  },
                ],
                label: "Play",
                method: "animate",
              },
              {
                args: [
                  [null],
                  {
                    frame: { duration: 0 },
                    mode: "immediate",
                  },
                ],
                label: "Pause",
                method: "animate",
              },
            ],
            direction: "left",
            pad: { r: 10, t: 87 },
            showactive: false,
            type: "buttons",
            x: 0.1,
            xanchor: "right",
            y: 0,
            yanchor: "top",
          },
        ],
      }}
      frames={
        Array.from(df.keys()).map((index) => ({
          name: `frame${index}`,
          data: [
            {
              x: df.get(index)?.x,
              y: df.get(index)?.y,
              z: df.get(index)?.z,
              mode: "markers",
              type: "scatter3d",
            },
          ],
        })) as any
      }
      useResizeHandler={true}
      config={{ responsive: true }}
    />
  );
}
