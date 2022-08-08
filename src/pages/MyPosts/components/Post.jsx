import { useEffect, useState, useCallback } from "react";
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
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import EndlessScroll from 'glhfComponents/EndlessScroll';
import { useParams } from 'react-router-dom';

import { Avatar, Collapse, IconButton, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import Reply from "./Reply";
import MKAlert from "components/MKAlert";

const PAGE_SIZE = 20;

const Post = ({ postId, authId, authName, data, isPin, lastModifiedTime, projectId, newStatus }) => {
    const { auth } = useAuth();
    // const { projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [pageNum, setPageNum] = useState(1);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [replyVal, setReplyVal] = useState('');
    const [curPost, setCurPost] = useState({});//编辑的post
    const [sAlertStr, setSAlertStr] = useState("");

    const [errorOpen, setErrorOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState('')

    const getReplyList = useCallback(() => {
        const params = new URLSearchParams({
            pageNo: pageNum,
            pageSize: PAGE_SIZE,
            postId
        });
        axiosPrivate.get(`/forum/post/get_a_post_reply_info?${params.toString()}`)
            .then((res) => {
                setPosts(res.data.data.records)
                // setPosts([...posts].concat(res.data.data.records));
                // if (pageNum * PAGE_SIZE >= res.data.data.total) {
                //   setHasMore(false);
                // } else {
                //   setHasMore(false);
                // }
            })
            .catch((e) => console.error(e));
    }, [pageNum]);
    useEffect(() => {
        if (pageNum > 1)
            getReplyList()
    }, [pageNum])

    const [show, setShow] = useState(false)
    const toggleModal = () => {
        setShow(!show);
    }

    const [rShow, setRShow] = useState(false)
    const replyModal = () => {
        setRShow(!rShow);
        setReplyVal('')
    }
    const postReply = () => {
        console.log(curPost, 'curPost')
        console.log(replyVal)
        // check empty value
        if (replyVal === '') {
            setErrorOpen(true)
            return
        }

        let params = new URLSearchParams({
            postId,
            data: replyVal,
            isPin,
        });
        let url = '/forum/reply/new_reply'
        if (Object.values(curPost).length) {
            url = '/forum/reply/edit_my_reply'
            params = new URLSearchParams({
                replyId: curPost.id,
                data: replyVal,
            })
        }
        axiosPrivate.post(`${url}?${params.toString()}`)
            .then((res) => {
                setSuccessOpen(true)
                setTimeout(() => {
                    setSuccessOpen(false)
                    replyCancel()
                    getReplyList()
                }, 800);
            })
            .catch((e) => console.error(e));
    }
    const handleDelete = (replyId) => {
            const params = new URLSearchParams({
                replyId,
            });
            axiosPrivate.post(`/forum/reply/delete_my_reply?${params.toString()}`)
                .then((res) => {
                    setSAlertStr("Success!")
                    setTimeout(() => {
                        setSAlertStr("")
                    }, 1000);
                    getReplyList()
                })
                .catch((e) => console.error(e));

    }
    const handleEdit = (post) => {
        setCurPost(post)
        setRShow(true)
        setReplyVal(post.data)
    }

    const replyCancel = () => {
        setRShow(false)
        setReplyVal('')
        setCurPost({})
    }


    return (
        <>
            <MKButton
                fullWidth
                color='white'
                variant='contained'
                onClick={() => { toggleModal(); getReplyList() }}
                sx={{
                    my: 1,
                    py: 2,
                }}
            >
                <Grid container>
                    <Grid item xs={12} md={10.5} justifyContent='flex-start' textAlign='left'>
                        <MKTypography variant="body2">
                            <b>
                            {
                                data.split("\n").map((i, key) => <div key={key}>{i}</div>)
                            }
                            </b>
                        </MKTypography>
                    </Grid>
                    <Grid item xs={12} md={1.5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'right' }}>
                        <MKTypography variant='caption' >
                            {new Date(lastModifiedTime * 1000).toLocaleString()}
                        </MKTypography>
                    </Grid>
                </Grid>
            </MKButton>
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
                        <Collapse in={sAlertStr != ""}>
                            <MKAlert color="success" style={{ zIndex: '100' }}>{sAlertStr}</MKAlert>
                        </Collapse>
                        <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                            <MKTypography variant="h5">Post Detail</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                        </MKBox>
                        {/*                         <Divider sx={{ my: 0 }} />    */}
                        <MKBox component="section" p={2}>
                            <Container>
                                <Grid container mb={3} justifyContent="space-between">
                                    <MKTypography variant="body1" fontWeight="bold" >
                                        Main Post
                                    </MKTypography>
                                    <MKButton variant="gradient" color="light" size="small" onClick={() => window.location.href = `/forum/${projectId}`}>
                                        Go To Forum
                                    </MKButton>
                                    <Reply post={{ replierName: authName, data, replyTime: lastModifiedTime, main: true }} />
                                </Grid>
                                <br />
                                {/*                                 <Divider sx={{ my: 0 }} />    */}
                                <Grid container mb={3} justifyContent="space-between">
                                    <MKTypography variant="body1" fontWeight="bold" >
                                        Replies
                                    </MKTypography>
                                    <MKButton variant="gradient" color="info" size="small" onClick={replyModal}>
                                        Reply
                                    </MKButton>

                                </Grid>
                                <EndlessScroll
                                    dataLength={posts.length}
                                    next={() => setPageNum(pageNum + 1)}
                                    hasMore={hasMore}
                                >
                                    {
                                        posts.map((ele) => (
                                            <Reply key={ele.postId} post={ele} handleDelete={handleDelete} handleEdit={handleEdit} />
                                        ))
                                    }
                                </EndlessScroll>
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
                            <MKTypography variant="h5">Reply</MKTypography>
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={replyModal} />
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <Collapse in={errorOpen} exit={!errorOpen}>
                            <MKAlert color="error" style={{ zIndex: '100' }} >Cannot reply with empty content!</MKAlert>
                        </Collapse>
                        <Collapse in={successOpen} exit={!successOpen}>
                            <MKAlert color="success" style={{ zIndex: '100' }} >Success!</MKAlert>
                        </Collapse>
                        <MKBox component="form" role="form" p={2}>
                            <Grid container item xs={12}>
                                <TextField defaultValue={replyVal} placeholder="Say something..." onChange={e => {setReplyVal(e.target.value); setErrorOpen(false)}} type="text" label="Reply" multiline fullWidth rows={6} />
                            </Grid>
                        </MKBox>
                        <Divider sx={{ my: 0 }} />
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="light" onClick={replyModal}>
                                Cancel
                            </MKButton>
                            <MKButton variant="gradient" color="info" name="changePwd" onClick={postReply}>
                                Post
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>
        </>

    );
};

export default Post;




