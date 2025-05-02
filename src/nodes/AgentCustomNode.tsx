// import { Handle, Position } from "@xyflow/react";
// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Card,
//   CardContent,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";

// const AgentCustomNode = ({ data }: any) => {
//   if (!data) return <div style={{ color: "white" }}>No data</div>;

//   // const renderField = (field: any, index: number) => {
//   //   const labelWithIcon = (
//   //     <Box display="flex" alignItems="center" gap={0.5}>
//   //       <span style={{ fontFamily: "GeneralSans-m", fontSize: "12px" }}>
//   //         {field.label}
//   //       </span>
//   //       {field.infoIcon && (
//   //         <Box
//   //           component="img"
//   //           src={field.infoIcon}
//   //           alt={data.label}
//   //           sx={{
//   //             width: 22,
//   //             height: 22,
//   //           }}
//   //         />
//   //       )}
//   //     </Box>
//   //   );

//   //   const baseTextFieldStyles = {
//   //     "& .MuiInputBase-root": {
//   //       border: "1px solid #41414B",
//   //       borderRadius: "8px",
//   //       background: "#2A2A33",
//   //       "&.Mui-focused fieldset": {
//   //         borderColor: "#FF581C",
//   //       },
//   //     },
//   //     "& .MuiInputBase-input": {
//   //       color: "#B8B9C1",
//   //     },
//   //     height: "36px",
//   //     fontFamily: "GeneralSans-m",
//   //     fontSize: "12px",
//   //   };

//   //   return (
//   //     <Box sx={{ flex: 1 }} key={index}>
//   //       <Typography
//   //         variant="body2"
//   //         sx={{
//   //           mb: "4px",
//   //           fontFamily: "GeneralSans-m",
//   //           fontSize: "14px",
//   //           lineHeight: "20px",
//   //           display: "flex",
//   //           alignItems: "center",
//   //           gap: "4px",
//   //         }}
//   //       >
//   //         {labelWithIcon}
//   //       </Typography>

//   //       {field.type === "text" && (
//   //         <TextField
//   //           fullWidth
//   //           variant="outlined"
//   //           placeholder={field.placeholder}
//   //           value={field.value}
//   //           size="small"
//   //           sx={baseTextFieldStyles}
//   //         />
//   //       )}

//   //       {field.type === "select" && (
//   //         <TextField
//   //           select
//   //           fullWidth
//   //           variant="outlined"
//   //           value={field.options.includes(field.value) ? field.value : ""}
//   //           size="small"
//   //           sx={baseTextFieldStyles}
//   //         >
//   //           {field.options.map((option: string, idx: number) => (
//   //             <MenuItem key={idx} value={option}>
//   //               {option}
//   //             </MenuItem>
//   //           ))}
//   //         </TextField>
//   //       )}

//   //       {field.type === "textarea" && (
//   //         <TextField
//   //           fullWidth
//   //           multiline
//   //           minRows={3}
//   //           variant="outlined"
//   //           placeholder={field.placeholder}
//   //           value={field.value}
//   //           size="small"
//   //           sx={{...baseTextFieldStyles,mb:"50px"}}
//   //         />
//   //       )}
//   //     </Box>
//   //   );
//   //   return(
//   //     {field.type === "file" && (
//   //       <Box sx={{ flex: 1 }} key={index}>
//   //         {/* Label with optional info icon */}
//   //         <Typography
//   //           variant="body2"
//   //           sx={{
//   //             mb: "4px",
//   //             fontFamily: "GeneralSans-m",
//   //             fontSize: "14px",
//   //             lineHeight: "20px",
//   //             display: "flex",
//   //             alignItems: "center",
//   //             gap: "4px",
//   //           }}
//   //         >
//   //           {labelWithIcon}
//   //         </Typography>

//   //         {/* Hidden file input */}
//   //         <input
//   //           type="file"
//   //           id={`upload-${index}`}
//   //           style={{ display: "none" }}
//   //           onChange={(e) => {
//   //             // Handle file upload if needed
//   //             console.log(e.target.files?.[0]);
//   //           }}
//   //         />

