import { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Flex, Box } from "rebass";
import preset from "@rebass/preset";
import { WeatherInput } from "./components/input/";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export const App = () => {
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState([]);

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

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={preset}>
        <Flex>
          <Box mx="auto" maxWidth="1024px" width="100%">
            <WeatherInput inputValue="Search for some weather" />
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
};

export default App;
