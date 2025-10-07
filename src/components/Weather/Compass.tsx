import { CSSProperties } from "react";

interface CompassProps {
  speed: number;
  deg: number;
}

export default function Compass({ speed, deg }: CompassProps) {
  return (
    <div className="flex flex-col items-center flex-5 justify-center">
      <div className="relative w-full aspect-square border-6 border-white rounded-full flex items-center justify-center">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xl font-semibold">N</span>
        <span className="absolute top-1/2 right-1 -translate-y-1/2 text-xl font-semibold">E</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-semibold">S</span>
        <span className="absolute top-1/2 left-1 -translate-y-1/2 text-xl font-semibold">W</span>
        <span className="absolute top-[15%] left-[15%] text-lg font-semibold">NW</span>
        <span className="absolute top-[15%] right-[15%] text-lg font-semibold">NE</span>
        <span className="absolute bottom-[15%] left-[15%] text-lg font-semibold">SW</span>
        <span className="absolute bottom-[15%] right-[15%] text-lg font-semibold">SE</span>
        <div
          className={`
            absolute w-0 h-0 origin-bottom bottom-1/2
            border-l-[20px] border-r-[20px] border-b-[75px] border-transparent
            ${speed < 15 ? 'border-b-blue-500' : speed < 33 ? 'border-b-yellow-600' : 'border-b-red-700'}
            rotate-(--rotation-degree)
            `}
          style={{ '--rotation-degree': `${deg}deg` } as CSSProperties}
        />
        <div
          className={`
          relative z-10 flex flex-col justify-center w-28 aspect-square rounded-full text-center
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