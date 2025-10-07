import { CSSProperties } from "react";

interface CompassProps {
  speed: number;
  deg: number;
}

export default function Compass({ speed, deg }: CompassProps) {
  return (
    <div className="flex flex-col items-center flex-5 justify-center">
      <div className="relative w-full aspect-square border-6 border-white rounded-full flex items-center justify-center">
        {DIRECTIONS.map(({ name, style }) =>
          <span key={name} className={style}>{name}</span>
        )}
        <div
          className={`
            absolute w-0 h-0 origin-bottom bottom-1/2
            border-l-[20px] border-r-[20px] border-b-[75px] xl:border-l-[55px] xl:border-r-[55px] xl:border-b-[110px] border-transparent
            ${speed < 15 ? 'border-b-blue-500' : speed < 33 ? 'border-b-yellow-600' : 'border-b-red-700'}
            rotate-(--rotation-degree)
            `}
          style={{ '--rotation-degree': `${deg}deg` } as CSSProperties}
        />
        <div
          className={`
          relative z-10 flex flex-col justify-center w-28 xl:w-48 aspect-square rounded-full text-center
          ${speed < 15 ? 'bg-blue-500' : speed < 33 ? 'bg-yellow-600' : 'bg-red-700'}
          `}
        >
          <p className="leading-none font-semibold mb-0">
            {speed}
            <br />
            <span className="text-xl">m/s</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const DIRECTIONS = [
  { name: "N", style: "absolute top-0 left-1/2 -translate-x-1/2 text-xl font-semibold" },
  { name: "E", style: "absolute top-1/2 right-1 -translate-y-1/2 text-xl font-semibold" },
  { name: "S", style: "absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-semibold" },
  { name: "W", style: "absolute top-1/2 left-1 -translate-y-1/2 text-xl font-semibold" },
  { name: "NW", style: "absolute top-[15%] left-[15%] text-lg font-semibold" },
  { name: "NE", style: "absolute top-[15%] right-[15%] text-lg font-semibold" },
  { name: "SW", style: "absolute bottom-[15%] left-[15%] text-lg font-semibold" },
  { name: "SE", style: "absolute bottom-[15%] right-[15%] text-lg font-semibold" },
];