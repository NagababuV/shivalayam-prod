import React from "react";
import Footer from "./components/Footer";
import {
  ChakraProvider,
  Container,
  Box,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import Header from "./components/Header";
import PhotoCarousel from "./components/PhotoCarousel";
import Donations from "./components/Donations";
import AdminLogin from "./pages/AdminLogin";
import AdminUpload from "./pages/AdminUpload";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        bgGradient="linear(to-br, #fffaf0, #fef9e7)"
        backgroundAttachment="fixed"
      >
        <BrowserRouter>
          <Header />
          <Container maxW="container.md" py={8}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Box mb={8}>
                      <PhotoCarousel />
                    </Box>
                    <Donations />
                  </>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/upload" element={<AdminUpload />} />
            </Routes>
          </Container>
          <Footer /> 
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
