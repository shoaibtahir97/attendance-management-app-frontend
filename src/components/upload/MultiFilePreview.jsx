// import { m, AnimatePresence } from "framer-motion";
// import { alpha } from "@mui/material/styles";
// import { IconButton, Grid, Typography, Box } from "@mui/material";
// import { fData } from "../../utils/formatNumber";
// import getFileData from "../../utils/getFileData";
// import { UploadMultiFileProps } from "./type";
// import SimpleBar from "simplebar-react";
// import "simplebar-react/dist/simplebar.min.css";
// import Image from "../Image";
// import Iconify from "../Iconify";
// import { varFade } from "../animate";
// import Scrollbar from "../Scrollbar";

// export default function MultiFilePreview({
//   showPreview = false,
//   files,
//   onRemove,
// }: UploadMultiFileProps) {
//   const hasFile = files.length > 0;
//   return (
//     <SimpleBar style={{ maxHeight: 150 }}>
//       <Grid container spacing={1} sx={{ padding: 1 }}>
//         <AnimatePresence>
//           {/* <Scrollbar sx={{ height: 120, width: "100%" }}> */}
//           {files.map((file, index) => {
//             const { key, name, size, preview } = getFileData(file, index);
//             if (showPreview) {
//               return (
//                 <Grid
//                   item
//                   rowGap={4}
//                   rowSpacing={6}
//                   xs={12}
//                   sm={6}
//                   md={6}
//                   lg={6}
//                   key={key}
//                   component={m.div}
//                   {...varFade().inRight}
//                   sx={{
//                     p: 2,
//                     m: 0.5,
//                     width: 80,
//                     height: 80,
//                     borderRadius: 1.25,
//                     position: "relative",
//                     display: "inline-flex",
//                     border: (theme) => `solid 1px ${theme.palette.divider}`,
//                   }}
//                 >
//                   <Image alt="preview" src={preview} ratio="1/1" />
//                   {onRemove && (
//                     <IconButton
//                       size="small"
//                       onClick={() => onRemove(file)}
//                       sx={{
//                         top: 6,
//                         p: "2px",
//                         right: 6,
//                         position: "absolute",
//                         color: "common.white",
//                         bgcolor: (theme) =>
//                           alpha(theme.palette.grey[900], 0.72),
//                         "&:hover": {
//                           bgcolor: (theme) =>
//                             alpha(theme.palette.grey[900], 0.48),
//                         },
//                       }}
//                     >
//                       <Iconify icon={"eva:close-fill"} />
//                     </IconButton>
//                   )}
//                 </Grid>
//               );
//             }
//             return (
//               <Grid
//                 item
//                 xs={12}
//                 md={6}
//                 key={key}
//                 component={m.div}
//                 {...varFade().inRight}
//               >
//                 <Box
//                   sx={{
//                     borderRadius: 0.75,
//                     border: (theme) => `solid 1px ${theme.palette.divider}`,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     padding: 1,
//                     margin: 0.5,
//                   }}
//                 >
//                   <Box>
//                     <Typography
//                       variant="subtitle1"
//                       noWrap
//                       sx={{
//                         display: "block",
//                         width: "250px",
//                         overflow: "hidden",
//                         whiteSpace: "nowrap",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {typeof file === "string" ? file : name}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ color: "text.secondary" }}
//                       noWrap
//                     >
//                       {typeof file === "string" ? "" : fData(size || 0)}
//                     </Typography>
//                   </Box>
//                   {onRemove && (
//                     <Box>
//                       <IconButton
//                         edge="end"
//                         size="small"
//                         onClick={() => onRemove(file)}
//                         sx={{
//                           width: "30px",
//                           height: "30px",
//                           textAlign: "right",
//                         }}
//                       >
//                         <Iconify icon={"eva:close-fill"} />
//                       </IconButton>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//             );
//           })}
//           {/* </Scrollbar> */}
//         </AnimatePresence>
//       </Grid>
//     </SimpleBar>
//   );
// }
import React from 'react';

const MultiFilePreview = () => {
  return <div>MultiFilePreview</div>;
};

export default MultiFilePreview;
