import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Noto Serif', serif",
    body: "'Noto Serif', serif",
  },
  colors: {
    saffron: { 500: "#FF9933" },
    maroon: { 500: "#800000" },
    gold: { 500: "#DAA520" },
  },
});

export default theme;