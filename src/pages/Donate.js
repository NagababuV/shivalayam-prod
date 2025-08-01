// src/pages/Donate.js
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaGooglePay } from "react-icons/fa"; // GPay icon approx
import { SiPhonepe, SiPaytm } from "react-icons/si"; // PhonePe & Paytm icons
import phonepeQR from "../images/p.jpeg";
import unionQR from "../images/unionbank-qr.png";

export default function Donate() {
  // Replace UPI IDs with your actual merchant/payment UPI IDs
  const phonePeLink = "upi://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&cu=INR";
  const gpayLink = "upi://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&cu=INR";
  const paytmLink = "upi://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&cu=INR";

  return (
    <Box>
      <Heading textAlign="center" fontSize="2xl" color="orange.500" mb={2}>
        Support the Divine Construction
      </Heading>
      <Text textAlign="center" mb={6} fontSize="md" px={4}>
        Your generous contribution helps us build the sacred Sri Annapurna Sametha
        Visweswara Swamy Alayam at Thokada, Rajahmundry.
      </Text>

      {/* QR Codes */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10} px={4}>
        {/* PhonePe */}
        <VStack
          spacing={3}
          p={4}
          border="1px solid #ddd"
          borderRadius="md"
          bg="white"
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
          <Text fontSize="sm" color="gray.600">
            UPI ID: <strong>Q684141060@ybl</strong>
          </Text>

          {/* Payment App Icons */}
          <HStack spacing={4} mt={2}>
            <Tooltip label="Pay with PhonePe">
              <IconButton
                as="a"
                href={phonePeLink}
                target="_blank"
                rel="noopener noreferrer"
                icon={<SiPhonepe size={28} />}
                aria-label="PhonePe"
                color="white"
                bg="#5f259f"
                _hover={{ bg: "#6c33b4" }}
                borderRadius="full"
              />
            </Tooltip>
            <Tooltip label="Pay with Google Pay">
              <IconButton
                as="a"
                href={gpayLink}
                target="_blank"
                rel="noopener noreferrer"
                icon={<FaGooglePay size={28} />}
                aria-label="GPay"
                color="white"
                bg="#4285F4"
                _hover={{ bg: "#3367D6" }}
                borderRadius="full"
              />
            </Tooltip>
            <Tooltip label="Pay with Paytm">
              <IconButton
                as="a"
                href={paytmLink}
                target="_blank"
                rel="noopener noreferrer"
                icon={<SiPaytm size={28} />}
                aria-label="Paytm"
                color="white"
                bg="#00baf2"
                _hover={{ bg: "#009ec1" }}
                borderRadius="full"
              />
            </Tooltip>
          </HStack>
        </VStack>

        {/* Union Bank */}
        <VStack
          spacing={3}
          p={4}
          border="1px solid #ddd"
          borderRadius="md"
          bg="white"
        >
          <Text fontWeight="bold" fontSize="lg">
            Union Bank UPI
          </Text>
          <Image
            src={unionQR}
            alt="Union Bank QR"
            borderRadius="md"
            maxH="320px"
            objectFit="contain"
          />
          <Text fontSize="sm" color="gray.600">
            UPI ID: <strong>QR919493575676-0106@unionbankofindia</strong>
          </Text>
        </VStack>
      </SimpleGrid>

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
        <Text>
          <strong>Branch:</strong> Thokada
        </Text>
      </Box>
    </Box>
  );
}
