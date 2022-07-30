import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKButton from 'components/MKButton';
import React from 'react';
import Post from '../components/Post';

const PostsSection = ({posts, reqCreator}) => {
    return (
        <List sx={{ width: '95%' }}>
            {
                posts.map(p => 
                    <Post           // TODO feel free to change
                        key={p.postId}
                        place={p.place}
                        id={p.postId}
                        pId={p.projectId}
                        pName={p.projectName}
                        content={p.data}
                    />
                )                                    
            }

        </List>
    );
};

export default PostsSection;