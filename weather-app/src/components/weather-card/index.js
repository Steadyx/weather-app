import { Flex, Box, Text, Heading, Card } from "rebass";

export const WeatherCard = ({ forecast }) => {
  if (Object.keys(forecast).length === 0) return "Enter a postcode";

  return (
    <Card width="100" boxShadow="small">
      <Flex flexWrap="wrap">
        <Box width={1 / 1} pt={2}>
          <Heading fontFamily="monospace">{forecast.name}</Heading>
        </Box>
        <Box>
          <Heading fontFamily="monospace" pt={2}>
            {forecast.clouds?.all}% Cloud Coverage
          </Heading>
        </Box>
      </Flex>
    </Card>
  );
};
