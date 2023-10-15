import { styled, TextField } from "@mui/material";
import React from "react";
const StyledTextField = styled(TextField)(({
  theme
}) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: theme.palette.action.disabled
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.hover
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.disabled
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontWeight: 600
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled
  }
}));

const AppTextField = props => {
  return <StyledTextField {...props} />;
};

export default AppTextField;