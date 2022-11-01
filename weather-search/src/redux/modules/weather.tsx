import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../configStore";
import axios from "axios";
const { VITE_APP_API_KEY }  = import.meta.env
export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: boolean;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: false,
};

export const getWeatherThunk = createAsyncThunk(
  "weather/getWeather",
  async (city: string): Promise<WeatherData> => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_APP_API_KEY}`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherThunk.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getWeatherThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getWeatherThunk.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const getWeather = (state: RootState) => state.weather;
export default weatherSlice.reducer;