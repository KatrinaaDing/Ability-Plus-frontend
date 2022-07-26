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
import CloseIcon from '@mui/icons-material/Close';
import MKBox from 'components/MKBox';
import { IconButton } from '@mui/material';

const AlertModal = ({ open, handleClose, handleConfirm, title, content, disableClose }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px double black',
        boxShadow: 24,
        textAlign: 'center',
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        <Modal
            open={open}
            onClose={(_, reason) => {
                if (!disableClose) {
                    handleClose()
                } else if (disableClose && reason !== "backdropClick") {
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
            <Box sx={{ ...style}}>
                <MKBox sx={{width: '100%', display: 'flex', flexDirection: 'row-reverse'}}>
                    {
                        !disableClose && 
                        <IconButton color="dark" component="label" onClick={() => handleClose()}>
                            <CloseIcon fontSize='medium'/>
                        </IconButton>

                    }
                </MKBox>
                <Box sx={{ p: 2 }}>
                    <MKTypography variant='h4' sx={{ pb: 4 }}>{title}</MKTypography>
                    <MKTypography variant='body'> {content} </MKTypography>
                </Box>
                <Box display='flex' justifyContent='center' sx={{p: 2}}>
                    <MKButton variant='outlined' fullWidth color='info' onClick={handleConfirm}>OK</MKButton>
                </Box>
            </Box>
            </Fade>
        </Modal>
    );
};

export default AlertModal;