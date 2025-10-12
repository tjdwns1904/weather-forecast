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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-1 p-4">
        <div className="container w-full max-w-full px-4 py-3">
          <p className="font-bold text-2xl mb-0">{error.title}</p>
          <hr />
          <p className="text-xl mb-0">{error.msg}</p>
          <p className="text-xl">Click "OK" to navigate back to the home page.</p>
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