// src/pages/Donate.js
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react";
import phonepeQR from "../images/p.jpeg";

export default function Donate() {
  return (
    <Box>
      <Heading textAlign="center" fontSize="2xl" color="orange.500" mb={2}>
        Support the Divine Construction
      </Heading>
      <Text textAlign="center" mb={6} fontSize="md" px={4}>
        Your generous contribution helps us build the sacred Sri Annapurna Sametha Visweswara Swamy Alayam at Thokada, Rajahmundry.
      </Text>

      {/* PhonePe QR Centered */}
      <Center mb={10}>
        <VStack
          spacing={3}
          p={4}
          border="1px solid #ddd"
          borderRadius="md"
          bg="white"
          width={{ base: "100%", sm: "320px" }}
        >
          <Text fontWeight="bold" fontSize="lg">
            Scan & Pay via PhonePe
          </Text>
          <Image
            src={phonepeQR}
            alt="PhonePe QR"
            borderRadius="md"
            maxH="320px"
            objectFit="contain"
          />
          <Text fontSize="sm" color="gray.600" mt={1}>
            UPI ID: <strong>Q684141060@ybl</strong>
          </Text>
          <Text fontSize="sm" color="gray.500">
            Works with Paytm, GPay, PhonePe and other UPI apps
          </Text>
        </VStack>
      </Center>

      {/* Bank Transfer Info */}
      <Box
        border="1px solid #d33"
        borderRadius="md"
        p={4}
        bg="white"
        color="black"
        maxW="600px"
        mx="auto"
      >
        <Heading fontSize="lg" mb={3} color="red.600">
          Bank Transfer Details
        </Heading>
        <Text>
          <strong>Account Name:</strong> SRI ANNAPURNA SAMETHA VISWESWARA SWAMY ALAYA TRUST
        </Text>
        <Text>
          <strong>Bank:</strong> Union Bank of India
        </Text>
        <Text>
          <strong>Account Number:</strong> 02811100000106
        </Text>
        <Text>
          <strong>IFSC Code:</strong> UBIN0802816
        </Text>
      </Box>
    </Box>
  );
}
