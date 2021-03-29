import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import { Flex, Box } from "rebass";
import theme from "@rebass/preset";
import { WeatherInput } from "./components/input/";
import { WeatherCard } from "./components/weather-card/";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export const App = () => {
  // State for locations
  const [locations, setLocations] = useState([]);
  // State for weather
  const [weather, setWeather] = useState([]);
  // State for postcode
  const [postcode, setPostcode] = useState("");
  // State for location
  const [location, setLocation] = useState({});
  // State for forecast
  const [forecast, setForecast] = useState({});

  // Fetch Data to pass down to components
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await fetch("http://localhost:3030/locations");
        const weatherResponse = await fetch("http://localhost:3030/weather");
        const locationData = await locationResponse.json();
        const weatherData = await weatherResponse.json();

        setLocations(locationData);
        setWeather(weatherData);
      } catch (err) {
        console.log(`There was an error: ${err}`);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return weather.reduce((accum, currentVal) => {
      if (Math.floor(location.latitude) === Math.floor(currentVal.coord.lat)) {
        return setWeather(accum.concat({ ...currentVal }));
      }

      return accum;
    }, []);
  }, [location]);

  // Reduce over the values from locations to check if postcode is valid
  const validPostcode = (inputValue) => {
    return locations.reduce((accum, currentVal) => {
      if (currentVal.postcode === inputValue) {
        return setLocation({ ...accum, ...currentVal });
      }
      return accum;
    }, {});
  };

  // Move the input handle into parent component
  // so that the values can be tracked
  const handleInput = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length === 0) {
      setForecast({});
    }

    setPostcode(inputValue);
    validPostcode(inputValue);
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex flexWrap="wrap" maxWidth="1200" mx="auto" pt={2} pr={2} pl={2}>
          <Box mx="auto" width="100%" bg="primary" p={2}>
            <WeatherInput
              inputValue="Search for some weather"
              handleInput={handleInput}
              postcode={postcode}
            />
          </Box>
          {weather.map((forecast) => (
            <Box width={1 / 2} p={2}>
              <WeatherCard forecast={forecast} />
            </Box>
          ))}
        </Flex>
      </ThemeProvider>
    </>
  );
};
