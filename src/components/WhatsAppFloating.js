// src/components/WhatsAppFloating.js
import { Box, IconButton, Tooltip } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  const whatsappLink =
    "https://chat.whatsapp.com/FjzDctUjecCIEJfTzBMasP?mode=ac_t"; // Replace with your WhatsApp group/channel link

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="9999">
      <Tooltip label="Join our WhatsApp Group" hasArrow>
        <IconButton
          as="a"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          icon={<FaWhatsapp size="28" />}
          bg="#25D366" // ✅ Official WhatsApp Green
          color="white"
          borderRadius="full"
          boxShadow="0 4px 12px rgba(0,0,0,0.2)"
          size="lg"
          aria-label="Join WhatsApp Group"
          _hover={{
            transform: "scale(1.1)",
            bg: "#1ebe5d", // Slightly darker shade on hover
          }}
        />
      </Tooltip>
    </Box>
  );
}
