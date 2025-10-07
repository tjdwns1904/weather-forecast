import { ChangeEvent, useState } from "react";
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
  }

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();
        navigate({
          pathname: "/weather", search: createSearchParams({
            city: city
          }).toString()
        });
      }}>
        <input
          placeholder="Search..."
          onChange={handleChange}
          className="w-full md:w-1/2 lg:w-1/3"
        />
      </form>
    </>
  )
}