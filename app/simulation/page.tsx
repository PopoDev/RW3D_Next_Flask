"use client";

import React, { useState } from "react";
import NumberInput from "../components/NumberInput";
import {
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

export default function SimulationPage() {
  const [numberParticles, setNumberParticles] = useState<number | null>(1000); // [1, 10000]
  const [steps, setSteps] = useState<number | null>(10); // [1, 1000]

  const [xAxis, setXAxis] = useState<number | null>(100); // [10, 1000]
  const [yAxis, setYAxis] = useState<number | null>(100); // [10, 1000]
  const [zAxis, setZAxis] = useState<number | null>(100); // [10, 1000]

  const [vx, setVx] = useState<number | null>(2); // [-10, 10]
  const [vy, setVy] = useState<number | null>(1); // [-10, 10]
  const [vz, setVz] = useState<number | null>(-1); // [-10, 10]

  const [at, setAt] = useState<number | null>(0.5); // [0.1, 1]
  const [al, setAl] = useState<number | null>(0.5); // [0.1, 1]
  const [dm, setDm] = useState<number | null>(0.00005); // [0.00001, 0.0001]

  const [init, setInit] = useState("center"); // [center, random]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Number of particles:", numberParticles);
    console.log("Steps:", steps);
    console.log("Dim:", [xAxis, yAxis, zAxis]);
    console.log("V:", [vx, vy, vz]);
    console.log("Dispersion:", [at, al, dm]);
    console.log("Init:", init);
  };

  const handleChange =
    (setValue: React.Dispatch<React.SetStateAction<number | null>>) =>
    (
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.PointerEvent
        | React.KeyboardEvent,
      value: number | undefined
    ) => {
      if (value !== undefined) {
        setValue(value);
      }
      event.preventDefault();
    };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-8">Simulation</h1>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              useFlexGap
              flexWrap="wrap"
            >
              <NumberInput
                label="Number of particles [1, 10000]"
                defaultValue={1000}
                min={0}
                max={10000}
                onChange={handleChange(setNumberParticles)}
              />
              <NumberInput
                label="Steps [1, 1000]"
                defaultValue={10}
                min={1}
                max={1000}
                onChange={handleChange(setSteps)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              useFlexGap
              flexWrap="wrap"
            >
              <NumberInput
                label="X-Axis [10, 1000]"
                defaultValue={100}
                min={10}
                max={1000}
                onChange={handleChange(setXAxis)}
              />
              <NumberInput
                label="Y-Axis [10, 1000]"
                defaultValue={100}
                min={10}
                max={1000}
                onChange={handleChange(setYAxis)}
              />
              <NumberInput
                label="Z-Axis [10, 1000]"
                defaultValue={100}
                min={10}
                max={1000}
                onChange={handleChange(setZAxis)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              useFlexGap
              flexWrap="wrap"
            >
              <NumberInput
                label="Vx [-10, 10]"
                defaultValue={2}
                min={-10}
                max={10}
                onChange={handleChange(setVx)}
              />
              <NumberInput
                label="Vy [-10, 10]"
                defaultValue={1}
                min={-10}
                max={10}
                onChange={handleChange(setVy)}
              />
              <NumberInput
                label="Vz [-10, 10]"
                defaultValue={-1}
                min={-10}
                max={10}
                onChange={handleChange(setVz)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              useFlexGap
              flexWrap="wrap"
            >
              <NumberInput
                disabled
                label="Transverse dispersivities (disabled)"
                defaultValue={0.5}
                min={0.1}
                max={1}
                step={0.1}
              />
              <NumberInput
                disabled
                label="Longitudinal dispersivities (disabled)"
                defaultValue={0.5}
                min={0.1}
                max={1}
                step={0.1}
              />
              <NumberInput
                disabled
                label="Molecular diffusion (disabled)"
                defaultValue={0.00005}
                min={0.00001}
                max={0.0001}
                step={0.00001}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "270px" }}>
              <InputLabel>Init</InputLabel>
              <Select
                value={init}
                label="Init"
                onChange={(event: SelectChangeEvent) =>
                  setInit(event.target.value)
                }
              >
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="random">Random</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              style={{
                marginTop: "20px",
                padding: "16px",
                width: "270px",
                backgroundColor: "rgb(34 197 94)",
              }}
            >
              <p className="text-2xl font-bold font-mono text-black">
                Start Simulation
              </p>
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
