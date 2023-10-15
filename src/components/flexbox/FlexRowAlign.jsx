import { Box } from "@mui/material";

const FlexRowAlign = ({
  children,
  ...props
}) => <Box display="flex" alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>;

export default FlexRowAlign;