import React, { FC } from "react";
import "./App.css";
import Search from "./components/Search";
import Weather from "./components/Weather";
import { useAppSelect } from "./redux/configStore";
import { getWeather } from "./redux/modules/weather";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

const App: FC = () => {
  const weather = useAppSelect(getWeather);
  const weatherData = weather.data;
  const weatherLoading = weather.loading;
  const weatherError = weather.error;
  return (
    <div className="App" style={{ maxWidth: "1024px", margin: "0 auto" }}>
      <Search title="간단한 날씨 웹어플리케이션"></Search>

      {weatherLoading ? (
        <LinearProgress style={{ width: "100%" }} />
      ) : (
        weatherData !== null && <Weather data={weatherData}></Weather>
      )}
      {weatherError && (
        <Alert severity="error" style={{ width: "100%" }}>
          잘못된 도시명을 입력하셨습니다. 다시 입력해주세요.
        </Alert>
      )}
    </div>
  );
};

export default App;