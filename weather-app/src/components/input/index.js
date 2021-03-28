import { Text } from "rebass";
import { Label, Input } from "@rebass/forms";

export const WeatherInput = ({ inputValue }) => {
  const handleInput = (event) => {};

  return (
    <>
      <Label htmlFor="weather-search">
        <Text>{inputValue}</Text>
      </Label>
      <Input name="weather-seach" />
    </>
  );
};
