export default function page() {
  return (
    <div className="flex flex-col items-center min-h-scree">
      <h1 className="text-5xl md:text-6xl font-bold mb-8">About</h1>
      <div className="w-full p-4 text-justify">
        <h1 className="mb-3 text-2xl font-semibold">Abtract</h1>
        <p className="text-sm md:text-base opacity-50 pr-4">
          The primary aim of this project is to develop a computer tool for
          simulating the movement of pollutants within a fluid medium.
          Pollutants are defined as contaminants that, once exceeding a certain
          threshold, adversely affect the environment. The computer program is
          built upon two fundamental concepts: random walk theory from the realm
          of mathematics and pollutant transport principles rooted in physics.
          Throughout this work, we establish the inherent connection between
          these two concepts and highlight their intriguing features. The
          ultimate goal of this project is to simulate pollutant transport
          within a medium and subsequently identify the region where pollutant
          concentrations surpass a predetermined arbitrary threshold.
        </p>
      </div>
    </div>
  );
}
