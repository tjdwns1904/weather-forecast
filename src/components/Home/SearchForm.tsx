import { geoNameApi } from "@/api/geoNameApi";
import { ChangeEvent, useState } from "react";
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const isEnglish = (str: string) => {
    return /^[a-zA-Z\s]+$/.test(str);
  }

  const handleSearch = async () => {
    let cityEn = city.trim();
    if (!isEnglish(cityEn)) {
      const geoName = await geoNameApi.getGeoName(city);
      if (geoName.length > 0) {
        cityEn = geoName[0].name;
      }
    }
    navigate({
      pathname: "/weather", search: createSearchParams({
        city: cityEn
      }).toString()
    });
  }

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault();
        handleSearch();
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