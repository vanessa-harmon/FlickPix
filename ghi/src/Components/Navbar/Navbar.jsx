import { NavLink, useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, TabIndicator, Avatar, Menu, MenuButton, MenuList, MenuItem, ButtonGroup, Button, useDisclosure } from "@chakra-ui/react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import LoginModal from "../Carousel/Movies/Modal/LoginModal";

function Nav() {
    const [searchResults, setSearchResults] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    const openLoginModal = () => {
        onOpen();
    };

    const closeLoginModal = () => {
        onClose();
    };

    const handleSearch = (query) => {
        if (query) {
            const searchUrl = `http://localhost:8000/search/results?query=${query}`;

            fetch(searchUrl)
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data.results);
                    // navigate('/search-results');
                })
                .catch((error) => {
                    console.error('Search failed:', error);
                });
        }
    };


    return (
        <header>
            <nav className="navbar">
                <NavLink to="/" className="navbar-brand">
                    <img src="Flickpix Logo.png" alt="Flickpix Logo" width="70" height="50" />
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
                    <SearchBar onSearch={handleSearch} />
                </div>
                <ButtonGroup spacing="6">
                    <Button colorScheme="whitealpha" variant="outline" onClick={openLoginModal}>
                        Login
                    </Button>
                    <LoginModal isOpen={isOpen} onClose={onClose} />
                </ButtonGroup>
                <Menu>
                    <MenuButton className="avatar-center" as={Avatar} name="Andrew" src="/link.png" cursor="pointer" >
                    </MenuButton>
                    <MenuList>
                        <MenuItem className="menu-item-black-text">Settings</MenuItem>
                        <MenuItem className="menu-item-black-text">Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </nav>
        </header >
    );
}

export default Nav;
