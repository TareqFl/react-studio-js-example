import { Button, Grid, styled } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import ImageUploadInput from "components/input-fields/ImageUploadInput";
import Scrollbar from "components/ScrollBar";
import { H2, H6 } from "components/Typography";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axiosInstance from "utils/axios";
import * as Yup from "yup"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({ theme }) => ({
  maxWidth: 800,
  minWidth: 200,
  [theme.breakpoints.down(325)]: {
    maxWidth: "100%",
  },
}));
// Component
const AddEmployeeModal = ({
  open,
  onClose,
  edit,
  data,
  openModal,
  handleClose,
  children,
}) => {
  return (
    <StyledAppModal open={openModal} handleClose={handleClose}>
      {children}
    </StyledAppModal>
  );
};

export default AddEmployeeModal;
