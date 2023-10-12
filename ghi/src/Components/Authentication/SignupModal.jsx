import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
} from "@chakra-ui/react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function SignupModal({ isOpenSignup, onCloseSignup }) {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [date_of_birth, setDateOfBirth] = useState();
  const [password, setPassword] = useState();
  const { register } = useToken();
  const navigate = useNavigate();
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const userData = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      date_of_birth: date_of_birth,
      password: password,
      disabled: false,
    };

    register(userData, "http://localhost:8000/api/accounts/");
    // e.target.reset();
    onCloseSignup();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpenSignup} onClose={onCloseSignup} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired onSubmit={handleSignupSubmit} mt={4}>
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              variant="filled"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
            />

            <FormLabel htmlFor="last_name">Last name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              variant="filled"
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
            />

            <FormLabel htmlFor="username">Username</FormLabel>
            <Input onChange={(e) => setUsername(e.target.value)} variant="filled" type="text" id="username" name="username" placeholder="Username" />

            <FormLabel htmlFor="email">Email</FormLabel>
            <Input onChange={(e) => setEmail(e.target.value)} variant="filled" type="email" id="email" name="email" placeholder="Email" />

            <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
            <Input
              onChange={(e) => setDateOfBirth(e.target.value)}
              variant="filled"
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              placeholder="Date of Birth"
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSignupSubmit} colorScheme="blue" mr={3}>
            Sign Up
          </Button>
          <Button onClick={onCloseSignup}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignupModal;
