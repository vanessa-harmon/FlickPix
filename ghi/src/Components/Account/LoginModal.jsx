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
  FormHelperText,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpenLogin, onCloseLogin }) {
  const [usernamelogin, setUsernameLogin] = useState();
  const [passwordlogin, setPasswordLogin] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { login } = useToken();
  const navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(usernamelogin, passwordlogin);
    // e.target.reset();
    onCloseLogin();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpenLogin} onClose={onCloseLogin} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome Back!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired onSubmit={handleLoginSubmit} mt={4}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              name="username"
              type="text"
              onChange={(e) => setUsernameLogin(e.target.value)}
              placeholder="Username"
            />
            <FormHelperText>Your username is your email.</FormHelperText>

            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                onChange={(e) => setPasswordLogin(e.target.value)}
                pr="4.5rem"
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleLoginSubmit} colorScheme="blue" mr={3}>
            Login
          </Button>
          <Button onClick={onCloseLogin}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
