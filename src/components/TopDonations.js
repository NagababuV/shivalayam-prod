import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Text,
  Stack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { fetchTopDonations } from "../api/api";

// Rank-based background colors
const rankColors = [
  "#FFD70055", // Gold
  "#C0C0C055", // Silver
  "#CD7F3255", // Bronze
  "#90EE9055", // Light Green
  "#87CEFA55", // Light Blue
];

const TopDonations = () => {
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fontSize = useBreakpointValue({ base: "sm", md: "md" });

  useEffect(() => {
    fetchTopDonations()
      .then((res) => setTopDonors(res.data))
      .catch((err) => console.error("Error fetching top donors:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box textAlign="center" py={6}>
        <Spinner />
      </Box>
    );

  if (topDonors.length === 0)
    return (
      <Text textAlign="center" py={4}>
        No top donations yet.
      </Text>
    );

  return (
    <Box w="100%" px={{ base: 2, md: 0 }}>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        Top 5 Donors
      </Text>

      {/* Single responsive card layout for all screen sizes */}
      <Stack spacing={3}>
        {topDonors.map((donor, index) => {
          const fullName = `${donor.donorLastName || ""} ${
            donor.donorFirstName || ""
          }`.trim();
          const nameLength = fullName.length;

          return (
            <Box
              key={donor.id}
              p={3}
              border="1px solid #eee"
              borderRadius="md"
              bg="white"
              _hover={{ boxShadow: "md" }}
            >
              <Flex justify="space-between" align="center" gap={2} flexWrap="wrap">
                <Box
                  px={2}
                  py={1}
                  borderRadius="md"
                  bg={rankColors[index] || "gray.100"}
                  flex="1"
                  minWidth={0}
                >
                  <Text
                    fontWeight="bold"
                    fontSize={fontSize}
                    isTruncated={nameLength < 35}
                    whiteSpace={nameLength < 35 ? "nowrap" : "normal"}
                    wordBreak="break-word"
                  >
                    {fullName}
                  </Text>
                </Box>

                <Text
                  color="orange.700"
                  fontWeight="semibold"
                  fontSize="md"
                  flexShrink={0}
                  whiteSpace="nowrap"
                >
                  ₹ {donor.amount?.toLocaleString("en-IN")}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TopDonations;
