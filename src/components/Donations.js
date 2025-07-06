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
} from "@chakra-ui/react";
import { fetchDonations, fetchTotal } from "../api/api";
import { useEffect, useState } from "react";
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
    if (search.trim() === "") {
      setFilteredDonors(donors);
    } else {
      const query = search.toLowerCase();
      const filtered = donors.filter((d) =>
        d.donorName.toLowerCase().includes(query)
      );
      setFilteredDonors(filtered);
    }
  }, [search, donors]);

  if (loading) return <Spinner />;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "2fr 1fr" }}
      gap={6}
      px={{ base: 2, md: 4 }}
      py={4}
    >
      {/* Left: Donation List with Search */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Donations
        </Text>

        <Input
          placeholder="Search by donor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb={4}
          bg="white"
          fontSize={fontSize}
        />

        {!filteredDonors.length ? (
          <Text>No matching donations found.</Text>
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
                  <Th color="white" fontSize={fontSize}>
                    Donor
                  </Th>
                  <Th color="white" fontSize={fontSize} isNumeric>
                    Amount (₹)
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDonors.map((d) => (
                  <Tr key={d.id}>
                    <Td fontSize={fontSize}>{d.donorName}</Td>
                    <Td isNumeric fontSize={fontSize}>
                      {d.amount.toLocaleString("en-IN")}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        <Text fontSize="md" fontWeight="bold" mt={4}>
          Total Collected: ₹ {total.toLocaleString("en-IN")}
        </Text>
      </Box>

      {/* Right: Top Donors */}
      <Box>
        <TopDonations />
      </Box>
    </Grid>
  );
}
