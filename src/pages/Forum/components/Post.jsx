import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKTypography from 'components/MKTypography';

const Post = ({id, authorId, authorName, content, postDate, numReply}) => {
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
                primary={authorName}
                secondary={
                    <>
                        <MKTypography variant='caption'>{new Date(postDate * 1000).toLocaleString()}</MKTypography><br/>
                        <MKTypography variant='body'>{content}</MKTypography> 
                    </>
                }
            />
        </ListItem>
    );
};

export default Post;