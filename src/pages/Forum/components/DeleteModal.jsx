/**
 * Author: Ziqi Ding
 * Created At: 31 Jul 2022
 * Discription: A modal for confirming deleting post
 */
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Divider, Grid, IconButton, Modal, Slide, Switch } from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import CloseIcon from "@mui/icons-material/Close";
import MKButton from 'components/MKButton';
import useAuth from 'auth/useAuth';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import DeleteIcon from '@mui/icons-material/Delete';


const DeleteModal = ({postId}) => {
    // hooks
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    // states
    const [open, setOpen] = React.useState(false)
    const [pin, setPin] = React.useState(false)

    // handlers
    const handleClose = () => setOpen(false)

    const handleDelete = (e) => {
        const params = new URLSearchParams();
        params.append('postId', postId)

        // append query string after url if using POST
        axiosPrivate.post('/forum/post/delete_my_post?' + params.toString())
            .then(res => {
                setOpen(false)
                location.reload()
            })
            .catch(e => console.error(e))
    }

    return (
        <>
            <IconButton
                edge="end"
                aria-label="delete"
                sx={{ mr: 0.5, opacity: 0.7, fontSize: 'lg' }}
                color='error'
                onClick={() => setOpen(true)}
                alt='Delete the post'
            >
                <DeleteIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
                <Slide direction="down" in={open} timeout={500}>
                    <MKBox
                        position="relative"
                        width="20%"
                        display="flex"
                        flexDirection="column"
                        borderRadius="xl"
                        bgColor="white"
                        shadow="xl"
                    >
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                            <MKTypography variant="h6">Delete Confirm</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleClose} />
                        </MKBox>
                        <MKTypography variant="body2" color="secondary" fontWeight="regular" textAlign="center" sx={{ py: 2 }}>
                            All replies will also be deleted. <br/>
                            You sure want to delete?
                        </MKTypography>
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="light" onClick={handleClose}>
                                No
                            </MKButton>
                            <MKButton variant="gradient" color="info" name="confirm" onClick={handleDelete}>
                                Yes
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>  
        
        </>
    );
};

export default DeleteModal;