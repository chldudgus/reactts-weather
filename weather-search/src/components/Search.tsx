import React, { useState, FormEvent } from "react";
import { useAppDispatch } from "../redux/configStore";
import { getWeatherThunk } from "../redux/modules/weather";
interface SearchProps {
  title: string;
}
const Search: React.FC<SearchProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState<string>("");
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim() === "") {
      alert("도시를 입력하주세요");
    }
    dispatch(getWeatherThunk(city));
    setCity("");
  };
  return (
    <div className="hero is-lign has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <form action="" className="py-5" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input has-text-centered mb-2"
              placeholder="도시명을 입력하세요"
              style={{ maxWidth: 300 }}
              value={city}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="button is-primary is-fullWidth"
              style={{ maxWidth: 300, margin: "0 auto" }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;