/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A Post item displayed in forum
 */
import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import {
  Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import MKTypography from 'components/MKTypography';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import PushPinIcon from '@mui/icons-material/PushPin';
import MKBox from 'components/MKBox';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKButton from 'components/MKButton';
import MKInput from 'components/MKInput';
import { useState } from 'react';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import EndlessScroll from 'glhfComponents/EndlessScroll';
import Reply from '../../MyPosts/components/Reply';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useParams } from 'react-router-dom';

const PAGE_SIZE = 20;
const Post = ({
  id, isProjectOwner, authorId, authorName, content, postDate, numReply, isPin,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { projectId } = useParams();
  const { auth } = useAuth();
  const [show, setShow] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [curPost, setCurPost] = useState({});//编辑的post
  const [pageNum, setPageNum] = useState(1);
  const [posts, setPosts] = React.useState([]);
  const [replyVal, setReplyVal] = useState('Say Something...');

  const toggleModal = () => {
    setShow(!show);
  };

  const [rShow, setRShow] = useState(false);
  const replyModal = () => {
    setRShow(!rShow);
  };
  const getReplyList = () => {
    const params = new URLSearchParams({
      pageNo: pageNum,
      pageSize: PAGE_SIZE,
      postId: id,
    });
    axiosPrivate.get(`/forum/post/get_a_post_reply_info?${params.toString()}`)
      .then((res) => {
        setShow(true);
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
  };
  const postReply = () => {
      console.log(curPost, 'curPost')
    let params = new URLSearchParams({
        postId:id,
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
            alert('success' )
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
      alignItems="flex-start"
      secondaryAction={(
        <>
          {
                        // display edit and delete button for user's posts
                        authorName === auth.username
                        && (
                        <>
                          <DeleteModal postId={id} />
                          <EditModal postId={id} content={content} />
                        </>
                        )
                    }

          <IconButton
            edge="end"
            aria-label="comments"
            sx={{ mr: 2, opacity: 0.5, fontSize: 'lg' }}
            onClick={getReplyList}
          >
            <CommentIcon />
            {' '}
&nbsp;
            <MKTypography variant="subtitle2">{numReply}</MKTypography>
          </IconButton>

        </>
              )}
      sx={{
        p: 2,
        borderBottom: 'solid 0.3px gray',
      }}
    >

      <ListItemAvatar>
        <Avatar alt={authorName} src="/src/assets/images/profile-avatars/company.png" />
      </ListItemAvatar>
      <ListItemText
        primary={(
          <MKBox display="flex" flexDirection="row">
            {
                            isProjectOwner
                              ? (
                                <MKTypography color="primary">
                                  {authorName}
                                  {' '}
                                  (Project Owner)
                                </MKTypography>
                              )
                              : authorName === auth.username
                                ? `${authorName} (Me)`
                                : authorName
                        }
            <PushPinIcon color="warning" fontSize="medium" opacity={Number(isPin)} sx={{ mt: 'auto', mb: 'auto', ml: 1 }} />
          </MKBox>
                  )}
        secondary={(
          <>
            <MKTypography variant="caption">{new Date(postDate * 1000).toLocaleString()}</MKTypography>
            <br />
            <MKTypography variant="body">{content}</MKTypography>
          </>
                  )}
        sx={{
          mr: 20,
        }}
      />
      <Modal open={show} onClose={toggleModal} sx={{ display: 'grid', placeItems: 'center' }}>
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
              <CloseIcon fontSize="medium" sx={{ cursor: 'pointer' }} onClick={toggleModal} />
            </MKBox>
            {/*                         <Divider sx={{ my: 0 }} />    */}
            <MKBox component="section">
              <Container>
                <Grid container spacing={2} mb={3} justifyContent="space-between">
                  <MKTypography component="div" variant="body1" fontWeight="bold">
                    Main Post
                  </MKTypography>
                  <MKButton variant="gradient" color="light" size="small" onClick={() => window.location.href = `/forum/${projectId}`}>
                    Go To Forum
                  </MKButton>
                  <Reply post={{ replierName: authorName, data: content, replyTime: postDate, main: true }} />
                </Grid>
                <br />
                {/*                                 <Divider sx={{ my: 0 }} />    */}
                <Grid container spacing={2} mb={3} justifyContent="space-between">
                  <MKTypography component="div" variant="body1" fontWeight="bold">
                    Replies
                  </MKTypography>
                  <div>
                    <MKButton variant="gradient" color="info" size="small" onClick={replyModal}>
                      Create Reply
                    </MKButton>
                  </div>

                </Grid>
                <EndlessScroll
                  dataLength={posts.length}
                  next={() => setPageNum(pageNum + 1)}
                  hasMore={hasMore}
                >
                  {
                            posts.map((ele) => (
                                <>
                                <Reply key={ele.postId} post={ele} handleDelete={handleDelete} handleEdit={handleEdit} />
                                </>
                            ))
                        }
                </EndlessScroll>
              </Container>
            </MKBox>
          </MKBox>
        </Slide>
      </Modal>
      {/* Create Reply Modal */}
      <Modal open={rShow} onClose={replyModal} sx={{ display: 'grid', placeItems: 'center' }}>

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
              <CloseIcon fontSize="medium" sx={{ cursor: 'pointer' }} onClick={replyModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox component="form" role="form" p={2} py={12}>
              <Grid container item xs={12}>
                <MKInput  value={replyVal} onChange={e => setReplyVal(e.target.value)} type="text" label="Reply" multiline fullWidth rows={6} defaultValue="Say Something..." />
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
