// import React, { useState,useRef } from "react";
// import {
//   Input,
//   FormControl,
//   FormLabel,
//   WrapItem,
//   Box,
//   Button,
//   Flex,
//   useColorModeValue,
//   useDisclosure,
//   DrawerHeader,
//   DrawerBody,
//   Drawer,
//   DrawerFooter,
//   Select,
//   Stack,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerOverlay,
// } from "@chakra-ui/react";
// import { Formik, Field } from "formik";
// import HeadTitle from "../../component/HeadTitle/HeadTitle";
// import { BodyMain } from "../../component/HeadTitle/BodyMain";
// import { AddNewProject } from "../../redux/Project/actionCreator";
// import { useDispatch } from "react-redux";
// import { AddIcon } from "@chakra-ui/icons";





// function EditProject() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const firstField = useRef();



//   // cons [typeFileds,setTypeFileds] = useState([])

//   const dispatch = useDispatch();
//   const [addProject, setAddProject] = useState({
//     project_name: "",
//     company_name: "",
//     contact_no: "",
//     email: "",
//     address: "",
//   });

//   const { project_name, company_name, contact_no, email, address } = addProject;
//   // console.log(addProject, "data added now");
//   const onChange = (e) => {
//     setAddProject({ ...addProject, [e.target.name]: e.target.value });
//   };

//   const onHandlerSubmit = (e) => {
//     e.preventDefault();
//     dispatch(AddNewProject(addProject)).then((res) =>
//       console.log(res.data, "api data project")
//     );
//   };


//   return (
//     <Flex
//       flexDirection="column"
//       // pt={{ base: "120px", md: "75px" }}
//       px="30px"
//       h={'100vh'}
//       bg={useColorModeValue("#f3f2f1", "gray.900")}
//     >
//       <HeadTitle title="Edit Project" />
//       <BodyMain>
//         <WrapItem w={"100%"}>
//           <Box
//             bg={useColorModeValue("#fff", "gray.800")}
//             borderRadius="lg"
//             w={"100%"}
//           >
//             <Box
//               m={8}
//               color="#0B0E3F"
//               display={"flex"}
//               flexDir={"column"}
//               rowGap={5}
//             >
//               <Flex w={"100%"}>
//                 <Formik>
//                   <form onSubmit={onHandlerSubmit} style={{ width: "100%" }}>
//                     <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
//                       <FormControl id="name" w={"100%"}>
//                         <FormLabel>Project Name</FormLabel>
//                         <Field
//                           as={Input}
//                           id="project_name"
//                           name="project_name"
//                           type="text"
//                           variant="filled"
//                           value={project_name}
//                           onChange={(e) => onChange(e)}
//                         />
//                       </FormControl>
//                       <FormControl id="name" w={"100%"}>
//                         <FormLabel>Company Name</FormLabel>
//                         <Field
//                           as={Input}
//                           id="company_name"
//                           name="company_name"
//                           type="text"
//                           variant="filled"
//                           value={company_name}
//                           onChange={(e) => onChange(e)}
//                         />
//                       </FormControl>
//                     </Flex>
//                     <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
//                       <FormControl id="name" w={"100%"}>
//                         <FormLabel>Contact No</FormLabel>
//                         <Field
//                           as={Input}
//                           id="contact_no"
//                           name="contact_no"
//                           type="tel"
//                           variant="filled"
//                           value={contact_no}
//                           onChange={(e) => onChange(e)}
//                         />
//                       </FormControl>
//                       <FormControl id="name" w={"100%"}>
//                         <FormLabel>Email (Official)</FormLabel>
//                         <Field
//                           as={Input}
//                           id="email"
//                           name="email"
//                           type="email"
//                           variant="filled"
//                           value={email}
//                           onChange={(e) => onChange(e)}
//                         />
//                       </FormControl>
//                     </Flex>
//                     <Flex w={"100%"} columnGap={"1rem"} mb={"1rem"}>
//                       <FormControl id="name" w={"100%"}>
//                         <FormLabel>Address (Phyical)</FormLabel>

//                         <Field
//                           as={Input}
//                           id="address"
//                           name="address"
//                           type="text"
//                           variant="filled"
//                           value={address}
//                           onChange={(e) => onChange(e)}
//                         />
//                       </FormControl>
//                     </Flex>

//                     <FormControl id="name" float="right" mt={"2rem"}>
//                       <Button
//                         variant="solid"
//                         bg="#0D74FF"
//                         color="white"
//                         _hover="hsl(214deg 100% 37%)"
//                         type="submit"
//                       >
//                         Save
//                       </Button>
//                     </FormControl>
//                   </form>
//                 </Formik>
//               </Flex>
//             </Box>
//           </Box>
//         </WrapItem>
//       </BodyMain>
//     </Flex>
//   );
// }

// export default EditProject;
