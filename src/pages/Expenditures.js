import { useEffect, useState } from "react";
import { fetchExpenditures, fetchTotalSpent, fetchTotal } from "../api/api";
import {
  Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner
} from "@chakra-ui/react";
import CountUp from "react-countup";

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalCollected, setTotalCollected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expRes, spentRes, collectedRes] = await Promise.all([
          fetchExpenditures(),
          fetchTotalSpent(),
          fetchTotal(),
        ]);
        setExpenditures(expRes.data);
        setTotalSpent(spentRes.data);
        setTotalCollected(collectedRes.data);
      } catch (err) {
        console.error("Failed to fetch expenditures", err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6} maxW="900px" mx="auto">
      <Heading mb={4} color="orange.500">Construction Spendings</Heading>

      {/* ✅ Added total collected box */}
      <Box mb={4} p={3} borderRadius="md" bg="green.50" boxShadow="sm">
        <Text fontWeight="bold" color="green.700">
          Total Collected:{" "}
          <CountUp
            end={totalCollected}
            duration={5}
            separator=","
            formattingFn={formatINR}
          />
        </Text>
      </Box>

      <Text fontSize="lg" mb={4}>Total Spent: ₹{totalSpent}</Text>

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
