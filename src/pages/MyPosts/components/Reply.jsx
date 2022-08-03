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

const Reply = (props) => {
    const { id, isProjectOwner, authorId, authorName, post={}, handleDelete, handleEdit} = props;
    console.log(post,'post')
    const {data, replyTime, replierName, main} = post
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    
    return (
        <ListItem
            alignItems="flex-start"
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
                    <MKBox display='flex' flexDirection="row">
{/*                         {
                            isProjectOwner
                                ? <MKTypography color='primary'>{authorName} (Project Owner)</MKTypography>
                                : authorName === auth.username
                                    ? authorName + ' (Me)'
                                    : authorName

                        } */}
                        <MKTypography variant='body' color={replierName == auth.username && !main?'error':''}>{replierName}</MKTypography>
                    </MKBox>
                }
                secondary={
                    <>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <MKTypography variant='body'>
                            {data}
                            </MKTypography> 
                            <div>
                                <MKTypography variant="body">
                                Posted at:&nbsp;&nbsp;{replyTime}

                                </MKTypography>
                                {
                                    main?null:<><EditIcon onClick={() => handleEdit&&handleEdit(post)}/>
                                    <DeleteIcon onClick={() => handleDelete&&handleDelete(post.id)}/></>
                                }
                                

                            </div>
                        </Grid>
                    </>
                }
                sx={{
                    mr: 10,
                }}
            />
           
        </ListItem>
    );
};

export default Reply;