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
  // State for locations
  const [locations, setLocations] = useState([]);
  // State for weather
  const [weather, setWeather] = useState([]);
  // State for postcode
  const [postcode, setPostcode] = useState("");
  // State for postcode
  const [location, setLocation] = useState({});

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

  // Map over the values from locationns to check if postcode is valid
  const validPostcode = (inputValue) => {
    return locations.reduce((accum, currentVal) => {
      console.log(inputValue);
      if (currentVal.postcode === inputValue) {
        return setLocation({ ...location, ...currentVal });
      }
      return accum;
    }, {});
  };

  // Move the input handle into parent component
  // so that the values can be tracked
  const handleInput = (event) => {
    const inputValue = event.target.value;
    setPostcode(inputValue);
    validPostcode(inputValue);
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={preset}>
        <Flex>
          <Box mx="auto" maxWidth="1024px" width="100%">
            <WeatherInput
              inputValue="Search for some weather"
              handleInput={handleInput}
              postcode={postcode}
            />
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
};

export default App;
