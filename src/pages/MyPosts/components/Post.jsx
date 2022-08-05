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

import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Reply from "./Reply";

const PAGE_SIZE = 20;

const Post = ({postId, authId, authName, data, isPin, lastModifiedTime}) => {
    const { auth } = useAuth();
    const { projectId } = useParams();
    console.log(projectId)
    const axiosPrivate = useAxiosPrivate();
    const [pageNum, setPageNum] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [replyVal, setReplyVal] = useState('Say Something...');
  const [curPost, setCurPost] = useState({});//编辑的post
  const getReplyList = useCallback(() => {
    const params = new URLSearchParams({
      pageNo: pageNum,
      pageSize: PAGE_SIZE,
      postId
    });
    axiosPrivate.get(`/forum/post/get_a_post_reply_info?${params.toString()}`)
      .then((res) => {
        console.log(res, 'res');
        setPosts(res.data.data.records)
        // setPosts([...posts].concat(res.data.data.records));
        // if (pageNum * PAGE_SIZE >= res.data.data.total) {
        //   setHasMore(false);
        // } else {
        //   setHasMore(false);
        // }
      })
      .catch((e) => console.error(e));
  },[pageNum]);
    useEffect(() => {
        if(pageNum>1)
        getReplyList()
    },[pageNum])

    const [show, setShow] = useState(false)
    const toggleModal = () => {
        setShow(!show);
    }

    const [rShow, setRShow] = useState(false)
    const replyModal = () => {
        setRShow(!rShow);
    }
    const postReply = () => {
        console.log(curPost, 'curPost')
      let params = new URLSearchParams({
          postId,
          data: replyVal,
          isPin,
        });
        let url = '/forum/reply/new_reply'
        if(Object.values(curPost).length){
            url = '/forum/reply/edit_my_reply'
            params = new URLSearchParams({
              replyId:curPost.id,
              data: replyVal,
            })
        }
        axiosPrivate.post(`${url}?${params.toString()}`)
          .then((res) => {
            alert('success ' )
              replyCancel()
              getReplyList()
          })
          .catch((e) => console.error(e));
   }
   const handleDelete = (replyId) => {
      if (confirm("Do you really want to delete?")) {
          const params = new URLSearchParams({
              replyId,
            });
            axiosPrivate.post(`/forum/reply/delete_my_reply?${params.toString()}`)
              .then((res) => {
                alert('success')
                getReplyList()
              })
              .catch((e) => console.error(e));
      }
      
  }
  const handleEdit = (post) => {
      setCurPost(post)
      setRShow(true)
      setReplyVal(post.data)
  }
  
   const replyCancel = () => {
      setRShow(false)
      setReplyVal('Say Something...')
      setCurPost({})
  }   

    return (
        <ListItem
            secondaryAction={
                <MKButton variant="outlined" color="info" size="small" onClick={() => {toggleModal();getReplyList()}}>
                    View
                </MKButton>                     
            }
            sx={{
                p: 2,
                py: 3,
                borderBottom: 'solid 0.3px gray'
            }}
        >
            <ListItemText
                primary={
                    <MKBox display='flex' flexDirection='row'>
                        <MKTypography variant="subtitle1">
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;Project:&nbsp;&nbsp;xxxx xxxx */}
                            Posted at &nbsp;&nbsp;{new Date(lastModifiedTime * 1000).toLocaleString()}
                        </MKTypography>
                    </MKBox>
                }
            secondary={
                <>
                    <MKTypography variant="body2">
                        {data}
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
                                    <MKTypography variant="body1" fontWeight="bold" >
                                    Main Post
                                    </MKTypography>
                                    <MKButton variant="gradient" color="light" size="small" onClick={() => window.location.href = `/forum/${projectId}`}>
                                    Go To Forum
                                    </MKButton>
                                    <Reply post={{ replierName:authName,data, replyTime:lastModifiedTime, main:true }} />
                                </Grid>
                                <br />
{/*                                 <Divider sx={{ my: 0 }} />    */}
                                <Grid container spacing={2} mb={3} justifyContent="space-between">
                                    <MKTypography variant="body1" fontWeight="bold" >
                                    Replies
                                    </MKTypography>
                                    <MKButton variant="gradient" color="info" size="small" onClick={replyModal}>
                                    Create Reply
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
                    <MKTypography variant="h5">Create Reply</MKTypography>
                    <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={replyModal} />
                    </MKBox>
                    <Divider sx={{ my: 0 }} />
                    <MKBox component="form" role="form" p={2} py={12}>
                    <Grid container item xs={12}>
                        <MKInput value={replyVal} onChange={e => setReplyVal(e.target.value)} type="text" label="Reply" multiline fullWidth rows={6} defaultValue="Say Something..." />
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
        </ListItem>
    );
};

export default Post;




