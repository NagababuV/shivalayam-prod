// src/pages/Donate.js
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { createPledge } from "../api/api";

// Import QR images
import phonepeQR from "../images/phonepe-qr.png";
import unionQR from "../images/unionbank-qr.png";

export default function Donate() {
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [pledgeSaved, setPledgeSaved] = useState(false);

  const toast = useToast();

  // ✅ Validation function
  const validateForm = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const amt = parseFloat(amount);

    if (!nameRegex.test(donorFirstName)) {
      toast({ title: "Invalid First Name", description: "Only alphabets, min 2 chars.", status: "error" });
      return false;
    }
    if (!nameRegex.test(donorLastName)) {
      toast({ title: "Invalid Last Name", description: "Only alphabets, min 2 chars.", status: "error" });
      return false;
    }
    if (!mobileRegex.test(mobile)) {
      toast({ title: "Invalid Mobile", description: "Enter valid 10-digit mobile.", status: "error" });
      return false;
    }
    if (isNaN(amt) || amt <= 0) {
      toast({ title: "Invalid Amount", description: "Enter a valid amount greater than 0.", status: "error" });
      return false;
    }
    return true;
  };

  const handlePledge = async () => {
    if (!validateForm()) return;

    try {
      await createPledge({
        donorFirstName,
        donorLastName,
        mobile,
        amount: parseFloat(amount),
      });

      toast({
        title: "Pledge Submitted 🙏",
        description: "Your pledge has been recorded. Please complete the donation using the options below.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setPledgeSaved(true);
    } catch (err) {
      console.error(err);
      toast({
        title: "Backend not responding",
        description: "Proceeding directly to donation page. 🙏",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });

      // ✅ Even if backend fails, still show donation page
      setPledgeSaved(true);
    }
  };

  if (pledgeSaved) {
    return (
      <Box p={6} bg="white" borderRadius="md" boxShadow="lg" maxW="700px" mx="auto">
        <Heading textAlign="center" fontSize="2xl" color="orange.500" mb={4}>
          Complete Your Donation
        </Heading>
        <Text textAlign="center" mb={6}>
          Thank you {donorFirstName} 🙏. Please use one of the following methods to make your donation.
        </Text>

        {/* QR Codes */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          <VStack p={4} border="1px solid #ddd" borderRadius="md" bg="white">
            <Text fontWeight="bold">Scan & Pay via PhonePe</Text>
            <Image src={phonepeQR} alt="PhonePe QR" maxH="250px" objectFit="contain" />
            <Text fontSize="sm" color="gray.600">
              UPI ID: <strong>Q684141060@ybl</strong>
            </Text>
          </VStack>

          <VStack p={4} border="1px solid #ddd" borderRadius="md" bg="white">
            <Text fontWeight="bold">Union Bank UPI</Text>
            <Image src={unionQR} alt="Union Bank QR" maxH="250px" objectFit="contain" />
            <Text fontSize="sm" color="gray.600">
              UPI ID: <strong>QR919493575676-0106@unionbankofindia</strong>
            </Text>
          </VStack>
        </SimpleGrid>

        {/* Direct UPI link */}
        <Button
          as="a"
          href={`upi://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
            donorFirstName + " " + donorLastName
          )}`}
          colorScheme="green"
          size="lg"
          width="100%"
          mb={6}
        >
          Pay with UPI App
        </Button>

        {/* Bank Transfer Info */}
        <Box border="1px solid #d33" borderRadius="md" p={4} bg="white">
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

        {/* WhatsApp Share Link */}
        <Box textAlign="center" mt={6}>
          <Button
            as="a"
            href={`https://wa.me/919493575676?text=Namaste,%20I%20(${donorFirstName}%20${donorLastName})%20have%20donated%20₹${amount}.%20Sharing%20the%20screenshot%20here.`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            px={8}
            py={6}
            borderRadius="full"
            color="white"
            fontWeight="bold"
            _hover={{ transform: "scale(1.05)" }}
            sx={{
              background: "linear-gradient(90deg, #25D366, #FF9933)", // WhatsApp green → Saffron
              animation: "blinkBg 1.5s infinite",
              "@keyframes blinkBg": {
                "0%": { background: "linear-gradient(90deg, #25D366, #FF9933)", opacity: 1 },
                "50%": { background: "linear-gradient(90deg, #FF9933, #25D366)", opacity: 0.7 },
                "100%": { background: "linear-gradient(90deg, #25D366, #FF9933)", opacity: 1 },
              },
            }}
          >
            📲 Share Payment Screenshot on WhatsApp
          </Button>
        </Box>
      </Box>
    );
  }

  // ✅ Default: pledge form
  return (
    <Box maxW="500px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="lg">
      <Heading textAlign="center" fontSize="2xl" color="orange.500" mb={4}>
        Support the Divine Construction
      </Heading>
      <Text textAlign="center" mb={6}>
        Please enter your details and proceed with donation. 🙏
      </Text>

      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter your first name"
            value={donorFirstName}
            onChange={(e) => setDonorFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter your last name"
            value={donorLastName}
            onChange={(e) => setDonorLastName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input
            placeholder="Enter your mobile number"
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Amount (₹)</FormLabel>
          <Input
            placeholder="Enter donation amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="orange" size="lg" mt={4} onClick={handlePledge}>
          Save & Continue
        </Button>
      </VStack>
    </Box>
  );
}
