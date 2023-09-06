import math

import numpy as np
import pandas as pd
pd.options.plotting.backend = "plotly"

from src.random_walk import RandomWalk


class Simulation:
    def __init__(self, n=1000, dim=(100.0, 100.0, 100.0), v=(2.5, 1, -1.5), init="center"):
        """
        Initialize the simulation with n particles.
        :param n: Number of particles.
        :param dim: Dimensions of the simulation.
        :param init: Initial position of the particles.
        """
        assert n > 0, "Number of particles must be greater than 0."

        self.number_of_particles = n
        self.x_dim, self.y_dim, self.z_dim = dim

        ##############################
        # Initial positions
        ##############################
        if init == "center":
            self.x = np.ones(n) * (self.x_dim / 2)
            self.y = np.ones(n) * (self.y_dim / 2)
            self.z = np.ones(n) * (self.z_dim / 2)
        elif init == "random":
            self.x = np.random.rand(n) * self.x_dim
            self.y = np.random.rand(n) * self.y_dim
            self.z = np.random.rand(n) * self.z_dim
        else:
            raise ValueError("Random walk init must be either 'center' or 'random'")

        ##############################
        # Parameters
        ##############################
        # Time step in [s]
        delta_t = 1

        # Velocities in [m/s]
        vx, vy, vz = v
        # Euclidean norm of the velocity vector
        vn = math.sqrt(vx ** 2 + vy ** 2 + vz ** 2)

        # Longitudinal and transverse dispersivities in [m]
        al = 0.5
        at = 0.5

        # Effective molecular diffusion coefficient in [m**2/s]
        dm = 0.00005

        # Dispersivity coefficients
        al_constant = ((2 * (al * vn + dm)) ** 1 / 2)
        at_constant = ((2 * (at * vn + dm)) ** 1 / 2)
        square_root_constant = ((vx ** 2 + vy ** 2) ** 1 / 2)

        # The dispersion displacement matrix
        dispersion_matrix = np.array([
            [
                (vx / vn) * al_constant,
                -((vx * vz) / (vn * square_root_constant)) * at_constant,
                -(vy / square_root_constant) * at_constant
            ],
            [
                (vy / vn) * al_constant,
                -((vy * vz) / (vn * square_root_constant)) * at_constant,
                (vx / square_root_constant) * at_constant],
            [
                (vz / vn) * al_constant,
                (square_root_constant / vn) * at_constant,
                0
            ]
        ])

        # The dispersion coefficient
        dispersion_coefficient = dispersion_matrix * delta_t

        ##############################
        # Random walk model
        ##############################
        self.rw = RandomWalk(pd.DataFrame({"x": self.x, "y": self.y, "z": self.z}),
                             vx, vy, vz,
                             delta_t,
                             dispersion_coefficient)

        x, y, z = self.rw.get_positions()
        self.simulation = pd.DataFrame({"step": 0, "x": x, "y": y, "z": z})

    def animate(self, steps=10):
        for i in range(steps):
            self.rw.update()
            x, y, z = self.rw.get_positions()
            self.simulation = pd.concat((self.simulation, pd.DataFrame({"step": i+1, "x": x, "y": y, "z": z})), axis=0)

        return self.simulation
