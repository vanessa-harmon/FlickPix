// import { NavLink, useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import SignupModal from "../Account/SignupModal";
// import LoginModal from "../Account/LoginModal";
// // import { useCookies } from "react-cookie";
// import {
//   Tabs,
//   TabList,
//   Tab,
//   TabIndicator,
//   Avatar,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   Wrap,
//   WrapItem,
//   Select,
//   ModalCloseButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Image,
//   Input,
//   Button,
//   ButtonGroup,
//   useDisclosure,
//   FormControl,
//   FormLabel,
// } from "@chakra-ui/react";
// import "./Navbar.css";
// import SearchBar from "../SearchBar/SearchBar";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// // import Pic1 from "../AvatarPics/1.jpeg";
// // import Pic2 from "../AvatarPics/2.jpg";
// // import Pic3 from "../AvatarPics/3.jpg";
// // import Pic4 from "../AvatarPics/4.png";
// // import Pic5 from "../AvatarPics/5.jpg";
// // import Pic6 from "../AvatarPics/6.png";
// // import Pic7 from "../AvatarPics/7.png";
// // import Pic8 from "../AvatarPics/8.png";
// // import Pic9 from "../AvatarPics/9.png";
// // import Pic10 from "../AvatarPics/10.png";

// function Nav() {
//   const [isOpenLogin, setIsOpenLogin] = useState(false);
//   const openLoginModal = () => setIsOpenLogin(true);
//   const closeLoginModal = () => setIsOpenLogin(false);

//   const [isOpenSignup, setIsOpenSignup] = useState(false);
//   const openSignupModal = () => setIsOpenSignup(true);
//   const closeSignupModal = () => setIsOpenSignup(false);

//   const navigate = useNavigate();

//   const { logout } = useToken();
//   const handleLogout = (e) => {
//     e.preventDefault();
//     logout();
//     navigate("/");
//   };

//   // const [isOpenProfile, setIsOpenProfile] = useState(false);
//   // const openProfileModal = () => setIsOpenProfile(true);
//   // const closeProfileModal = () => setIsOpenProfile(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [nickname, setNickname] = useState();

//   const options = [
//     { value: "Dad Bluey", text: "Dad Bluey", image: "https://themouseminute.files.wordpress.com/2020/04/bandit-.png" },
//     { value: "Django", text: "Django", image: "https://s22657.pcdn.co/wp-content/uploads/2020/07/jamie-foxx.jpg" },
//   ];
//   const [avatar, setAvatar] = useState(options[0].image);

//   const myObj = { nickname: nickname, opts: options };
//   const myJSON = JSON.stringify(myObj);

//   let text = localStorage.getItem("testJSON");
//   let obj = JSON.parse(text);
//   console.log(obj);
//   // document.getElementById("demo").innerHTML = obj.name;
//   // const [cookies, setCookie, removeCookie] = useCookies(["account_id"]);
//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     const userData = {
//       nickname: nickname,
//       avatar: avatar,
//     };

//     const url = "${ACCOUNTS_API}/api/profile/";
//     const fetchConfig = {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     };

//     const response = await fetch(url, fetchConfig);
//     if (response.ok) {
//       console.log("Profile created");
//       onClose();

//       navigate("/movies");
//     } else {
//       console.error("Failed to create profile.");
//     }
//     // setCookie("nickname", cookies.nickname);
//     localStorage.setItem("testJSON", myJSON);
//   };

//   // useEffect(() => {
//   //   handleProfileSubmit();
//   // }, [nickname, avatar]);
//   // e.target.reset();

//   return (
//     <>
//       <header>
//         <nav className="navbar">
//           <NavLink to="/" className="navbar-brand">
//             <img src="Flickpix Logo.png" alt="Flickpix Logo" width="70" height="50" />
//           </NavLink>
//           <div className="tab">
//             <Tabs position="relative" variant="unstyled">
//               <TabList>
//                 <NavLink to="/movies" className="tab-item">
//                   <Tab>Movies</Tab>
//                 </NavLink>
//                 <NavLink to="/tv-shows" className="tab-item">
//                   <Tab>TV Shows</Tab>
//                 </NavLink>
//                 <NavLink to="/watch-later" className="tab-item">
//                   <Tab>Watch Later</Tab>
//                 </NavLink>
//                 <NavLink to="/seen-it" className="tab-item">
//                   <Tab>Seen It</Tab>
//                 </NavLink>
//               </TabList>
//               <TabIndicator mt="-1px" height="2px" bg="blue.500" borderRadius="2px" />
//             </Tabs>
//           </div>
//           <div className="search">
//             <SearchBar />
//           </div>
//           <LoginModal isOpenLogin={isOpenLogin} onCloseLogin={closeLoginModal} />
//           <SignupModal isOpenSignup={isOpenSignup} onCloseSignup={closeSignupModal} />

//           <ButtonGroup spacing="6">
//             <Button colorScheme="cyan" onClick={openSignupModal}>
//               Sign Up
//             </Button>
//             <Button colorScheme="whitealpha" variant="outline" onClick={openLoginModal}>
//               Login
//             </Button>
//           </ButtonGroup>
//           <Menu>
//             <Avatar as={MenuButton} size="lg" bg="teal.300" src={avatar} />
//             <MenuList>
//               <MenuItem className="menu-item-black-text" onClick={onOpen}>
//                 Create Profile
//               </MenuItem>
//               <MenuItem className="menu-item-black-text" onClick={handleLogout}>
//                 Manage Profile
//               </MenuItem>
//               <MenuItem className="menu-item-black-text" onClick={handleLogout}>
//                 Log Out
//               </MenuItem>
//             </MenuList>
//           </Menu>

//           <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>Create your Profile</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody pb={6}>
//                 <FormControl isRequired onSubmit={handleProfileSubmit} mt={4}>
//                   <FormLabel htmlFor="nickname">Nickname</FormLabel>
//                   <Input
//                     onChange={(e) => setNickname(e.target.value)}
//                     variant="filled"
//                     type="text"
//                     id="nickname"
//                     name="nickname"
//                     placeholder="Nickname"
//                   />
//                   <FormLabel htmlFor="avatar">Avatar</FormLabel>
//                   <Select onChange={(e) => setAvatar(e.target.value)} value={avatar} type="text" variant="filled" id="avatar" name="avatar">
//                     <option value="">Choose Avatar</option>
//                     {options.map((option) => {
//                       return (
//                         <option key={option.value} value={option.image}>
//                           {option.text}
//                         </option>
//                       );
//                     })}
//                   </Select>
//                 </FormControl>
//               </ModalBody>
//               {/* <Wrap spacing="30px">
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic1} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic1)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic2} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(e.Pic2)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic3} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic3)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic4} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic4)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic5} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic5)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic6} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic6)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic7} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic7)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic8} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic8)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic9} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic9)} />
//                       </button>
//                     </WrapItem>
//                     <WrapItem>
//                       <button>
//                         <Image src={Pic10} borderRadius="base" objectFit="fill" boxSize="180px" onClick={(e) => setAvatar(Pic10)} />
//                       </button>
//                     </WrapItem>
//                   </Wrap> */}

//               <ModalFooter>
//                 <Button onClick={handleProfileSubmit} colorScheme="blue" mr={3}>
//                   Create Profile
//                 </Button>
//                 <Button onClick={onClose}>Cancel</Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Nav;
