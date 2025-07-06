import headerImg from "../images/header.png";
import {
  Box,
  Heading,
  Image,
  Flex,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box bg="saffron.500" px={4} py={2}>
      {/* Title Section */}
      <Flex
        align="center"
        justify="center"
        direction={{ base: "column", md: "row" }}
        textAlign="center"
      >
        <Image
          src={headerImg}
          alt="Temple Header"
          height="60px"
          objectFit="contain"
          mr={{ md: 4 }}
          mb={{ base: 2, md: 0 }}
        />
        <Heading
          color="white"
          fontSize="3xl"
          letterSpacing="widest"
          lineHeight="1.2"
        >
          శ్రీ అన్నపూర్ణ సమేత విశ్వేశ్వర స్వామి ఆలయం తోకడ
          <br />
          <Box as="span" fontSize="xl">
            SRI ANNAPURNA SAMETHA VISWESWARA SWAMY ALAYAM THOKADA
          </Box>
        </Heading>
      </Flex>

      {/* Navigation Menu */}
      <HStack
        mt={3}
        spacing={4}
        justify="center"
        flexWrap="wrap"
        width="100%"
      >
        <ChakraLink
          onClick={() => navigate("/")}
          color="white"
          fontWeight="bold"
          _hover={{ color: "yellow.300", textDecoration: "none" }}
        >
          Home
        </ChakraLink>
        <ChakraLink
          onClick={() => navigate("/about")}
          color="white"
          fontWeight="bold"
          _hover={{ color: "yellow.300", textDecoration: "none" }}
        >
          About
        </ChakraLink>
        <ChakraLink
          onClick={() => navigate("/deeds")}
          color="white"
          fontWeight="bold"
          _hover={{ color: "yellow.300", textDecoration: "none" }}
        >
          Deeds
        </ChakraLink>
        <ChakraLink
          onClick={() => navigate("/contact")}
          color="white"
          fontWeight="bold"
          _hover={{ color: "yellow.300", textDecoration: "none" }}
        >
          Contact
        </ChakraLink>
        <ChakraLink
          onClick={() => navigate("/admin/login")}
          color="white"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="md"
          _hover={{
            bg: "white",
            color: "saffron.500",
            textDecoration: "none",
            boxShadow: "md",
          }}
        >
          Admin Login
        </ChakraLink>
      </HStack>
    </Box>
  );
}
