// src/components/Footer.js
import { Box, Text, VStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="saffron.500" color="white" py={6} mt={10}>
      <VStack spacing={2} textAlign="center">
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
