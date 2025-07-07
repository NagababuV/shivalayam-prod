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
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  uploadDonation,
  uploadPhoto,
  searchDonorsByFirstName,
  updateDonation,
  deleteDonation,
} from "../api/api";

const AdminUpload = () => {
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [donors, setDonors] = useState([]);
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const [searching, setSearching] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast({
        title: "Access Denied",
        description: "Please login first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/login");
    }
  }, [token, navigate, toast]);

  // 🔍 Auto search donors by first name
  useEffect(() => {
    const fetchDonors = async () => {
      if (donorFirstName.trim().length >= 3) {
        setSearching(true);
        try {
          const res = await searchDonorsByFirstName(donorFirstName, token);
          setDonors(res.data);
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
  }, [donorFirstName, token, toast]);

  const handleDonationSubmit = async () => {
    if (!donorFirstName || !donorLastName || !amount) {
      toast({ title: "Please enter all donor details", status: "warning" });
      return;
    }

    try {
      await uploadDonation({ donorFirstName, donorLastName, amount: parseFloat(amount) }, token);
      toast({ title: "Donation saved", status: "success" });
      resetForm();
    } catch (err) {
      toast({
        title: "Donation failed",
        description: err.response?.data || err.message,
        status: "error",
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedDonorId) return;
    try {
      await updateDonation(selectedDonorId, { donorFirstName, donorLastName, amount: parseFloat(amount) }, token);
      toast({ title: "Updated successfully", status: "success" });
      resetForm();
    } catch (err) {
      toast({ title: "Update failed", status: "error" });
    }
  };

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

  const handleSelectDonor = (id) => {
    const donor = donors.find((d) => d.id === id);
    if (donor) {
      setSelectedDonorId(donor.id);
      setDonorFirstName(donor.donorFirstName);
      setDonorLastName(donor.donorLastName);
      setAmount(donor.amount);
    }
  };

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
      toast({
        title: "Upload failed",
        description: err.response?.data || err.message,
        status: "error",
      });
    }
  };

  const resetForm = () => {
    setDonorFirstName("");
    setDonorLastName("");
    setAmount("");
    setFile(null);
    setDonors([]);
    setSelectedDonorId(null);
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      {/* 💸 Donation Form */}
      <VStack spacing={4} mb={8} border="1px solid #ccc" p={4} borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">Add / Update Donation</Text>

        <Input
          placeholder="Search by First Name (min 3 chars)"
          value={donorFirstName}
          onChange={(e) => setDonorFirstName(e.target.value)}
        />

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

        <Input
          placeholder="First Name"
          value={donorFirstName}
          onChange={(e) => setDonorFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={donorLastName}
          onChange={(e) => setDonorLastName(e.target.value)}
        />
        <Input
          placeholder="Amount in INR"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <HStack>
          <Button colorScheme="green" onClick={handleDonationSubmit}>Save</Button>
          <Button colorScheme="yellow" onClick={handleUpdate} isDisabled={!selectedDonorId}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete} isDisabled={!selectedDonorId}>Delete</Button>
        </HStack>
      </VStack>

      <Divider my={4} />

      {/* 🖼️ Photo Upload */}
      <VStack spacing={4} border="1px solid #ccc" p={4} borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">Upload Construction Photo</Text>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        {file && (
          <Image src={URL.createObjectURL(file)} boxSize="200px" objectFit="cover" />
        )}
        <Button colorScheme="orange" onClick={handlePhotoUpload}>
          Upload Photo
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminUpload;
