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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { uploadDonation, uploadPhoto } from "../api/api";

const AdminUpload = () => {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
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

  const handleDonationSubmit = async () => {
    if (!donorName || !amount) {
      toast({ title: "Please enter both name and amount", status: "warning" });
      return;
    }

    try {
      await uploadDonation(donorName, amount, token);
      toast({ title: "Donation saved", status: "success" });
      setDonorName("");
      setAmount("");
    } catch (err) {
      toast({
        title: "Donation failed",
        description: err.response?.data || err.message,
        status: "error",
      });
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

  return (
    <Box p={6} maxW="600px" mx="auto">
      <VStack spacing={4} mb={8} border="1px solid #ccc" p={4} borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">Add Donation</Text>
        <Input
          placeholder="Donor Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />
        <Input
          placeholder="Amount in INR"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button colorScheme="green" onClick={handleDonationSubmit}>
          Save Donation
        </Button>
      </VStack>

      <Divider my={4} />

      <VStack spacing={4} border="1px solid #ccc" p={4} borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">Upload Construction Photo</Text>
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            boxSize="200px"
            objectFit="cover"
          />
        )}
        <Button colorScheme="orange" onClick={handlePhotoUpload}>
          Upload Photo
        </Button>
      </VStack>
    </Box>
  );
};

export default AdminUpload;