//   //         {/* Icon-only Upload Button */}
//   //         <label htmlFor={`upload-${index}`}>
//   //           <Box
//   //             sx={{
//   //               width: "100%",
//   //               height: "36px",
//   //               display: "flex",
//   //               alignItems: "center",
//   //               justifyContent: "center",
//   //               border: "1px solid #41414B",
//   //               borderRadius: "8px",
//   //               background: "#2A2A33",
//   //               cursor: "pointer",
//   //               "&:hover": {
//   //                 borderColor: "#FF581C",
//   //               },
//   //             }}
//   //           >
//   //             <Box
//   //               component="img"
//   //               src={field.fileIcon}
//   //               alt="upload"
//   //               sx={{ width: 20, height: 20 }}
//   //             />
//   //           </Box>
//   //         </label>

//   //         {/* Message below the icon */}
//   //         <Typography
//   //           sx={{
//   //             mt: "4px",
//   //             fontSize: "12px",
//   //             fontFamily: "GeneralSans-m",
//   //             color: "#B8B9C1",
//   //             textAlign: "center",
//   //           }}
//   //         >
//   //           {field.message}
//   //         </Typography>
//   //       </Box>
//   //     )}

//   //   )
//   // };

//   const renderField = (field: any, index: number) => {
//     const labelWithIcon = (
//       <Box display="flex" alignItems="center" gap={0.5}>
//         <span style={{ fontFamily: "GeneralSans-m", fontSize: "12px" }}>
//           {field.label}
//         </span>
//         {field.infoIcon && (
//           <Box
//             component="img"
//             src={field.infoIcon}
//             alt={field.label}
//             sx={{ width: 22, height: 22 }}
//           />
//         )}
//       </Box>
//     );

//     const baseTextFieldStyles = {
//       "& .MuiInputBase-root": {
//         border: "1px solid #41414B",
//         borderRadius: "8px",
//         background: "#2A2A33",
//         "&.Mui-focused fieldset": {
//           borderColor: "#FF581C",
//         },
//       },
//       "& .MuiInputBase-input": {
//         color: "#B8B9C1",
//       },
//       height: "36px",
//       fontFamily: "GeneralSans-m",
//       fontSize: "12px",
//     };

//     return (
//       <Box sx={{ flex: 1 }} key={index}>
//         {/* Label */}
//         <Typography
//           variant="body2"
//           sx={{
//             mb: "4px",
//             fontFamily: "GeneralSans-m",
//             fontSize: "14px",
//             lineHeight: "20px",
//             display: "flex",
//             alignItems: "center",
//             gap: "4px",
//           }}
//         >
//           {labelWithIcon}
//         </Typography>

//         {/* Text field */}
//         {field.type === "text" && (
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder={field.placeholder}
//             value={field.value}
//             size="small"
//             sx={baseTextFieldStyles}
//           />
//         )}

//         {/* Select field */}
//         {field.type === "select" && (
//           <TextField
//             select
//             fullWidth
//             variant="outlined"
//             value={field.options.includes(field.value) ? field.value : ""}
//             size="small"
//             sx={baseTextFieldStyles}
//           >
//             {field.options.map((option: string, idx: number) => (
//               <MenuItem key={idx} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//         )}

//         {/* Textarea field */}
//         {field.type === "textarea" && (
//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             variant="outlined"
//             placeholder={field.placeholder}
//             value={field.value}
//             size="small"
//             sx={{ ...baseTextFieldStyles, mb: "50px" }}
//           />
//         )}

//         {/* File upload field */}
//         {field.type === "file" && (
//           <>
//             <input
//               type="file"
//               id={`upload-${index}`}
//               style={{ display: "none" }}
//               onChange={(e) => {
//                 // Handle file upload logic here
//                 console.log(e.target.files?.[0]);
//               }}
//             />

//             <label htmlFor={`upload-${index}`}>
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: "36px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   border: "1px solid #41414B",
//                   borderRadius: "8px",
//                   background: "#2A2A33",
//                   cursor: "pointer",
//                   "&:hover": {
//                     borderColor: "#FF581C",
//                   },
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={field.fileIcon}
//                   alt="upload"
//                   sx={{ width: 20, height: 20 }}
//                 />
//               </Box>
//             </label>

