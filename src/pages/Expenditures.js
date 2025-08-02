// src/pages/Expenditures.js
import { useEffect, useState } from "react";
import { fetchExpenditures, fetchTotalSpent } from "../api/api";
import {
  Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner
} from "@chakra-ui/react";

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expRes, totalRes] = await Promise.all([
          fetchExpenditures(),
          fetchTotalSpent(),
        ]);
        setExpenditures(expRes.data);
        setTotal(totalRes.data);
      } catch (err) {
        console.error("Failed to fetch expenditures", err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6} maxW="900px" mx="auto">
      <Heading mb={4} color="orange.500">Construction Spendings</Heading>
      <Text fontSize="lg" mb={4}>Total Spent: ₹{total}</Text>

      <TableContainer border="1px solid #ddd" borderRadius="md">
        <Table variant="striped" size="sm" colorScheme="red">
          <Thead bg="red.500">
            <Tr>
              <Th color="white">Description</Th>
              <Th color="white">Paid To</Th>
              <Th color="white" isNumeric>Amount (₹)</Th>
              <Th color="white">Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenditures.map((e) => (
              <Tr key={e.id}>
                <Td>{e.description}</Td>
                <Td>{e.paidTo}</Td>
                <Td isNumeric>{e.amount}</Td>
                <Td>{e.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
