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
import { keyframes } from "@emotion/react";
import { fetchTopDonations } from "../api/api";

// Rank-based background colors (mobile view)
const rankColors = [
  "#FFD70055", // Gold
  "#C0C0C055", // Silver
  "#CD7F3255", // Bronze
  "#90EE9055", // Light Green
  "#87CEFA55", // Light Blue
];

// 🔹 Smooth scrolling animation for long names
const marquee = keyframes`
  0% { transform: translateX(0%); }
  40% { transform: translateX(0%); }
  50% { transform: translateX(-50%); }
  90% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
`;

const ScrollingName = ({ children }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const boxWidth = containerRef.current.offsetWidth;
      setIsOverflow(textWidth > boxWidth);
    }
  }, [children]);

  return (
    <Box ref={containerRef} overflow="hidden" whiteSpace="nowrap" minWidth={0}>
      <Text
        ref={textRef}
        fontWeight="bold"
        fontSize="sm"
        display="inline-block"
        animation={isOverflow ? `${marquee} 6s ease-in-out infinite` : "none"}
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
        // ---- Mobile View: No ranks, fixed amount cutoff issue ----
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
                  minWidth={0} // allows text to scroll without pushing amount
                  overflow="hidden"
                >
                  <ScrollingName>
                    {`${donor.donorLastName || ""} ${donor.donorFirstName || ""}`}
                  </ScrollingName>
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
        // ---- Desktop/Tablet View: Keep original table with ranks ----
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
                {/* <Th color="white" fontSize={fontSize}>
                  Rank
                </Th> */}
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
                  {/* <Td fontSize={fontSize}>{index + 1}</Td> */}
                  <Td fontSize={fontSize}>
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
