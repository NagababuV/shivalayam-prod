// src/pages/About.js
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function About() {
  return (
    <Box p={6}>
      <Heading mb={4} fontSize="2xl" color="orange.500">
        🛕 About the Temple
      </Heading>

      <VStack spacing={5} align="start">
        <Text fontSize="md">
          <strong>Sri Annapurna Sametha Visweswara Swamy Alayam</strong>, located in Thokada near
          Rajahmundry, is a sacred abode dedicated to the divine union of <strong>Lord Visweswara Swamy</strong> and
          <strong> Goddess Annapurna Devi</strong>. The temple is being built through the devotion
          and generous support of villagers and well-wishers who believe in preserving
          <strong> Sanatan Dharma</strong> and age-old <strong>Vedic values</strong>.
        </Text>

        <Text fontSize="md">
          Daily rituals including <strong>Abhishekams, Aartis</strong>, and special
          <strong> Homams</strong> are performed with divine fervor. Grand celebrations take place
          during major festivals such as <strong>Maha Shivaratri</strong> and{" "}
          <strong>Kartika Masam</strong>, uniting devotees in devotion and service.
        </Text>

        <Text fontSize="md">
          On auspicious occasions, the temple also conducts <strong>Annadanam</strong> — the
          sacred offering of free meals to devotees and the community — as a gesture of
          compassion and spiritual fulfillment.
        </Text>

        <Text fontSize="md">
          This spiritual endeavor continues to thrive through the love and contributions of
          devotees across the globe. We humbly invite you to be part of this divine mission —
          <strong> your donation, small or large, helps us complete the construction and serve
          devotees with dignity and devotion</strong>.
        </Text>

        <Text fontSize="md" color="green.600" fontWeight="bold">
          🕉️ Let’s build a sacred space together — brick by brick, prayer by prayer.
        </Text>
      </VStack>
    </Box>
  );
}
