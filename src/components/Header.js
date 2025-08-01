// src/components/Header.js
import {
  Box,
  Heading,
  Image,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import headerImg from "../images/header.png";

export default function Header() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Deeds", path: "/deeds" },
    { label: "Contact", path: "/contact" },
    { label: "Admin Login", path: "/admin/login" },
  ];

  return (
    <Box bg="saffron.500" px={4} py={3} boxShadow="md">
      {/* Top Row with Logo + Title + Hamburger */}
      <Flex
        align="center"
        justify="space-between"
        direction="row"
        wrap="wrap"
        textAlign="center"
      >
        {/* Logo + Title Block */}
        <Flex
          align="center"
          gap={4}
          justify="center"
          flex="1"
          direction={{ base: "column", md: "row" }}
        >
          <Image
            src={headerImg}
            alt="Temple Logo"
            height={{ base: "70px", md: "80px" }}
            objectFit="contain"
          />
          <Heading
            color="white"
            fontSize={{ base: "lg", md: "2xl" }}
            letterSpacing="widest"
            lineHeight="1.4"
            textAlign={{ base: "center", md: "left" }}
          >
            శ్రీ అన్నపూర్ణ సమేత విశ్వేశ్వర స్వామి ఆలయం తోకాడ
            <br />
            <Box
              as="span"
              fontSize={{ base: "sm", md: "md" }}
              display="block"
              mt={1}
            >
              SRI ANNAPURNA SAMETHA VISWESWARA SWAMY ALAYAM THOKADA
            </Box>
          </Heading>
        </Flex>

        {/* Desktop Menu */}
        <HStack
          spacing={6}
          display={{ base: "none", md: "flex" }}
          fontWeight="bold"
          ml={8}
        >
          {menuItems.map((item) => (
            <ChakraLink
              key={item.label}
              onClick={() => navigate(item.path)}
              color="white"
              _hover={{ color: "yellow.300", textDecoration: "none" }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </HStack>

        {/* Mobile Hamburger */}
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          color="white"
          variant="ghost"
          fontSize="2xl"
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="bold" borderBottomWidth="1px">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              {menuItems.map((item) => (
                <ChakraLink
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  fontWeight="bold"
                  color="saffron.500"
                  _hover={{ color: "orange.600", textDecoration: "none" }}
                >
                  {item.label}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
