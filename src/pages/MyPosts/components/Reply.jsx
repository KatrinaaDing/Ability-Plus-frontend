import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { Avatar, Divider, Grid, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKTypography from 'components/MKTypography';
import { Link } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import PushPinIcon from '@mui/icons-material/PushPin';
import MKBox from 'components/MKBox';

const Reply = ({ id, isProjectOwner, authorId, authorName, content}) => {
    const { auth } = useAuth();
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
                        <MKTypography variant='body'>name</MKTypography>
                    </MKBox>
                }
                secondary={
                    <>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <MKTypography variant='body'>
                            xxxxxxxxxxxxxxxxxxxxxxx
                            </MKTypography> 
                            <MKTypography variant="body">
                            Posted at:&nbsp;&nbsp;xxxx xxxx
                            </MKTypography>
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