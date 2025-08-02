// src/pages/AdminUpload.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Image,
  useToast,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  uploadDonation,
  uploadPhoto,
  fetchAllPledges,
  deletePledge,
  searchDonorsByFirstName, // 🔄 reused for unified search
  updateDonation,
  deleteDonation,
  uploadExpenditure,
  updateExpenditure,
  deleteExpenditure,
} from "../api/api";

const AdminUpload = () => {
  // 🔹 Donations state
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [donors, setDonors] = useState([]);
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [searching, setSearching] = useState(false);
  const [pledges, setPledges] = useState([]);
  const [approvingId, setApprovingId] = useState(null);

  // 🔹 Expenditures state
  const [expDescription, setExpDescription] = useState("");
  const [expPaidTo, setExpPaidTo] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expSearch, setExpSearch] = useState("");
  const [expResults, setExpResults] = useState([]);
  const [selectedExpId, setSelectedExpId] = useState(null);
  const [searchingExp, setSearchingExp] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Load pledges
  const loadPledges = async () => {
    try {
      const res = await fetchAllPledges(token);
      setPledges(res.data);
    } catch {
      toast({ title: "Failed to load pledges", status: "error" });
    }
  };

  useEffect(() => {
    if (!token) {
      toast({
        title: "Access Denied",
        description: "Please login first.",
        status: "warning",
      });
      navigate("/admin/login");
    } else {
      loadPledges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 🔍 Auto search donors (firstName OR lastName OR both)
  useEffect(() => {
    const fetchDonors = async () => {
      const searchTerm = `${donorFirstName} ${donorLastName}`.trim();
      if (searchTerm.length >= 3) {
        setSearching(true);
        try {
          // 👇 backend should allow searching by either first or last name
          const res = await searchDonorsByFirstName(searchTerm, token);

          // ✅ Client-side fallback (ensures lastName also works)
          const filtered = res.data.filter(
            (d) =>
              d.donorFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              d.donorLastName.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setDonors(filtered);
        } catch {
          toast({ title: "Search failed", status: "error" });
        }
        setSearching(false);
      } else {
        setDonors([]);
        setSelectedDonorId(null);
      }
    };
    fetchDonors();
  }, [donorFirstName, donorLastName, token, toast]);

  // ✅ Manual donation add
  const handleDonationSubmit = async () => {
    if (!donorFirstName || !donorLastName || !amount) {
      toast({ title: "Please enter all donor details", status: "warning" });
      return;
    }
    try {
      await uploadDonation(
        { donorFirstName, donorLastName, amount: parseFloat(amount) },
        token
      );
      toast({ title: "Donation saved", status: "success" });
      resetForm();
    } catch (err) {
      toast({
        title: "Donation failed",
        description: err.message,
        status: "error",
      });
    }
  };

  // ✅ Update donation
  const handleUpdate = async () => {
    if (!selectedDonorId) return;
    try {
      await updateDonation(
        selectedDonorId,
        { donorFirstName, donorLastName, amount: parseFloat(amount) },
        token
      );
      toast({ title: "Updated successfully", status: "success" });
      resetForm();
    } catch (err) {
      toast({ title: "Update failed", status: "error" });
    }
  };

  // ✅ Delete donation
  const handleDelete = async () => {
    if (!selectedDonorId) return;
    try {
      await deleteDonation(selectedDonorId, token);
      toast({ title: "Deleted successfully", status: "info" });
      resetForm();
    } catch (err) {
      toast({ title: "Delete failed", status: "error" });
    }
  };

  // ✅ Approve pledge
  const handleApprovePledge = async (pledge) => {
    if (approvingId) return;
    setApprovingId(pledge.id);
    try {
      await uploadDonation(
        {
          donorFirstName: pledge.donorFirstName,
          donorLastName: pledge.donorLastName,
          amount: pledge.amount,
        },
        token
      );
      await deletePledge(pledge.id, token);
      toast({ title: "Pledge approved ✅", status: "success" });
      await loadPledges();
    } catch (err) {
      toast({
        title: "Approval failed",
        description: err.message,
        status: "error",
      });
    } finally {
      setApprovingId(null);
    }
  };

  // ✅ Select donor
  const handleSelectDonor = (id) => {
    const donor = donors.find((d) => d.id === id);
    if (donor) {
      setSelectedDonorId(donor.id);
      setDonorFirstName(donor.donorFirstName);
      setDonorLastName(donor.donorLastName);
      setAmount(donor.amount);
    }
  };

  // ✅ Photo upload
  const handlePhotoUpload = async () => {
    if (!file) {
      toast({ title: "Please select a file", status: "warning" });
      return;
    }
    try {
      await uploadPhoto(file, token);
      toast({ title: "Photo uploaded", status: "success" });
      setFile(null);
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, status: "error" });
    }
  };

  // ✅ Expenditure add
  const handleExpenditureSubmit = async () => {
    if (!expDescription || !expPaidTo || !expAmount) {
      toast({ title: "Fill all expenditure fields", status: "warning" });
      return;
    }
    try {
      await uploadExpenditure(
        {
          description: expDescription,
          paidTo: expPaidTo,
          amount: parseFloat(expAmount),
        },
        token
      );
      toast({ title: "Expenditure saved", status: "success" });
      resetExpForm();
    } catch (err) {
      toast({ title: "Save failed", description: err.message, status: "error" });
    }
  };

  const handleExpenditureUpdate = async () => {
    if (!selectedExpId) return;
    try {
      await updateExpenditure(
        selectedExpId,
        { description: expDescription, paidTo: expPaidTo, amount: parseFloat(expAmount) },
        token
      );
      toast({ title: "Updated successfully", status: "success" });
      resetExpForm();
    } catch (err) {
      toast({ title: "Update failed", status: "error" });
    }
  };

  const handleExpenditureDelete = async () => {
    if (!selectedExpId) return;
    try {
      await deleteExpenditure(selectedExpId, token);
      toast({ title: "Deleted successfully", status: "info" });
      resetExpForm();
    } catch (err) {
      toast({ title: "Delete failed", status: "error" });
    }
  };

  // Reset forms
  const resetForm = () => {
    setDonorFirstName("");
    setDonorLastName("");
    setAmount("");
    setFile(null);
    setDonors([]);
    setSelectedDonorId(null);
  };

  const resetExpForm = () => {
    setExpDescription("");
    setExpPaidTo("");
    setExpAmount("");
    setSelectedExpId(null);
    setExpResults([]);
  };

  // ✅ Search expenditures
  const handleExpSearch = async () => {
    if (expSearch.trim().length < 3) {
      toast({ title: "Enter at least 3 characters", status: "warning" });
      return;
    }
    setSearchingExp(true);
    try {
      const res = await import("../api/api").then((m) => m.fetchExpenditures());
      const results = res.data.filter(
        (e) =>
          e.description.toLowerCase().includes(expSearch.toLowerCase()) ||
          e.paidTo.toLowerCase().includes(expSearch.toLowerCase())
      );
      setExpResults(results);
    } catch {
      toast({ title: "Search failed", status: "error" });
    }
    setSearchingExp(false);
  };

  return (
    <Box p={6} maxW="1000px" mx="auto">
      {/* 💸 Donation Form */}
      <VStack spacing={4} mb={8} border="1px solid #ccc" p={4} borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">Add / Update Donation</Text>
        <Input placeholder="First Name" value={donorFirstName} onChange={(e) => setDonorFirstName(e.target.value)} />
        <Input placeholder="Last Name" value={donorLastName} onChange={(e) => setDonorLastName(e.target.value)} />
        {searching && <Spinner size="sm" />}
        {donors.length > 0 && (
          <Select placeholder="Select donor" onChange={(e) => handleSelectDonor(e.target.value)}>
            {donors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.donorFirstName} {d.donorLastName} — ₹{d.amount}
              </option>
            ))}
          </Select>
        )}
        <Input placeholder="Amount in INR" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <HStack>
          <Button colorScheme="green" onClick={handleDonationSubmit}>Save</Button>
          <Button colorScheme="yellow" onClick={handleUpdate} isDisabled={!selectedDonorId}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete} isDisabled={!selectedDonorId}>Delete</Button>
        </HStack>
      </VStack>

      <Divider my={6} />

      {/* 📝 Pending Pledges Table */}
      <Box mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Pending Pledges</Text>
        {pledges.length === 0 ? (
          <Text>No pledges submitted yet.</Text>
        ) : (
          <TableContainer border="1px solid #ddd" borderRadius="md" maxH="350px" overflowY="auto">
            <Table variant="striped" size="sm" colorScheme="orange">
              <Thead bg="orange.500" position="sticky" top="0" zIndex={1}>
                <Tr>
                  <Th color="white">First Name</Th>
                  <Th color="white">Last Name</Th>
                  <Th color="white">Mobile</Th>
                  <Th color="white" isNumeric>Amount (₹)</Th>
                  <Th color="white">Date</Th>
                  <Th color="white">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pledges.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.donorFirstName}</Td>
                    <Td>{p.donorLastName}</Td>
                    <Td>{p.mobile}</Td>
                    <Td isNumeric>{p.amount}</Td>
                    <Td>{p.date}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleApprovePledge(p)}
                        isLoading={approvingId === p.id}
                      >
                        Approve
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Divider my={6} />

      {/* 🖼️ Photo Upload */}
      <VStack spacing={4} border="1px solid #ccc" p={4} borderRadius="md" mb={6}>
        <Text fontSize="xl" fontWeight="bold">Upload Construction Photo</Text>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        {file && <Image src={URL.createObjectURL(file)} boxSize="200px" objectFit="cover" />}
        <Button colorScheme="orange" onClick={handlePhotoUpload}>Upload Photo</Button>
      </VStack>

      <Divider my={6} />

      {/* 🏗️ Expenditures Section */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>Manage Expenditures</Text>
        <Input
          placeholder="Search Expenditures by Description / Paid To"
          value={expSearch}
          onChange={(e) => setExpSearch(e.target.value)}
          mb={2}
        />
        <Button size="sm" colorScheme="teal" onClick={handleExpSearch} isLoading={searchingExp}>
          Search
        </Button>

        {expResults.length > 0 && (
          <Select
            mt={2}
            placeholder="Select expenditure"
            onChange={(e) => {
              const exp = expResults.find((x) => x.id === e.target.value);
              if (exp) {
                setSelectedExpId(exp.id);
                setExpDescription(exp.description);
                setExpPaidTo(exp.paidTo);
                setExpAmount(exp.amount);
              }
            }}
          >
            {expResults.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.description} — ₹{exp.amount}
              </option>
            ))}
          </Select>
        )}

        <VStack spacing={3} mt={4} align="stretch">
          <Input placeholder="Description" value={expDescription} onChange={(e) => setExpDescription(e.target.value)} />
          <Input placeholder="Paid To" value={expPaidTo} onChange={(e) => setExpPaidTo(e.target.value)} />
          <Input placeholder="Amount in INR" type="number" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} />
          <HStack>
            <Button colorScheme="green" onClick={handleExpenditureSubmit}>Save</Button>
            <Button colorScheme="yellow" onClick={handleExpenditureUpdate} isDisabled={!selectedExpId}>Update</Button>
            <Button colorScheme="red" onClick={handleExpenditureDelete} isDisabled={!selectedExpId}>Delete</Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminUpload;
