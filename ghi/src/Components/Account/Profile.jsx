// import React, { useState, useEffect } from "react";
// import {
//   //   Avatar,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Button,
//   Input,
//   Image,
//   Wrap,
//   WrapItem,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import Pic1 from "../AvatarPics/1.jpeg";
// import Pic2 from "../AvatarPics/2.jpg";
// import Pic3 from "../AvatarPics/3.jpg";
// import Pic4 from "../AvatarPics/4.png";
// import Pic5 from "../AvatarPics/5.jpg";
// import Pic6 from "../AvatarPics/6.png";
// import Pic7 from "../AvatarPics/7.png";
// import Pic8 from "../AvatarPics/8.png";
// import Pic9 from "../AvatarPics/9.png";
// import Pic10 from "../AvatarPics/10.png";

// function ProfileModal({ isOpenProfile, onCloseProfile }) {
//   const [nickname, setNickname] = useState();
//   const navigate = useNavigate();
//   const [avatar, setAvatar] = useState(Pic4);
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
//       onCloseProfile();
//       navigate("/");
//     } else {
//       console.error("Failed to create profile.");
//     }
//   };

//   useEffect(() => {});
//   // e.target.reset();

//   return (
//     <Modal isOpen={isOpenProfile} onClose={onCloseProfile} size="6xl" isCentered>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Create your Profile</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody pb={6}>
//           <FormControl isRequired onSubmit={handleProfileSubmit} mt={4}>
//             <FormLabel htmlFor="nickname">Nickname</FormLabel>
//             <Input onChange={(e) => setNickname(e.target.value)} variant="filled" type="text" id="nickname" name="nickname" placeholder="Nickname" />

//             {/* <FormLabel htmlFor="avatar">Avatar</FormLabel>
//             <Input onChange={(e) => setAvatar(e.target.value)} variant="filled" type="text" id="avatar" name="avatar" placeholder="Avatar" /> */}
//           </FormControl>
//           <Avatarprofile />

//           <Wrap spacing="30px">
//             <WrapItem>
//               <button>
//                 <Image src={Pic1} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic1)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic2} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic2)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic3} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic3)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic4} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic4)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic5} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic5)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic6} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic6)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic7} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic7)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic8} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic8)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic9} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic9)} />
//               </button>
//             </WrapItem>
//             <WrapItem>
//               <button>
//                 <Image src={Pic10} borderRadius="base" objectFit="fill" boxSize="180px" onClick={() => setAvatar(Pic10)} />
//               </button>
//             </WrapItem>
//           </Wrap>
//         </ModalBody>

//         <ModalFooter>
//           <Button onClick={handleProfileSubmit} colorScheme="blue" mr={3}>
//             Create Profile
//           </Button>
//           <Button onClick={onCloseProfile}>Cancel</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// }

// export default ProfileModal;
