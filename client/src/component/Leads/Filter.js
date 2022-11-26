// import { React, useMemo, useState } from "react";
// import { useAsyncDebounce } from "react-table";
// import {Input,InputRightElement } from "@chakra-ui/react"
// import FeatherIcon from 'feather-icons-react'
// // Component for Global Filter
// export function GlobalFilter({ globalFilter, setGlobalFilter }) {
//   const [value, setValue] = useState(globalFilter);

//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);

//   return (
//     <div>
//       {/* <Label>Search Table: </Label> */}
//       <Input
//         value={value || ""}
//         onChange={(e) => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder=" Enter value "
//         className="w-25"
//         style={{
//           fontSize: "1.1rem",
//           margin: "15px",
//           display: "inline",
         
      
//         }}
//       />
    
//     </div>
//   );
// }