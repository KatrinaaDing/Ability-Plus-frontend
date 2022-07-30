import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import InboxIcon from '@mui/icons-material/Inbox';
import useAuth from "auth/useAuth";

import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {useState} from "react";
import Reply from "./Reply";

const Post = () => {
    const { auth } = useAuth();

    const [show, setShow] = useState(false)
    const toggleModal = () => {
        setShow(!show);
    }

    const [rShow, setRShow] = useState(false)
    const replyModal = () => {
        setRShow(!rShow);
    }

    return (
        <ListItem
            alginItems="flex-start"
            secondaryAction={
                <IconButton 
                    edge="end"
                    aria-label="comments"
                    sx={{mr: 2, opacity: 1, fontSize: 'lg'}}
                >
                    <MKButton variant="outlined" color="info" size="small" onClick={toggleModal}>
                    View
                    </MKButton>                     
                </IconButton>
            }
            sx={{
                p: 2,
                borderBottom: 'solid 0.3px gray'
            }}
        >
            <ListItemText
                primary={
                    <MKBox display='flex' flexDirection='row'>
                        <MKTypography component="div" variant="body2">
                        Posted at:&nbsp;&nbsp;xxxx xxxx&nbsp;&nbsp;&nbsp;&nbsp;Project:&nbsp;&nbsp;xxxx xxxx
                        </MKTypography>
                    </MKBox>
                }
            secondary={
                <>
                    <MKTypography component="div" variant="body2">
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                    </MKTypography>
                </>
            }
            sx={{
                mr: 10,
            }}
            /> 
{/* View Post Detail Modal */}
            <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
                <Slide direction="down" in={show} timeout={500}>
                    <MKBox
                    position="relative"
                    width="60%"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"
                    >      
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                            <MKTypography variant="h5">Post Detail</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                        </MKBox>         
{/*                         <Divider sx={{ my: 0 }} />    */}  
                        <MKBox component="section">
                            <Container>
                                <Grid container spacing={2} mb={3} justifyContent="space-between">
                                    <MKTypography component="div" variant="body1" fontWeight="bold" >
                                    Main Post
                                    </MKTypography>
                                    <MKButton variant="gradient" color="light" size="small">
                                    Go To Forum
                                    </MKButton>
                                    <Reply />
                                </Grid>
                                <br />
{/*                                 <Divider sx={{ my: 0 }} />    */}
                                <Grid container spacing={2} mb={3} justifyContent="space-between">
                                    <MKTypography component="div" variant="body1" fontWeight="bold" >
                                    Replies
                                    </MKTypography>
                                    <MKButton variant="gradient" color="info" size="small" onClick={replyModal}>
                                    Create Reply
                                    </MKButton>
                                    <Reply />
                                </Grid>
                            </Container>
                        </MKBox>
                    </MKBox>
                </Slide>          
            </Modal>
{/* Create Reply Modal */}
            <Modal open={rShow} onClose={replyModal} sx={{ display: "grid", placeItems: "center" }}>

                <Slide direction="down" in={rShow} timeout={500}>
                <MKBox
                    position="relative"
                    width="40%"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"
                >
                    <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                    <MKTypography variant="h5">Create Reply</MKTypography>
                    <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={replyModal} />
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox component="form" role="form" p={2} py={12}>
                    <Grid container item xs={12}>
                        <MKInput type="text" label="Reply" multiline fullWidth rows={6} defaultValue="Say Something..." />
                    </Grid>

                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox display="flex" justifyContent="space-between" p={1.5}>
                    <MKButton variant="gradient" color="light" onClick={replyModal}>
                        Cancel
                    </MKButton>
                    <MKButton variant="gradient" color="info" name="changePwd">
                        Post
                    </MKButton>
                    </MKBox>
                </MKBox>
                </Slide>
            </Modal>
        </ListItem>
    );
};

export default Post;




