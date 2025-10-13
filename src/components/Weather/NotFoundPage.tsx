import { ApiError } from "@/types/common";
import { useNavigate } from "react-router-dom";

interface Props {
  error: ApiError;
}

export default function NotFound({ error }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed left-0 w-full h-full bg-black/30" />
      <div className="w-full max-w-full md:max-w-1/2 absolute top-1/2 md:top-0 left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 z-1 p-4">
        <div className="container px-6 md:px-8 py-3 md:py-5 mb-4 md:mb-6 lg:mb-8">
          <p className="font-bold text-xl md:text-2xl mb-2">{error.title}</p>
          <hr />
          <p className="text-lg md:text-xl mt-2">{error.msg}</p>
          <p className="text-lg md:text-xl">Click "OK" to navigate back to the home page.</p>
          <div className="text-end">
            <button className="text-sm py-1.5 px-4 rounded-md bg-indigo-600/75 cursor-pointer hover:shadow-sm hover:shadow-indigo-500/60"
              onClick={() => {
                navigate('/');
              }}>OK</button>
          </div>
        </div>
      </div>
    </>
  )
}