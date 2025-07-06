import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTotal } from "../api/api";
import CountUp from "react-countup";

export default function Footer() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTotal()
      .then((res) => setTotal(res.data))
      .catch(console.error);
  }, []);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Box bg="saffron.500" color="white" py={6} mt={10} px={4} position="relative">
      {/* Total on top-right */}
      <Box position="absolute" top={2} right={4}>
        <Text
          bg="white"
          color="green.700"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="md"
          boxShadow="md"
        >
          Total Collected:{" "}
          <CountUp
            end={total}
            duration={5}
            separator=","
            formattingFn={formatINR}
          />
        </Text>
      </Box>

      <VStack spacing={2} textAlign="center" mt={6}>
        <Text fontWeight="bold" fontSize="lg">
          శ్రీ అన్నపూర్ణ సమేత విశ్వేశ్వర స్వామి ఆలయ కమిటీ
        </Text>
        <Text>
          తోకడ గ్రామం, రాజమహేంద్రవరం, తూర్పు గోదావరి జిల్లా, ఆంధ్రప్రదేశ్ – 533296
        </Text>
        <Text>📞 సంప్రదించండి: +91 82705 926XX</Text>
        <Text fontSize="sm" mt={2} opacity={0.8}>
          Developed by NV Tech
        </Text>
      </VStack>
    </Box>
  );
}
