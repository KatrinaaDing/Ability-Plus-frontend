/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A Post item displayed in forum
 */
import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKTypography from 'components/MKTypography';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import PushPinIcon from '@mui/icons-material/PushPin';
import MKBox from 'components/MKBox';
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKButton from "components/MKButton";
import Reply from "../../MyPosts/components/Reply"
import MKInput from 'components/MKInput';
import { useState } from 'react';

const Post = ({ id, isProjectOwner, authorId, authorName, content, postDate, numReply, isPin}) => {
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
            alignItems="flex-start"
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="comments" 
                    sx={{mr: 2, opacity: 0.5, fontSize: 'lg'}}
                    onClick={toggleModal}
                >
                    <CommentIcon /> &nbsp;
                    <MKTypography variant='subtitle2'>{numReply}</MKTypography>
                </IconButton>
            }
            sx={{
                p: 2,
                borderBottom: 'solid 0.3px gray'
            }}
        >
            
            <ListItemAvatar>
                <Avatar alt={authorName} src="/src/assets/images/profile-avatars/company.png" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <MKBox display='flex' flexDirection='row'>
                        {
                            isProjectOwner
                                ? <MKTypography color='primary'>{authorName} (Project Owner)</MKTypography>
                                : authorName === auth.username
                                    ? authorName + ' (Me)'
                                    : authorName
                        }
                        <PushPinIcon color='warning' fontSize='medium' opacity={Number(isPin)} sx={{mt: 'auto', mb: 'auto', ml: 1}}/>
                    </MKBox>
                }
                secondary={
                    <>
                        <MKTypography variant='caption'>{new Date(postDate * 1000).toLocaleString()}</MKTypography><br/>
                        <MKTypography variant='body'>{content}</MKTypography> 
                    </>
                }
                sx={{
                    mr: 10,
                }}
            />
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