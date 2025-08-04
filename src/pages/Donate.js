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
  FormErrorMessage,
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
  const [touched, setTouched] = useState({});
  const [pledgeSaved, setPledgeSaved] = useState(false);

  const toast = useToast();

  // ✅ Helpers
  const trimValue = (val) => val.trim();

  const validateFirstName = () => /^[A-Za-z]{1,}$/.test(trimValue(donorFirstName));
  const validateLastName = () => /^[A-Za-z]{1,}$/.test(trimValue(donorLastName));
  const validateMobile = () => /^[6-9]\d{9}$/.test(mobile);
  const validateAmount = () => parseFloat(amount) > 0;

  const isFirstNameError = touched.firstName && !validateFirstName();
  const isLastNameError = touched.lastName && !validateLastName();
  const isMobileError = touched.mobile && !validateMobile();
  const isAmountError = touched.amount && !validateAmount();

  const validateForm = () =>
    validateFirstName() && validateLastName() && validateMobile() && validateAmount();

  const handlePledge = async () => {
    setTouched({ firstName: true, lastName: true, mobile: true, amount: true });

    if (!validateForm()) {
      toast({
        title: "Please correct errors",
        description: "Fill all fields correctly before proceeding 🙏",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await createPledge({
        donorFirstName: trimValue(donorFirstName),
        donorLastName: trimValue(donorLastName),
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

      setPledgeSaved(true);
    }
  };

  if (pledgeSaved) {
    // ✅ Deep links
    const phonePeLink = `phonepe://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
      donorFirstName + " " + donorLastName
    )}`;

    const upiFallbackLink = `upi://pay?pa=Q684141060@ybl&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
      donorFirstName + " " + donorLastName
    )}`;

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

        {/* Direct PhonePe + fallback */}
        <Button
          as="a"
          href={phonePeLink}
          onClick={(e) => {
            setTimeout(() => {
              window.location.href = upiFallbackLink; // fallback if PhonePe not installed
            }, 2000);
          }}
          size="lg"
          px={8}
          py={6}
          borderRadius="full"
          color="white"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          _hover={{ transform: "scale(1.05)" }}
          sx={{
            background: "linear-gradient(90deg, #0070F3, #7928CA)",
            animation: "blinkUpi 1.5s infinite",
            "@keyframes blinkUpi": {
              "0%": { background: "linear-gradient(90deg, #0070F3, #7928CA)", opacity: 1 },
              "50%": { background: "linear-gradient(90deg, #7928CA, #0070F3)", opacity: 0.7 },
              "100%": { background: "linear-gradient(90deg, #0070F3, #7928CA)", opacity: 1 },
            },
          }}
          width="100%"
          mb={6}
        >
          💳 Pay with PhonePe
        </Button>

        {/* Bank Transfer Info */}
        <Box
          borderRadius="lg"
          p={6}
          mt={6}
          bg="white"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading
            fontSize="xl"
            mb={4}
            textAlign="center"
            color="red.600"
            fontWeight="semibold"
          >
            Bank Transfer Details
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontSize="sm" color="gray.500">Account Name</Text>
              <Text fontWeight="bold" color="gray.800">
                SRI ANNAPURNA SAMETHA VISWESWARA SWAMY ALAYA TRUST
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">Bank</Text>
              <Text fontWeight="bold" color="gray.800">Union Bank of India</Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">Account Number</Text>
              <Text
                fontWeight="bold"
                color="gray.800"
                cursor="pointer"
                _hover={{ color: "red.600" }}
                onClick={() => navigator.clipboard.writeText("02811100000106")}
              >
                02811100000106 📋
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">IFSC Code</Text>
              <Text
                fontWeight="bold"
                color="gray.800"
                cursor="pointer"
                _hover={{ color: "red.600" }}
                onClick={() => navigator.clipboard.writeText("UBIN0802816")}
              >
                UBIN0802816 📋
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.500">Branch</Text>
              <Text fontWeight="bold" color="gray.800">Thokada</Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* WhatsApp Share Link */}
        <Box textAlign="center" mt={6}>
          <Button
            as="a"
            href={`https://wa.me/919493575676?text=${encodeURIComponent(
              `Namaste, I (${donorFirstName} ${donorLastName}) have donated ₹${amount}. Sharing the screenshot here.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            px={8}
            py={6}
            borderRadius="full"
            color="white"
            fontWeight="bold"
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            _hover={{ transform: "scale(1.05)" }}
            sx={{
              background: "linear-gradient(90deg, #25D366, #FF9933)",
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

  // ✅ Default: pledge form with improved styling
  return (
    <Box
      maxW="500px"
      mx="auto"
      p={{ base: 4, md: 6 }}
      bg="white"
      borderRadius="2xl"
      boxShadow="xl"
      mt={{ base: 4, md: 8 }}
    >
      <Heading
        textAlign="center"
        fontSize={{ base: "xl", md: "2xl" }}
        color="orange.500"
        mb={2}
      >
        Support the Divine Construction
      </Heading>
      <Text textAlign="center" mb={6} fontSize={{ base: "sm", md: "md" }} color="gray.600">
        Please enter your details and proceed with donation. 🙏
      </Text>

      <VStack spacing={5} align="stretch">
        <FormControl isRequired isInvalid={isFirstNameError}>
          <FormLabel fontWeight="semibold">First Name</FormLabel>
          <Input
            placeholder="Enter your first name"
            value={donorFirstName}
            onChange={(e) => setDonorFirstName(e.target.value)}
            onBlur={() => {
              setDonorFirstName(trimValue(donorFirstName));
              setTouched((prev) => ({ ...prev, firstName: true }));
            }}
            borderRadius="lg"
            focusBorderColor="orange.400"
          />
          {isFirstNameError && <FormErrorMessage>Enter at least 1 letter (A‑Z only).</FormErrorMessage>}
        </FormControl>

        <FormControl isRequired isInvalid={isLastNameError}>
          <FormLabel fontWeight="semibold">Last Name</FormLabel>
          <Input
            placeholder="Enter your last name"
            value={donorLastName}
            onChange={(e) => setDonorLastName(e.target.value)}
            onBlur={() => {
              setDonorLastName(trimValue(donorLastName));
              setTouched((prev) => ({ ...prev, lastName: true }));
            }}
            borderRadius="lg"
            focusBorderColor="orange.400"
          />
          {isLastNameError && <FormErrorMessage>Enter at least 1 letter (A‑Z only).</FormErrorMessage>}
        </FormControl>

        <FormControl isRequired isInvalid={isMobileError}>
          <FormLabel fontWeight="semibold">Mobile Number</FormLabel>
          <Input
            placeholder="Enter your mobile number"
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            onBlur={() => setTouched((prev) => ({ ...prev, mobile: true }))}
            borderRadius="lg"
            focusBorderColor="orange.400"
          />
          {isMobileError && <FormErrorMessage>Enter valid 10‑digit mobile number.</FormErrorMessage>}
        </FormControl>

        <FormControl isRequired isInvalid={isAmountError}>
          <FormLabel fontWeight="semibold">Amount (₹)</FormLabel>
          <Input
            placeholder="Enter donation amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
            borderRadius="lg"
            focusBorderColor="orange.400"
          />
          {isAmountError && <FormErrorMessage>Enter a valid amount greater than 0.</FormErrorMessage>}
        </FormControl>

        <Button
          size="lg"
          mt={2}
          py={6}
          borderRadius="full"
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          color="white"
          onClick={handlePledge}
          width="100%"
          bgGradient="linear(to-r, orange.400, red.500)"
          _hover={{
            bgGradient: "linear(to-r, red.500, orange.400)",
            transform: "scale(1.05)",
          }}
          transition="all 0.3s ease"
        >
          🙏 Save & Continue
        </Button>
      </VStack>
    </Box>
  );
}
