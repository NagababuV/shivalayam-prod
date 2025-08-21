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
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { createPledge } from "../api/api";
import phonepeQR from "../images/phonepe-qr.png";
import unionQR from "../images/unionbank-qr.png";
import unioinBankLogo from "../images/union.png"
import phonePeLogo from "../images/phonepay.png";
import gpayLogo from "../images/googlepay.png";
import paytmLogo from "../images/paytm.png";

export default function Donate() {
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [touched, setTouched] = useState({});
  const [pledgeSaved, setPledgeSaved] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const trimValue = (val) => val.trim();
  const now = new Date().toLocaleString("en-IN");

  const validateFirstName = () => /^[A-Za-z]{1,}$/.test(trimValue(donorFirstName));
  const validateLastName = () => /^[A-Za-z]{1,}$/.test(trimValue(donorLastName));
  const validateMobile = () => /^[6-9]\d{9}$/.test(mobile);
  const validateAmount = () => parseFloat(amount) > 0;

  const isFirstNameError = touched.firstName && !validateFirstName();
  const isLastNameError = touched.lastName && !validateLastName();
  const isMobileError = touched.mobile && !validateMobile();
  const isAmountError = touched.amount && !validateAmount();
  const validateForm = () => validateFirstName() && validateLastName() && validateMobile() && validateAmount();
  const upiID = "QR919493575676-0106@unionbankofindia";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard.`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

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
        title: "Thank You 🙏",
        description: 'Your details are recorded. Kindly proceed with your donation using the options provided.',
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setPledgeSaved(true);
    } catch {
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
    const phonePeLink = `phonepe://pay?pa=${upiID}&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
      donorFirstName + " " + donorLastName
    )}`;

    const upiFallbackLink = `upi://pay?pa=${upiID}&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          {/* PhonePe Section */}
          <VStack
            p={4}
            border="1px solid #ddd"
            borderRadius="md"
            bg="white"
            spacing={4}
            transition="box-shadow 0.3s ease"
            _hover={{ boxShadow: "0 0 10px rgba(128, 90, 213, 0.3)" }} // subtle purple glow
          >
            <Text fontWeight="bold">Scan & Pay via PhonePe</Text>
            <Image src={phonepeQR} alt="PhonePe QR" maxH="250px" objectFit="contain" />

            <Button
              onClick={() => copyToClipboard("Q684141060@ybl")}
              size="sm"
              colorScheme="purple"
              variant="solid"
              leftIcon={<span role="img" aria-label="copy">📋</span>}
              _hover={{
                transform: "scale(1.05)",
                bgGradient: "linear(to-r, purple.400, purple.600)",
                boxShadow: "0 0 10px rgba(128, 90, 213, 0.5)",
              }}
              transition="all 0.3s ease"
            >
              Copy PhonePe UPI ID
            </Button>

          </VStack>

          {/* Union Bank Section */}
          <VStack
            p={4}
            border="1px solid #ddd"
            borderRadius="md"
            bg="white"
            spacing={4}
            transition="box-shadow 0.3s ease"
            _hover={{ boxShadow: "0 0 10px rgba(56,161,105, 0.3)" }} // subtle green glow
          >
            <Text fontWeight="bold">Union Bank UPI</Text>
            <Image src={unionQR} alt="Union Bank QR" maxH="250px" objectFit="contain" />

            <Button
              onClick={() => copyToClipboard("QR919493575676-0106@unionbankofindia")}
              size="sm"
              colorScheme="green"
              variant="solid"
              leftIcon={<span role="img" aria-label="copy">📋</span>}
              _hover={{
                transform: "scale(1.05)",
                bgGradient: "linear(to-r, green.400, green.600)",
                boxShadow: "0 0 10px rgba(72,187,120,0.5)",
              }}
              transition="all 0.3s ease"
            >
              Copy Bank UPI ID
            </Button>


          </VStack>
        </SimpleGrid>
        {/* PhonePe Modal */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>PhonePe Not Supported</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              📢 Currently, PhonePe payments via link are not supported.
              <br />
              <br />
              Please scan the QR code or continue with Google Pay / Paytm for a smooth payment experience.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* UPI Payment Logos Row - Circle Style */}
        <Flex
          justify="center"
          align="center"
          gap={{ base: 6, md: 10 }}
          wrap="wrap"
          my={6}
        >
          {[
            { src: phonePeLogo, alt: "PhonePe", link: phonePeLink },
            {
              src: gpayLogo,
              alt: "Google Pay",
              link: `tez://upi/pay?pa=${upiID}&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
                donorFirstName + " " + donorLastName
              )}`,
            },
            {
              src: paytmLogo,
              alt: "Paytm",
              link: `paytmmp://pay?pa=${upiID}&pn=ShivalayamTrust&am=${amount}&cu=INR&tn=Donation+by+${encodeURIComponent(
                donorFirstName + " " + donorLastName
              )}`,
            },
          ].map(({ src, alt, link }, index) => (
            <Box
              as="a"
              key={index}
              href={alt === "PhonePe" ? undefined : link}
              onClick={(e) => {
                if (alt === "PhonePe") {
                  e.preventDefault();
                  onOpen();
                } else {
                  setTimeout(() => (window.location.href = upiFallbackLink), 2000);
                }
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              borderRadius="full"
              p={3}
              boxShadow="sm"
              _hover={{ transform: "scale(1.12)", boxShadow: "md" }}
              transition="all 0.3s ease"
              w={{ base: "70px", md: "85px" }}
              h={{ base: "70px", md: "85px" }}
            >
              <Image
                src={src}
                alt={alt}
                boxSize={
                  alt === "PhonePe"
                    ? { base: "52px", md: "62px" }
                    : { base: "45px", md: "55px" }
                }
                objectFit="contain"
              />
            </Box>
          ))}
        </Flex>


        <Box borderRadius="lg" p={6} mt={6} bg="white" boxShadow="md" border="1px solid" borderColor="gray.200">
          <Heading fontSize="xl" mb={4} textAlign="center" color="red.600" fontWeight="semibold">
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
              <Text fontSize="sm" color="gray.500" mb={1}>
                Bank
              </Text>
              <Box display="flex" alignItems="center" gap={2}>
                <Image
                  src={unioinBankLogo}
                  alt="Union Bank logo"
                  boxSize="20px"
                  objectFit="contain"
                />
                <Text fontWeight="bold" color="gray.800">
                  Union Bank of India
                </Text>
              </Box>
            </Box>



            <Box>
              <Text fontSize="sm" color="gray.500">Account Number</Text>
              <Text fontWeight="bold" color="gray.800" cursor="pointer" _hover={{ color: "red.600" }} onClick={() => copyToClipboard("02811100000106")}>
                02811100000106 📋
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">IFSC Code</Text>
              <Text fontWeight="bold" color="gray.800" cursor="pointer" _hover={{ color: "red.600" }} onClick={() => copyToClipboard("UBIN0802816")}>
                UBIN0802816 📋
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Branch</Text>
              <Text fontWeight="bold" color="gray.800">Thokada</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box textAlign="center" mt={6}>
          <Button
            as="a"
            href={`https://wa.me/919493575676?text=${encodeURIComponent(
              `Namaste, I ${donorFirstName} ${donorLastName} have donated ₹${amount} on ${now}. Sharing the screenshot here.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            px={{ base: 5, md: 8 }} // less padding on small screens
            py={6}
            borderRadius="full"
            color="white"
            fontWeight="bold"
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            whiteSpace="normal"
            lineHeight="1.4"
            touchAction="manipulation"
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

  // 💰 Form before donation
  return (
    <Box maxW="500px" mx="auto" p={{ base: 4, md: 6 }} bg="white" borderRadius="2xl" boxShadow="xl" mt={{ base: 4, md: 8 }}>
      <Heading textAlign="center" fontSize={{ base: "xl", md: "2xl" }} color="orange.500" mb={2}>
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