//             <Typography
//               sx={{
//                 mt: "4px",
//                 fontSize: "12px",
//                 fontFamily: "GeneralSans-m",
//                 color: "#B8B9C1",
//                 textAlign: "center",
//               }}
//             >
//               {field.message}
//             </Typography>
//           </>
//         )}
//       </Box>
//     );
//   };

//   return (
//     <Card
//       sx={{
//         backgroundColor: "#18181B",
//         Width: 280,
//         borderRadius: 2,
//         boxShadow: 3,
//         color: "#FFF",
//         border: "1px solid #2A2A33",
//       }}
//     >
//       <CardContent sx={{ p: 0 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             pt: "12px",
//             px: "12px",
//           }}
//         >
//           {data.nodeIcon && (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 mb: "8px",
//               }}
//             >
//               <Box
//                 component="img"
//                 src={data.nodeIcon}
//                 alt={data.label}
//                 sx={{
//                   width: 24,
//                   height: 24,
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontFamily: "GeneralSans-m",
//                   fontSize: "14px",
//                   color: "#fff",
//                 }}
//               >
//                 {data.title}
//               </Typography>
//             </Box>
//           )}
//           <Box>
//             <Box
//               component="img"
//               src={data.playIcon}
//               alt={data.label}
//               sx={{
//                 width: 24,
//                 height: 24,
//                 color: data.isActive ? "#F7F7F8" : "",
//               }}
//             />
//           </Box>
//         </Box>
//         <Typography
//           sx={{
//             mb: "13px",
//             px: "12px",
//             fontFamily: "GeneralSans-r",
//             fontSize: "12px",
//             color: "#B8B9C1",
//           }}
//         >
//           {data.description}
//         </Typography>
//         <Box sx={{ border: "1px solid #2A2A33" }}></Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "8px",
//             px: "12px",
//           }}
//         >
//           {data.fields?.map(renderField)}
//         </Box>

//         {data.bottom && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               mt: "16px",
//               px: "12px",
//               pt: "3px",
//               background: "#2A2A33",
//               height: "36px",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 mb: "8px",
//               }}
//             >
//               <Box
//                 component="img"
//                 src={data.bottom.icons[0]}
//                 alt={data.label}
//                 sx={{
//                   width: 24,
//                   height: 24,
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontFamily: "GeneralSans-m",
//                   fontSize: "12px",
//                   color: "#fff",
//                 }}
//               >
//                 {data.bottom.text}
//               </Typography>
//             </Box>
//             <Box>
//               <Box
//                 component="img"
//                 src={data.bottom.icons[1]}
//                 alt={data.label}
//                 sx={{
//                   width: 24,
//                   height: 24,
//                   color: "#fff",
//                 }}
//               />
//             </Box>
//           </Box>
//         )}
//       </CardContent>

//       <Handle type="source" position={Position.Right} />
//       <Handle type="target" position={Position.Left} />
//     </Card>
//   );
// };

// export default AgentCustomNode;

import { Handle, Position } from "@xyflow/react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ChangeEvent } from "react";

