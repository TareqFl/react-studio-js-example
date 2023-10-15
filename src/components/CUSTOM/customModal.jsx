import { Add } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Avatar, Box, Button, Stack, styled } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import CustomUploadInput from "components/CUSTOM/customUploadInput";
import { H6 } from "components/Typography";
import { useState } from "react"; // custom styled components

const StyledAppModal = styled(AppModal)(({ theme }) => ({
  width: 400,
  [theme.breakpoints.down(400)]: {
    width: 300,
  },
})); // -------------------------------------------------------------------

// -------------------------------------------------------------------
const CustomModal = ({ open, setOpen, title, deadline, fileType }) => {
  const [date, setDate] = useState(new Date());
  return (
    <StyledAppModal open={open} handleClose={() => setOpen(false)}>
      <Box mb={2}>
        <H6 mb={1}>{title}</H6>
        <AppTextField fullWidth size="small" placeholder={title} />
      </Box>

      {deadline ? (
        <>
          <Box mb={2}>
            <H6 mb={1}>Deadline</H6>
            <DatePicker
              value={date}
              slots={{
                textField: AppTextField,
              }}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </Box>
        </>
      ) : (
        <></>
      )}

      <Box mb={2}>
        <H6 mb={1}>Description</H6>
        <AppTextField
          rows={2}
          fullWidth
          multiline
          size="small"
          name="description"
          placeholder="Description"
        />
      </Box>

      <Box mb={2}>
        <CustomUploadInput accept={".mp3, .wav"} />
      </Box>

      {/* <Box my={1}>
        <H6 mb={1}>Team</H6>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button variant="dashed">
            <Add
              fontSize="small"
              sx={{
                color: "grey.600",
              }}
            />
          </Button>
          <Avatar alt="Remy Sharp" src="/static/user/user-7.png" />
          <Avatar alt="Travis Howard" src="/static/user/user-6.png" />
          <Avatar alt="Cindy Baker" src="/static/user/user-5.png" />
        </Stack>
      </Box> */}

      {/* <FlexBox mt={4} gap={2}>
        <Button variant="contained" fullWidth>
          Upload
        </Button>

        <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </FlexBox> */}
    </StyledAppModal>
  );
};

export default CustomModal;
