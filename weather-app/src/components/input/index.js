import { Text } from "rebass";
import { Label, Input } from "@rebass/forms";

export const WeatherInput = ({ inputValue, handleInput, postcode }) => (
  <>
    <Label htmlFor="weather-search" pb={2}>
      <Text fontFamily="monospace">{inputValue}</Text>
    </Label>
    <Input name="weather-seach" onChange={handleInput} value={postcode} />
  </>
);
