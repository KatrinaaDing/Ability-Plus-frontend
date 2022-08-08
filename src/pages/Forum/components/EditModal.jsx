/**
 * Author: Ziqi Ding
 * Created At: 31 Jul 2022
 * Discription: A modal for editing post
 */
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Collapse, Divider, Grid, IconButton, Modal, Slide, Switch, TextField } from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import CloseIcon from "@mui/icons-material/Close";
import MKInput from 'components/MKInput';
import MKButton from 'components/MKButton';
import useAuth from 'auth/useAuth';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import MKAlert from 'components/MKAlert';


const EditModal = ({ postId, content, isPin, isProjectOwner }) => {
    // hooks
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    // states
    const [open, setOpen] = React.useState(false)
    const [pin, setPin] = React.useState(isPin)
    const [errorOpen, setErrorOpen] = React.useState(false)
    const [successOpen, setSuccessOpen] = React.useState(false)

    // handlers
    const handleClose = () => setOpen(false)

    const handlePin = () => setPin(!pin)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (e.target.post.value === '') {
            setErrorOpen(true)
            return
        } 

        const params = new URLSearchParams();
        params.append('data', e.target.post.value)
        params.append('postId', postId)
        
        if (isProjectOwner)
            params.append('pin', e.target.pin.checked)
        
        // append query string after url if using POST
        axiosPrivate.post('/forum/post/edit_my_post?' + params.toString())
            .then(res => {
                setSuccessOpen(true)
                setTimeout(() => {
                    setOpen(false)
                    location.reload()
                }, 800);
            })
            .catch(e => console.error(e))
    }

    return (
        <>
            <IconButton
                edge="end"
                aria-label="delete"
                color='info'
                sx={{ mr: 0.5, opacity: 0.7, fontSize: 'lg' }}
                onClick={() => setOpen(true)}
            >
                <EditIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
                <Slide direction="down" in={open} timeout={500}>
                    <MKBox
                        position="relative"
                        width="50%"
                        display="flex"
                        flexDirection="column"
                        borderRadius="xl"
                        bgColor="white"
                        shadow="xl"
                    >
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                            <MKTypography variant="h5">Edit Post</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleClose} />
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <Collapse in={errorOpen} exit={!errorOpen}>
                            <MKAlert color="error" style={{ zIndex: '100' }} >Cannot post with empty content!</MKAlert>
                        </Collapse>
                        <Collapse in={successOpen} exit={!successOpen}>
                            <MKAlert color="success" style={{ zIndex: '100' }} >Success!</MKAlert>
                        </Collapse>
                        <MKBox component="form" role="form" p={2} onSubmit={handleSubmit}>
                                <TextField
                                    label="Say something..."
                                    name='post'
                                    defaultValue={content}
                                    multiline
                                    fullWidth
                                    rows={6}
                                    sx={{my: 3}}
                                    onChange={() => setErrorOpen(false)}
                                />
                                {
                                    // only allow pin when author is company
                                    isProjectOwner &&
                                    <Grid item xs={12} alignItems="center" ml={-1}>
                                        <Switch checked={pin} name='pin' onChange={handlePin} />
                                        <MKTypography
                                            variant="button"
                                            fontWeight="regular"
                                            color="text"
                                            ml={-1}
                                            sx={{ cursor: "pointer", userSelect: "none" }}
                                            onClick={handlePin}
                                        >
                                            &nbsp;&nbsp;Pin to top
                                        </MKTypography>
                                    </Grid>
                                }
                            <Grid container item justifyContent="center" xs={12} my={2}>
                                <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                                    Post
                                </MKButton>
                            </Grid>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>

        </>
    );
};

export default EditModal;