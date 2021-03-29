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
    <Card
      width="100"
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 6,
        boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
      }}
    >
      <Flex
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="center"
        mx={-2}
        textAlign="center"
      >
        <Box width={1 / 1} pt={2} bg="primary" p={2}>
          <Heading fontFamily="monospace">{forecast.name}</Heading>
        </Box>
        <Box width={1 / 2} p={2}>
          <Text fontFamily="monospace" pt={2} textAlign="center">
            {forecast.clouds?.all}% Cloud Coverage
          </Text>
          {forecast.weather.map((value, index) => (
            <Fragment key={`cloud-cover-${index}`}>
              <Text fontFamily="monospace" pt={2} textAlign="center">
                {value.description}
              </Text>
              <Image src={handleIcons(value.icon)} textAlign="center" />
            </Fragment>
          ))}
        </Box>
        <Box width={1 / 2} p={2}>
          <Text fontFamily="monospace" pt={2} textAlign="center">
            Current temp: {kelvinToCelcius(forecast.main.temp)} &#176;
          </Text>
          <Text fontFamily="monospace" pt={2} textAlign="center">
            Max temp: {kelvinToCelcius(forecast.main.temp_max)} &#176;
          </Text>
          <Text fontFamily="monospace" pt={2} textAlign="center">
            Max temp: {kelvinToCelcius(forecast.main.temp_min)} &#176;
          </Text>
        </Box>
        <Box width={1 / 1} p={2}>
          <Text fontFamily="monospace" pt={2} textAlign="center">
            Wind Speed: {forecast.wind.speed}kt
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
