import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKButton from 'components/MKButton';
import React from 'react';
import Post from '../components/Post';

const RepliesSection = ({replies, reqCreator}) => {
    return (
        <List sx={{ width: '95%' }}>
            {
                replies.map(r => 
                    <Post           // TODO feel free to change
                        key={p.postId}
                        isProjectOwner={reqCreator == p.authId}
                        place={p.place}
                        id={p.postId}
                        authorId={p.authId}
                        authorName={p.authName}
                        content={p.data}
                    />
                )                                    
            }

        </List>
    );
};

export default RepliesSection;