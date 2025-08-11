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
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { fetchDonations } from "../api/api";
import TopDonations from "../components/TopDonations";

export default function Donations() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const scrollRef = useRef(null);

  useEffect(() => {
    fetchDonations()
      .then((dRes) => {
        const sorted = [...dRes.data].sort((a, b) => a.id - b.id);
        setDonors(sorted);
        setFilteredDonors(sorted);
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

  // 🔹 Smooth auto-scroll effect (iOS + Android + Desktop)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Always start at bottom when donors change
    container.scrollTop = container.scrollHeight;

    let scrollStep = 0.3; // super smooth
    let animationFrameId;

    const scroll = () => {
      if (container.scrollTop <= 0) {
        container.scrollTop = container.scrollHeight;
      } else {
        container.scrollTop -= scrollStep; // ✅ works on iOS too
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [filteredDonors, isMobile]);

  if (loading) return <Spinner />;

  const visibleDonors = filteredDonors;

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

          {isMobile ? (
            // ---- Mobile View: Card layout ----
            <Stack
              ref={scrollRef}
              spacing={3}
              p={3}
              maxH="220px"
              overflowY="auto"
              sx={{
                WebkitOverflowScrolling: "touch", // ✅ iOS smooth scrolling
                "::-webkit-scrollbar": { width: "4px" },
                "::-webkit-scrollbar-thumb": {
                  background: "#ccc",
                  borderRadius: "4px",
                },
              }}
            >
              {visibleDonors.length === 0 ? (
                <Text>No matching donations found.</Text>
              ) : (
                visibleDonors.map((d) => (
                  <Box
                    key={d.id}
                    border="1px solid #eee"
                    borderRadius="md"
                    p={3}
                    bg="orange.50"
                  >
                    <Flex justify="space-between" fontSize="sm">
                      <Text fontWeight="bold">
                        {`${d.donorFirstName || ""} ${d.donorLastName || ""}`}
                      </Text>
                      <Text color="orange.700" fontWeight="semibold">
                        ₹ {d.amount?.toLocaleString("en-IN")}
                      </Text>
                    </Flex>
                  </Box>
                ))
              )}
            </Stack>
          ) : (
            // ---- Desktop/Tablet View: Table layout ----
            <TableContainer
              ref={scrollRef}
              maxH="220px"
              overflowY="auto"
              overflowX="auto"
              borderTop="1px solid #eee"
              borderRadius="md"
              sx={{
                WebkitOverflowScrolling: "touch", // ✅ iOS fix
                "::-webkit-scrollbar": { width: "4px", height: "4px" },
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
                          {`${d.donorLastName || ""} ${d.donorFirstName || ""}`}
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
          )}
        </Box>
      </Box>

      {/* Right: Top Donors */}
      <TopDonations isMobile={isMobile} />
    </Grid>
  );
}
