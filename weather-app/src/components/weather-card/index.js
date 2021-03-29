import { Fragment } from "react";
import { Flex, Box, Text, Heading, Card, Image } from "rebass";

export const WeatherCard = ({ forecast }) => {
  if (Object.keys(forecast).length === 0) return "Enter a postcode";

  const handleIcons = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const kelvinToCelcius = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  };
  console.log(forecast);
  return (
    <Card width="100" boxShadow="small">
      <Flex flexWrap="wrap">
        <Box width={1 / 1} pt={2}>
          <Heading fontFamily="monospace">{forecast.name}</Heading>
        </Box>
        <Box width={1 / 2}>
          <Text fontFamily="monospace" pt={2}>
            {forecast.clouds?.all}% Cloud Coverage
          </Text>
          {forecast.weather.map((value, index) => (
            <Fragment key={`cloud-cover-${index}`}>
              <Text fontFamily="monospace" pt={2}>
                {value.description}
              </Text>
              <Image src={handleIcons(value.icon)} />
            </Fragment>
          ))}
        </Box>
        <Box width={1 / 2}>
          <Text fontFamily="monospace" pt={2}>
            Main temp: {kelvinToCelcius(forecast.main.temp)} &#176;
          </Text>
          <Text fontFamily="monospace" pt={2}>
            max temp: {kelvinToCelcius(forecast.main.temp_max)} &#176;
          </Text>
          <Text fontFamily="monospace" pt={2}>
            max temp: {kelvinToCelcius(forecast.main.temp_min)} &#176;
          </Text>
        </Box>
        <Box width={1 / 2}></Box>
      </Flex>
    </Card>
  );
};
