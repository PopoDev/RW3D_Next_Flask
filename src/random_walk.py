import numpy as np
import pandas as pd
pd.options.plotting.backend = "plotly"


class RandomWalk:
    def __init__(self, particles, vx=0, vy=0, vz=0, delta_t=1, dispersion_coefficient=np.eye(3)):
        self.particles = particles
        self.number_of_particles = len(particles["x"])

        self.vx, self.vy, self.vz = vx, vy, vz
        self.delta_t = delta_t
        self.dispersion_coefficient = dispersion_coefficient

    def get_positions(self):
        return self.particles["x"], self.particles["y"], self.particles["z"]
    
    def get_df(self):
        return self.particles

    def step(self, v_tot):
        """Take a step in a random direction."""
        self.particles += pd.DataFrame({
            "x": self.vx * self.delta_t + v_tot.vx_tot * (self.delta_t ** 0.5),
            "y": self.vy * self.delta_t + v_tot.vy_tot * (self.delta_t ** 0.5),
            "z": self.vz * self.delta_t + v_tot.vz_tot * (self.delta_t ** 0.5)
        })

    def update(self):
        # Independent random variables --> random float number that can be minus or plus.
        # z1, z2, z3 = np.random.uniform(-1, 1, (3, number_of_particles)) * 3**(1/2)

        # Gaussian distribution is more precise but a bit slower
        z1, z2, z3 = np.random.normal(0, 1, (3, self.number_of_particles))

        v_tot = pd.DataFrame({
            "vx_tot": ((z1 * self.dispersion_coefficient[0, 0] +
                        z2 * self.dispersion_coefficient[0, 1] +
                        z3 * self.dispersion_coefficient[0, 2])),

            "vy_tot": ((z1 * self.dispersion_coefficient[1, 0] +
                        z2 * self.dispersion_coefficient[1, 1] +
                        z3 * self.dispersion_coefficient[1, 2])),

            "vz_tot": ((z1 * self.dispersion_coefficient[2, 0] +
                        z2 * self.dispersion_coefficient[2, 1] +
                        z3 * self.dispersion_coefficient[2, 2]))
        })

        self.step(v_tot)
