import * as React from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Bars } from 'react-loader-spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: "background.paper",
  bgcolor: 'transparent',
  // border: '2px solid transparent',
  boxShadow: 24,
  p: 4,
};

const DialoBox = ({ open }) => {
  return (
    // <Modal
    //   aria-labelledby="transition-modal-title"
    //   aria-describedby="transition-modal-description"
    //   open={open}
    //   // onClose={handleClose}
    //   closeAfterTransition
    //   slots={{ backdrop: Backdrop }}
    //   slotProps={{
    //     backdrop: {
    //       timeout: 500,
    //     },
    //   }}
    // >
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(8,10,13, 0.8)',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            ...style,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bars
            height="80"
            width="80"
            color="#9c27b0"
            ariaLabel="bars-loading"
            wrapperStyle={
              {
                // border: 'none',
              }
            }
            // wrapperClass=""
            visible={open}
          />
        </Box>
      </Box>
    </Fade>
    // </Modal>
  );
};

export default DialoBox;
