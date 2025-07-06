import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function About() {
  return (
    <Box p={6}>
      <Heading mb={4}>🛕 About the Temple</Heading>
      <VStack spacing={4} align="start">
        <Text>
          Sri Annapurna Sametha Visweswara Swamy Alayam in Thokada is a sacred place established
          to promote Sanatan Dharma and Vedic traditions. The temple was formed through
          contributions from the community with a vision of spiritual upliftment and service.
        </Text>
        <Text>
          Regular poojas, homams, aartis, and festivals like Maha Shivaratri and Kartika Masam
          are performed with devotion. The temple is also involved in social welfare activities
          such as Annadanam (free food), education support, and health camps.
        </Text>
      </VStack>
    </Box>
  );
}
