import headerImg from "../images/header.png";
import {
  Box,
  Heading,
  Image,
  Flex,
  useBreakpointValue,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTotal } from "../api/api";
import CountUp from "react-countup";

export default function Header() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTotal()
      .then((res) => setTotal(res.data))
      .catch(console.error);
  }, []);

  const amountFontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Box bg="saffron.500" px={4} py={2} position="relative">
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

      {/* Total INR - Bottom Right */}
      <Box
        position="absolute"
        bottom={2}
        right={4}
        bg="white"
        color="green.700"
        px={3}
        py={1}
        borderRadius="md"
        fontWeight="bold"
        fontSize={amountFontSize}
        boxShadow="sm"
      >
        Total:{" "}
        <CountUp
          end={total}
          duration={5}
          separator=","
          decimals={0}
          formattingFn={formatINR}
        />
      </Box>
    </Box>
  );
}