const AgentCustomNode = ({ id, data, setData }: any) => {
  if (!data) return <div style={{ color: "white" }}>No data</div>;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      fields: data.fields.map((field: any) =>
        field.label === event.target.name
          ? { ...field, value: event.target.value }
          : field
      ),
    });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      fields: data.fields.map((field: any) =>
        field.label === event.target.name
          ? { ...field, value: event.target.value }
          : field
      ),
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setData({
        ...data,
        fields: data.fields.map((field: any) =>
          field.label === event.target.name
            ? { ...field, value: event.target.files![0] }
            : field
        ),
      });
      console.log("Uploaded file:", event.target.files?.[0]);
    }
  };

  const renderField = (field: any, index: number) => {
    const labelWithIcon = (
      <Box display="flex" alignItems="center" gap={0.5}>
        <span style={{ fontFamily: "GeneralSans-m", fontSize: "12px" }}>
          {field.label}
        </span>
        {field.infoIcon && (
          <Box
            component="img"
            src={field.infoIcon}
            alt={field.label}
            sx={{ width: 22, height: 22 }}
          />
        )}
      </Box>
    );

    const baseTextFieldStyles = {
      "& .MuiInputBase-root": {
        border: "1px solid #41414B",
        borderRadius: "8px",
        background: "#2A2A33",
        "&.Mui-focused fieldset": {
          borderColor: "#FF581C",
        },
      },
      "& .MuiInputBase-input": {
        color: "#B8B9C1",
      },
      height: "36px",
      fontFamily: "GeneralSans-m",
      fontSize: "12px",
    };

    return (
      <Box sx={{ flex: 1 }} key={index}>
        {/* Label */}
        <Typography
          variant="body2"
          component="div" // Changed component to div to avoid <p> nesting <div>
          sx={{
            mb: "4px",
            fontFamily: "GeneralSans-m",
            fontSize: "14px",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {labelWithIcon}
        </Typography>

        {/* Text field */}
        {field.type === "text" && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder={field.placeholder}
            value={field.value}
            size="small"
            sx={baseTextFieldStyles}
            name={field.label}
            onChange={handleInputChange}
          />
        )}

        {/* Select field */}
        {field.type === "select" && (
          <TextField
            select
            fullWidth
            variant="outlined"
            value={field.value}
            size="small"
            sx={baseTextFieldStyles}
            name={field.name}
            onChange={(event: any) => handleSelectChange(event)}
          >
            {field.options.map((option:any) => (
                 <MenuItem key={option.value} value={option.value}>
                 {option.label}
               </MenuItem>
            ))}
          </TextField>
        )}

        {/* Textarea field */}
        {field.type === "textarea" && (
          <TextField
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            placeholder={field.placeholder}
            value={field.value}
            size="small"
            sx={{ ...baseTextFieldStyles, mb: "50px" }}
            name={field.label}
            onChange={handleInputChange}
          />
        )}

        {/* File upload field */}
        {field.type === "file" && (
          <>
            <input
              type="file"
              id={`upload-${index}`}
              style={{ display: "none" }}
              name={field.label}
              onChange={handleFileChange}
            />

            <label htmlFor={`upload-${index}`}>
              <Box
                sx={{
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #41414B",
                  borderRadius: "8px",
                  background: "#2A2A33",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#FF581C",
                  },
                }}
              >
                <Box
                  component="img"
                  src={field.fileIcon}
                  alt="upload"
                  sx={{ width: 20, height: 20 }}
                />
              </Box>
            </label>

            <Typography
              sx={{
                mt: "4px",
                fontSize: "12px",
                fontFamily: "GeneralSans-m",
                color: "#B8B9C1",
                textAlign: "center",
              }}
            >
              {field.message}
            </Typography>
          </>
        )}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        backgroundColor: "#18181B",
        Width: 280,
        borderRadius: 2,
        boxShadow: 3,
        color: "#FFF",
        border: "1px solid #2A2A33",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: "12px",
            px: "12px",
          }}
        >
          {data.nodeIcon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                mb: "8px",
              }}
            >
              <Box
                component="img"
                src={data.nodeIcon}
                alt={data.label}
                sx={{ width: 24, height: 24 }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "14px",
                  color: "#fff",
                }}
              >
                {data.title}
              </Typography>
            </Box>
          )}
          <Box>
            <Box
              component="img"
              src={data.playIcon}
              alt={data.label}
              sx={{
                width: 24,
                height: 24,
                color: data.isActive ? "#F7F7F8" : "",
              }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            mb: "13px",
            px: "12px",
            fontFamily: "GeneralSans-r",
            fontSize: "12px",
            color: "#B8B9C1",
          }}
        >
          {data.description}
        </Typography>
        <Box sx={{ border: "1px solid #2A2A33" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            px: "12px",
          }}
        >
          {data.fields?.map(renderField)}
        </Box>

        {data.bottom && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: "16px",
              px: "12px",
              pt: "3px",
              background: "#2A2A33",
              height: "36px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                mb: "8px",
              }}
            >
              <Box
                component="img"
                src={data.bottom.icons[0]}
                alt={data.label}
                sx={{ width: 24, height: 24 }}
              />
              <Typography
                sx={{
                  fontFamily: "GeneralSans-m",
                  fontSize: "12px",
                  color: "#fff",
                }}
              >
                {data.bottom.text}
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                src={data.bottom.icons[1]}
                alt={data.label}
                sx={{ width: 24, height: 24, color: "#fff" }}
              />
            </Box>
          </Box>
        )}
      </CardContent>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </Card>
  );
};

export default AgentCustomNode;
