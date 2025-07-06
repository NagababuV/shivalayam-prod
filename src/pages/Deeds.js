import { Box, Heading, Text } from "@chakra-ui/react";

export default function Deeds() {
  return (
    <Box p={6}>
      <Heading mb={4}>📜 Trust Deed Document</Heading>
      <Text>
        Below is the official deed of the "Sri Annapurna Sametha Visweswara Swamy Alaya Trust"
        registered on 14th June, 2025. It outlines the mission, values, and governance of the trust.
      </Text>

      <Box mt={4}>
        <iframe
          src="https://drive.google.com/file/d/1edrVSQq11K7NqZADBdG2ByxUH8fuqCFY/preview"
          width="100%"
          height="600px"
          title="Trust Deed PDF"
          style={{ border: "1px solid #ccc" }}
          allow="autoplay"
        />
      </Box>
    </Box>
  );
}
