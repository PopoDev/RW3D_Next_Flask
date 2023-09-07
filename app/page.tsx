import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-6xl font-bold">3D Random Walk</h1>
      <div className="w-full grid text-between py-4 md:py-12 md:grid-cols-3 md:text-left">
        <Link
          href="https://github.com/PopoDev/RW3D_Next_Flask"
          className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Code{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`text-sm md:text-base opacity-50 pr-4`}>
            Find the source code for this project on my GitHub.
          </p>
        </Link>

        <Link
          href="/simulation"
          className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Simulation{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`text-sm md:text-base opacity-50 pr-4`}>
            Try a demo of the 3D random walk simulation.
          </p>
        </Link>

        <Link
          href="/about"
          className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Description{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`text-sm md:text-base opacity-50 pr-4`}>Soon</p>
        </Link>
      </div>
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
