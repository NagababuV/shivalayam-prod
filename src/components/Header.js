import headerImg from "../images/header.png";
import {
  Box,
  Heading,
  Button,
  Image,
  Flex,
  Stack,
  useBreakpointValue,
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
    <Box bg="saffron.500" px={4} py={2}>
      {/* Top Row: Buttons + Total */}
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Stack direction="row" spacing={2} align="center">
          <Button
            size="sm"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: "white", color: "saffron.500" }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Box
            px={3}
            py={0.5}
            bg="white"
            color="green.700"
            fontWeight="bold"
            borderRadius="md"
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
        </Stack>

        <Button
          size="sm"
          variant="outline"
          borderColor="white"
          color="white"
          _hover={{ bg: "white", color: "saffron.500" }}
          onClick={() => navigate("/admin/login")}
        >
          Admin Login
        </Button>
      </Flex>

      {/* Title Section */}
      <Flex
        align="center"
        justify="center"
        mt={2}
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
    </Box>
  );
}
