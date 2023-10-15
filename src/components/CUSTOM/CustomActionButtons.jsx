import { Button, Tooltip } from "@mui/material";
import React from "react";

const CustomActionButtons = ({ value, onClick, disabled, cutButton }) => {
  const { name, icon } = value;

  let toBeDisabled = disabled;

  if (name === "upload") {
    toBeDisabled = false;
  }
  if (name === "cut") {
    toBeDisabled = cutButton;
  }

  return (
    <Tooltip title={name} arrow>
      <span>
        <Button
          variant={"contained"}
          name={name}
          disabled={toBeDisabled}
          onClick={(e) => onClick(e)}
        >
          {icon}
        </Button>
      </span>
    </Tooltip>
  );
};

export default CustomActionButtons;
