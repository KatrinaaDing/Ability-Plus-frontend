import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKTypography from 'components/MKTypography';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import PushPinIcon from '@mui/icons-material/PushPin';
import MKBox from 'components/MKBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
// import moment from 'moment';

const Reply = (props) => {
    const { id, isProjectOwner, authorId, authorName, post = {}, handleDelete, handleEdit } = props;
    const { data, replyTime, replierName, main } = post
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                p: 2,
                borderBottom: !main && 'solid 0.3px gray'
            }}
            secondaryAction={
                <>
                    <MKBox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}  >

                        {
                            !main &&
                            <MKBox>
                                <IconButton color='info' sx={{ mr: 0.5, opacity: 0.7, fontSize: 'lg' }}>
                                    <EditIcon onClick={() => handleEdit && handleEdit(post)} />
                                </IconButton>
                                <IconButton color='error' sx={{ mr: 0.5, opacity: 0.7, fontSize: 'lg' }}>
                                    <DeleteIcon onClick={() => handleDelete && handleDelete(post.id)} />
                                </IconButton>
                            </MKBox>
                        }

                        <MKTypography variant="body2">
                            Posted at:&nbsp;&nbsp;{new Date(replyTime * 1000).toLocaleString()}
                        </MKTypography>


                    </MKBox>
                </>
            }
        >

            <ListItemAvatar>
                <Avatar alt={replierName} src="/src/assets/images/profile-avatars/company.png" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <MKBox display='flex' flexDirection="row">
                        {/*                         {
                            isProjectOwner
                                ? <MKTypography color='primary'>{authorName} (Project Owner)</MKTypography>
                                : authorName === auth.username
                                    ? authorName + ' (Me)'
                                    : authorName

                        } */}
                        <MKTypography variant='body'>
                            {replierName} {replierName == auth.username ? '(ME)' : ''}
                        </MKTypography>
                    </MKBox>
                }
                secondary={
                    <MKTypography variant='body'>
                        {data}
                    </MKTypography>
                }

            />

        </ListItem>
    );
};

export default Reply;