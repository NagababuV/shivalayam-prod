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

// Rank-based background colors
const rankColors = [
  "#FFD70055", // Gold
  "#C0C0C055", // Silver
  "#CD7F3255", // Bronze
  "#90EE9055", // Light Green
  "#87CEFA55", // Light Blue
];

// Shrinking text helper
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

  const fontSize = useBreakpointValue({ base: "md", md: "md" }); // bigger on mobile
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
    <Box w="100%" px={{ base: 2, md: 0 }}>
      <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mb={2} textAlign="center">
        Top 5 Donors
      </Text>

      {isMobile ? (
        // Mobile view
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
                  fontSize="md"
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
        // Desktop view
        <TableContainer
          maxH="300px"
          overflowY="auto"
          overflowX="auto"
          border="1px solid #eee"
          borderRadius="md"
          w="100%"
          sx={{
            "::-webkit-scrollbar": { width: "4px", height: "4px" },
            "::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: "4px",
            },
          }}
        >
          <Table variant="striped" size="md" colorScheme="orange" minW="500px">
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
                <Tr key={donor.id} bg={rankColors[index] || "transparent"}>
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
