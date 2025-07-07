// src/pages/Donations.js
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Box,
  TableContainer,
  Grid,
  Input,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDonations, fetchTotal } from "../api/api";
import TopDonations from "../components/TopDonations";

export default function Donations() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fontSize = useBreakpointValue({ base: "sm", md: "md" });

  useEffect(() => {
    Promise.all([fetchDonations(), fetchTotal()])
      .then(([dRes, tRes]) => {
        setDonors(dRes.data);
        setFilteredDonors(dRes.data);
        setTotal(tRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    if (query === "") {
      setFilteredDonors(donors);
    } else {
      setFilteredDonors(
        donors.filter((d) =>
          `${d.donorFirstName || ""} ${d.donorLastName || ""}`
            .toLowerCase()
            .includes(query)
        )
      );
    }
  }, [search, donors]);

  if (loading) return <Spinner />;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "2fr 1fr" }}
      gap={6}
      px={{ base: 2, md: 4 }}
      py={4}
      alignItems="start"
    >
      {/* Left: Donation Table */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Donations
        </Text>

        <Box border="1px solid #eee" borderRadius="md" bg="white">
          <VStack spacing={2} p={3} align="stretch">
            <Input
              placeholder="Search by donor name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.50"
              fontSize={fontSize}
            />
          </VStack>

          <TableContainer
            maxH="220px" // roughly 4 rows based on your font & padding
            overflowY="auto"
            borderTop="1px solid #eee"
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
                    Donor
                  </Th>
                  <Th color="white" fontSize={fontSize} isNumeric>
                    Amount (₹)
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDonors.length === 0 ? (
                  <Tr>
                    <Td colSpan={2}>No matching donations found.</Td>
                  </Tr>
                ) : (
                  filteredDonors.map((d) => (
                    <Tr key={d.id}>
                      <Td fontSize={fontSize}>
                        {`${d.donorFirstName || ""} ${d.donorLastName || ""}`}
                      </Td>
                      <Td isNumeric fontSize={fontSize}>
                        {d.amount?.toLocaleString("en-IN")}
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Text fontSize="md" fontWeight="bold" mt={4}>
          Total Collected: ₹ {total.toLocaleString("en-IN")}
        </Text>
      </Box>

      {/* Right: Top Donors */}
      <TopDonations />
    </Grid>
  );
}
