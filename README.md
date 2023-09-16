<p align="center">
  <img src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" height="96">
  <a href="https://randomwalk3d.vercel.app/">
    <h3 align="center">3D Random Walk Simulation</h3>
  </a>
</p>

<p align="center">Web app using 
<a href="https://nextjs.org/">Next.js</a> in the frontend and 
<a href="https://flask.palletsprojects.com/">Flask</a> as the API backend. </p>
<p align="center">This project is deployed thanks to <a href="https://vercel.com/solutions/nextjs">Vercel</a>.</p>

<br/>

# 3D Random Walk Simulation

### Website: [https://randomwalk3d.vercel.app/](https://randomwalk3d.vercel.app/)

### Abstract:

The primary aim of this project is to develop a computer tool for simulating the movement of pollutants within a fluid medium. Pollutants are defined as contaminants that, once exceeding a certain threshold, adversely affect the environment. The computer program is built upon two fundamental concepts: random walk theory from the realm of mathematics and pollutant transport principles rooted in physics. Throughout this work, we establish the inherent connection between these two concepts and highlight their intriguing features. The ultimate goal of this project is to simulate pollutant transport within a medium and subsequently identify the region where pollutant concentrations surpass a predetermined arbitrary threshold.

## Introduction

This project is a Next.js + Python Flask web app. Deployment is made on Vercel with two different projects to handle the Serverless Function maximum size.

Frontend (Next): https://github.com/PopoDev/RW3D_Frontend

Backend (Flask): https://github.com/PopoDev/RW3D_Backend

## Features

- Random Walk: Utilizes random walk theory to simulate the movement of pollutants in a 3D space.
- Physics Modeling: Incorporates pollutant transport principles from physics to ensure accurate and insightful simulations.
- User-Friendly Interface: The web-based interface is intuitive and user-friendly, making it accessible to a wide audience.
- Interactive Visualization: Provides visual representations of pollutant dispersion, helping users understand complex scenarios.

## How It Works

The Python/Flask server is mapped into to Next.js app under `/api/`.

This is implemented using [`next.config.js` rewrites](https://github.com/vercel/examples/blob/main/python/nextjs-flask/next.config.js) to map any request to `/api/:path*` to the Flask API, which is hosted in the `/api` folder.

On localhost, the rewrite will be made to the `127.0.0.1:5328` port, which is where the Flask server is running.

In production, the Flask server is hosted as [Python serverless functions](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python) on Vercel.

## Developing Locally

You can clone & create this repo with the following command

```bash
git clone https://github.com/PopoDev/RW3D_Next_Flask.git
```

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

## License

This project is licensed under the MIT License
