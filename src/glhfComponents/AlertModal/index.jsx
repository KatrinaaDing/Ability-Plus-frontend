/**
 * Author: Ziqi Ding
 * Created At: 11 Jul 2022
 * Discription: A simple alert modal
 */
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

const AlertModal = ({ open, handleClose, handleClick, title, content }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Modal
            open={open}
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    handleClose();
                }
            }}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
            <Box sx={{ ...style, width: 400 }}>
                <Box sx={{ p: 2 }}>
                    <MKTypography variant='h3' sx={{ pb: 4 }}>{title}</MKTypography>
                    <MKTypography variant='body'> {content} </MKTypography>
                </Box>
                <Box display='flex' justifyContent='center' sx={{p: 2}}>
                    <MKButton variant='outlined' fullWidth color='info' onClick={handleClick}>OK</MKButton>
                </Box>
            </Box>
            </Fade>
        </Modal>
    );
};

export default AlertModal;