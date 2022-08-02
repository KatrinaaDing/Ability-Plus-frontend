/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A button and modal for creating new post
 */
import MKButton from 'components/MKButton';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Divider, Grid, Modal, Slide, Switch } from '@mui/material';
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import CloseIcon from "@mui/icons-material/Close";
import MKInput from 'components/MKInput';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import useAuth from 'auth/useAuth';

/**
 * 
 * @param {string} reqCreator: string of request creator's name
 */
const CreatePost = ({ reqCreator }) => {
    
    // hooks
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { projectId: projectId } = useParams();
    
    // states
    const [open, setOpen] = React.useState(false)
    const [pin, setPin] = React.useState(false)
    
    const isAuthor = auth.uesrname === reqCreator 
    
    // handlers
    const handleClose = () => setOpen(false)

    const handlePin = () => setPin(!pin)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const createNewPost = () => {     
            const params = new URLSearchParams({
                data: e.target.post.value, // TODO: 字段名未知
                projectId: projectId
            })
            if (isAuthor)
                params.append('isPin', e.target.pin.checked)
            axiosPrivate.post('/forum/post/new_post?' + params.toString())
                .then(res => {
                    setOpen(false)
                    location.reload()
                })
                .catch(e => console.error(e))
        }

        createNewPost()
    }

    return (
        <>
            <MKButton
                variant="gradient"
                color="info"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
            >
                Post
            </MKButton>
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
                            <MKTypography variant="h5">Create New Post</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={handleClose} />
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <MKBox component="form" role="form" p={4} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <MKInput variant="standard" label="Say something..." name='post' multiline fullWidth rows={6} />
                                </Grid>
                                {
                                    isAuthor && 
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
                            </Grid>
                            <Grid container item justifyContent="center" xs={12} mt={5}>
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

export default CreatePost;