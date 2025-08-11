import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
  useBreakpointValue,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { fetchTopDonations } from "../api/api";

// Rank-based background colors (mobile view)
const rankColors = [
  "#FFD70055", // 🥇 Gold for Rank 1
  "#C0C0C055", // 🥈 Silver for Rank 2
  "#CD7F3255", // 🥉 Bronze for Rank 3
  "#90EE9055", // 🌿 Light Green for Rank 4
  "#87CEFA55", // 🌊 Light Blue for Rank 5
];

// 🔹 Shrinks text ONLY if overflowing (used for mobile view)
const ShrinkingName = ({ children, maxFont = 14, minFont = 10 }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(maxFont);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      let currentFont = maxFont;
      const containerWidth = containerRef.current.offsetWidth;
      const measure = () => textRef.current.scrollWidth > containerWidth;

      while (measure() && currentFont > minFont) {
        currentFont -= 0.5;
        textRef.current.style.fontSize = `${currentFont}px`;
      }
      setFontSize(currentFont);
    }
  }, [children, maxFont, minFont]);

  return (
    <Box ref={containerRef} overflow="hidden" whiteSpace="nowrap">
      <Text
        ref={textRef}
        fontWeight="bold"
        fontSize={`${fontSize}px`}
        display="inline-block"
      >
        {children}
      </Text>
    </Box>
  );
};

const TopDonations = () => {
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    fetchTopDonations()
      .then((res) => setTopDonors(res.data))
      .catch((err) => console.error("Error fetching top donors:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (topDonors.length === 0) return <Text>No top donations yet.</Text>;

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Top 5 Donors
      </Text>

      {isMobile ? (
        // ---- Mobile: Card layout with shrinking text ----
        <Stack spacing={3}>
          {topDonors.map((donor, index) => (
            <Box
              key={donor.id}
              p={3}
              border="1px solid #eee"
              borderRadius="md"
              bg="white"
            >
              <Flex justify="space-between" align="center" gap={2}>
                <Box
                  px={2}
                  py={1}
                  borderRadius="md"
                  bg={rankColors[index] || "gray.100"}
                  flex="1"
                  minWidth={0}
                  overflow="hidden"
                >
                  <ShrinkingName>
                    {`${donor.donorLastName || ""} ${donor.donorFirstName || ""}`}
                  </ShrinkingName>
                </Box>

                <Text
                  color="orange.700"
                  fontWeight="semibold"
                  fontSize="sm"
                  flexShrink={0}
                  whiteSpace="nowrap"
                >
                  ₹ {donor.amount?.toLocaleString("en-IN")}
                </Text>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        // ---- Desktop/Tablet: Table layout without shrinking ----
        <TableContainer
          maxH="300px"
          overflowY="auto"
          border="1px solid #eee"
          borderRadius="md"
          sx={{
            "::-webkit-scrollbar": { width: "4px" },
            "::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          <Table variant="striped" size="sm" colorScheme="orange">
            <Thead bg="orange.500" position="sticky" top="0" zIndex={1}>
              <Tr>
                <Th color="white" fontSize={fontSize}>
                  Rank
                </Th>
                <Th color="white" fontSize={fontSize}>
                  Donor
                </Th>
                <Th color="white" fontSize={fontSize} isNumeric>
                  Amount (₹)
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {topDonors.map((donor, index) => (
                <Tr
                  key={donor.id}
                  bg={rankColors[index] || "transparent"}
                >
                  <Td fontSize={fontSize}>{index + 1}</Td>
                  <Td fontSize={fontSize} maxW="250px" isTruncated>
                    {`${donor.donorLastName || ""} ${donor.donorFirstName || ""}`}
                  </Td>
                  <Td isNumeric fontSize={fontSize}>
                    ₹ {donor.amount?.toLocaleString("en-IN")}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TopDonations;
