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

const Post = ({ id, isProjectOwner, authorId, authorName, content, postDate, numReply, isPin}) => {
    const { auth } = useAuth();
    return (
        <ListItem
            alignItems="flex-start"
            secondaryAction={
                <IconButton 
                    edge="end" 
                    aria-label="comments" 
                    sx={{mr: 2, opacity: 0.5, fontSize: 'lg'}}
                >
                    <CommentIcon /> &nbsp;
                    <MKTypography varaint='subtitle2'>{numReply}</MKTypography>
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
           
        </ListItem>
    );
};

export default Post;