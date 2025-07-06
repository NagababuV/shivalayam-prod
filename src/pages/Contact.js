import { Box, Heading, Text, VStack, Link, Divider } from "@chakra-ui/react";

export default function Contact() {
  return (
    <Box p={6}>
      <Heading mb={4}>📍 Contact Information</Heading>

      <VStack align="start" spacing={3}>
        <Text>
          <strong>Temple Address:</strong><br />
          Sri Annapurna Sametha Visweswara Swamy Alayam,<br />
          D.No: 1-122/1, Thokada, Rajanagaram Mandalam,<br />
          East Godavari District, Andhra Pradesh - 533294
        </Text>

        <Text><strong>Chairman:</strong> Shri Vegisetti Chakrarao — 📞 +91-XXXXXXXXXX</Text>
        <Text><strong>Secretary:</strong> Shri B V V S Murthy — 📞 +91-XXXXXXXXXX</Text>
        <Text><strong>Email:</strong> templethokada@gmail.com</Text>

        <Divider />

        <Heading size="md">Temple Location Map:</Heading>
        <Box mt={3}>
          <iframe
            title="Temple Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.960140396488!2d82.123456!3d17.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xXXXXXXXXXXXXXX!2sThokada%2C%20AP!5e0!3m2!1sen!2sin!4v16976543210"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen=""
          />
        </Box>
      </VStack>
    </Box>
  );
}
