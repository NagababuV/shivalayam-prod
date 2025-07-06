import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { login, requestOtp, verifyOtp } from "../api/api";

const AdminLogin = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = async () => {
    try {
      await login(mobile, password);
      await requestOtp(mobile);

      toast({
        title: "Password validated. Enter OTP sent to your mobile.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      onOpen();
    } catch (e) {
      toast({
        title: "Invalid mobile or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(mobile, otp);
      localStorage.setItem("token", res.data.token);

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      navigate("/admin/upload");
    } catch (err) {
      toast({
        title: "Invalid OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Admin Login
        </Text>
        <Input
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} colorScheme="teal">
          Login
        </Button>
      </VStack>

      {/* OTP Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter OTP</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminLogin;
