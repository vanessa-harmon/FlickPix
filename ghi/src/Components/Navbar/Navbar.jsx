import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SignupModal from "../Authentication/SignupModal";
import LoginModal from "../Authentication/LoginModal";
import { Tabs, TabList, Tab, TabIndicator, Avatar, Menu, MenuButton, MenuList, MenuItem, Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import useToken from "@galvanize-inc/jwtdown-for-react";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const openLoginModal = () => setIsOpenLogin(true);
    const closeLoginModal = () => setIsOpenLogin(false);
    const [isOpenSignup, setIsOpenSignup] = useState(false);
    const openSignupModal = () => setIsOpenSignup(true);
    const closeSignupModal = () => setIsOpenSignup(false);

    const navigate = useNavigate();

    const { logout } = useToken();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/");
    };


    return (
        <>
            <header>
                <nav className="navbar">
                    <NavLink to="/" className="navbar-brand">
                        <img
                            src="Flickpix Logo.png"
                            alt="Flickpix Logo"
                            width="70"
                            height="50"
                        />
                    </NavLink>
                    <div className="tab">
                        <Tabs position="relative" variant="unstyled">
                            <TabList>
                                <NavLink to="/movies" className="tab-item">
                                    <Tab>Movies</Tab>
                                </NavLink>
                                <NavLink to="/tv-shows" className="tab-item">
                                    <Tab>TV Shows</Tab>
                                </NavLink>
                                <NavLink to="/watch-later" className="tab-item">
                                    <Tab>Watch Later</Tab>
                                </NavLink>
                                <NavLink to="/seen-it" className="tab-item">
                                    <Tab>Seen It</Tab>
                                </NavLink>
                            </TabList>
                            <TabIndicator
                                mt="-1px"
                                height="2px"
                                bg="blue.500"
                                borderRadius="2px"
                            />
                        </Tabs>
                    </div>
                    <div className="search">
                        <SearchBar />
                    </div>
                    <LoginModal
                        isOpenLogin={isOpenLogin}
                        onCloseLogin={closeLoginModal}
                    />
                    <SignupModal
                        isOpenSignup={isOpenSignup}
                        onCloseSignup={closeSignupModal}
                    />
                    {/* <Logout onClick={handleLogout} /> */}
                    <ButtonGroup spacing="6">
                        <Button colorScheme="cyan" onClick={openSignupModal}>
                            Register
                        </Button>
                        <Button
                            colorScheme="whitealpha"
                            variant="outline"
                            onClick={openLoginModal}
                        >
                            Login
                        </Button>
                    </ButtonGroup>
                    <Menu>
                        <MenuButton
                            className="avatar-center"
                            as={Avatar}
                            name="Andrew"
                            src="/link.png"
                            cursor="pointer"
                        ></MenuButton>
                        <MenuList>
                            <MenuItem className="menu-item-black-text">Settings</MenuItem>
                            <MenuItem className="menu-item-black-text" onClick={handleLogout}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </nav>
            </header>
        </>
    );
}

export default Nav;
