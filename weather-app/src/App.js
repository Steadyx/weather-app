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
