import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import SignupModal from "../Account/SignupModal";
import LoginModal from "../Account/LoginModal";
// import Logout from "../Authentication/Logout";
import {
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Wrap,
  WrapItem,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import useToken from "@galvanize-inc/jwtdown-for-react";
import Pic1 from "../AvatarPics/1.jpeg";
import Pic2 from "../AvatarPics/2.jpg";
import Pic3 from "../AvatarPics/3.jpg";
import Pic4 from "../AvatarPics/4.png";
import Pic5 from "../AvatarPics/5.jpg";
import Pic6 from "../AvatarPics/6.png";
import Pic7 from "../AvatarPics/7.png";
import Pic8 from "../AvatarPics/8.png";
import Pic9 from "../AvatarPics/9.png";
import Pic10 from "../AvatarPics/10.png";

function Nav() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const openLoginModal = () => setIsOpenLogin(true);
  const closeLoginModal = () => setIsOpenLogin(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const openSignupModal = () => setIsOpenSignup(true);
  const closeSignupModal = () => setIsOpenSignup(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [avatar, setAvatar] = useState(Pic4);

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
              <TabIndicator mt="-1px" height="2px" bg="blue.500" borderRadius="2px" />
            </Tabs>
          </div>
          <div className="search">
            <SearchBar onSearch={handleSearch} />
          </div>
          <LoginModal isOpenLogin={isOpenLogin} onCloseLogin={closeLoginModal} />
          <SignupModal isOpenSignup={isOpenSignup} onCloseSignup={closeSignupModal} />
          {/* <Logout onClick={handleLogout} /> */}

          <ButtonGroup spacing="6">
            <Button colorScheme="cyan" onClick={openSignupModal}>
              Register
            </Button>
            <Button colorScheme="whitealpha" variant="outline" onClick={openLoginModal}>
              Login
            </Button>
          </ButtonGroup>
          <Menu>
            <Avatar as={MenuButton} size="lg" bg="teal.300" src={avatar} />
            <MenuList>
              <MenuItem className="menu-item-black-text" onClick={onOpen}>
                Avatar Settings
              </MenuItem>
              <MenuItem className="menu-item-black-text" onClick={handleLogout}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>

          <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose your Avatar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap spacing="30px">
                  <WrapItem>
                    <button>
                      <Image src={Pic1} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic1)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic2} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic2)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic3} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic3)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic4} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic4)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic5} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic5)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic6} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic6)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic7} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic7)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic8} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic8)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic9} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic9)} />
                    </button>
                  </WrapItem>
                  <WrapItem>
                    <button>
                      <Image src={Pic10} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic10)} />
                    </button>
                  </WrapItem>
                </Wrap>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Select Avatar
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </nav>
      </header>
    </>
  );
}

export default Nav;
