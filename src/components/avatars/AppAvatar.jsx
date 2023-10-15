import { Avatar, styled } from "@mui/material";
const StyledAvatar = styled(Avatar)(({
  theme
}) => ({
  backgroundColor: theme.palette.action.hover,
  borderColor: theme.palette.common.white,
  borderWidth: 1
}));

const AppAvatar = props => {
  return <StyledAvatar {...props} />;
};

export default AppAvatar;