// src/components/TopDonations.js
import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { fetchTopDonations } from "../api/api";

const rankIcons = ["🥇", "🥈", "🥉", "⭐", "⭐"];

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

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Top 5 Donors
      </Text>

      {loading ? (
        <Spinner />
      ) : topDonors.length === 0 ? (
        <Text>No top donations yet.</Text>
      ) : (
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
                <Th color="white" fontSize={fontSize}>Rank</Th>
                <Th color="white" fontSize={fontSize}>Donor</Th>
                <Th color="white" fontSize={fontSize} isNumeric>Amount (₹)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {topDonors.map((donor, index) => (
                <Tr key={donor.id}>
                  <Td fontSize={fontSize}>{rankIcons[index] || "⭐"}</Td>
                  <Td fontSize={fontSize}>
                    {`${donor.donorFirstName || ""} ${donor.donorLastName || ""}`}
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
