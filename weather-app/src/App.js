import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import { Tiles } from "@rebass/layout";
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
  const [location, setLocation] = useState({});
  // State for forecast
  const [forecast, setForecast] = useState([]);

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
        setForecast(weatherData);
      } catch (err) {
        console.log(`There was an error: ${err}`);
      }
    };

    fetchData();
  }, []);

  // If a valid match for location is found populate the forecast array
  useEffect(() => {
    return weather.reduce((accum, currentVal) => {
      if (Math.floor(location.latitude) === Math.floor(currentVal.coord.lat)) {
        return setForecast(accum.concat({ ...currentVal }));
      } else {
        return accum;
      }
    }, []);
  }, [location, weather]);

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
    // If the input value is 0 thens set back to default weather list
    if (inputValue.length === 0) {
      setForecast(weather);
    }

    validPostcode(inputValue);
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Flex flexWrap="wrap" maxWidth="1024px" mx="auto" pt={2} pr={2} pl={2}>
          <Box mx="auto" width="100%" p={2}>
            <WeatherInput
              inputValue="Search for some weather"
              handleInput={handleInput}
            />
          </Box>
          <Box width={1 / 1} p={2}>
            <Text fontFamily="monospace">valid postcodes: </Text>
            {locations.map(({ postcode }) => (
              <Text fontFamily="monospace" key={`postcode-${postcode}`} pt={2}>
                {postcode}
              </Text>
            ))}
          </Box>
          <Tiles columns={[1, null, 2]}>
            {forecast.map((forecast, index) => (
              <Box width={1 / 1} p={2} key={`forecast-${index}`}>
                <WeatherCard forecast={forecast} />
              </Box>
            ))}
          </Tiles>
        </Flex>
      </ThemeProvider>
    </>
  );
};
