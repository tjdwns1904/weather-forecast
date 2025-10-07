import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";
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
      <Form onSubmit={e => {
        e.preventDefault();
        navigate({
          pathname: "/weather", search: createSearchParams({
            city: city
          }).toString()
        });
      }}>
        <Form.Group>
          <Form.Control placeholder="Search..." onChange={handleChange} />
        </Form.Group>
      </Form>
    </>
  )
}