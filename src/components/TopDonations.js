// src/components/TopDonations.js
import React, { useEffect, useState } from "react"
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { fetchTopDonations } from "../api/api";

const rankIcons = ["🥇", "🥈", "🥉", "⭐", "⭐"];

const TopDonations = () => {
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopDonations()
      .then((res) => setTopDonors(res.data))
      .catch((err) => console.error("Error fetching top donors:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      border="1px solid #eee"
      borderRadius="md"
      p={4}
      boxShadow="md"
      bg="white"
    >
      <Heading
        fontSize="xl"
        color="orange.500"
        mb={4}
        textAlign="center"
        borderBottom="1px solid #ddd"
        pb={2}
      >
        Top 5 Donors
      </Heading>

      {loading ? (
        <Spinner />
      ) : topDonors.length === 0 ? (
        <Text textAlign="center">No donations yet.</Text>
      ) : (
        <VStack spacing={3} align="stretch">
          {topDonors.map((donor, index) => (
            <HStack
              key={donor.id}
              p={3}
              borderRadius="md"
              bg={index % 2 === 0 ? "orange.50" : "gray.50"}
              justify="space-between"
            >
              <Text>
                {rankIcons[index] || "⭐"}{" "}
                <strong>{donor.donorName}</strong>
              </Text>
              <Text fontWeight="medium" color="green.700">
                ₹ {donor.amount.toLocaleString("en-IN")}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default TopDonations;
