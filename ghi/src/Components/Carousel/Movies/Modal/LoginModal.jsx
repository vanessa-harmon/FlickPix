import React, { useState } from "react";
import {
    useDisclosure,
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

function LoginModal({ isOpen, onClose }) {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    const [usernamelogin, setUsernameLogin] = useState();
    const [passwordlogin, setPasswordLogin] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { login } = useToken();
    const navigates = useNavigate();

    const loginHandleSubmit = (e) => {
        e.preventDefault();
        login(usernamelogin, passwordlogin);
        e.target.reset();
        navigates("/");
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Welcome Back!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={loginHandleSubmit}>
                            <FormControl isRequired mt={4}>
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
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button type="submit" colorScheme="blue" mr={3}>
                            Login
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LoginModal;
