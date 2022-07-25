import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKButton from 'components/MKButton';
import React from 'react';
import Post from '../components/Post';

const PostsSection = ({posts}) => {
    console.log(posts)
    return (
        <List sx={{ width: '90%' }}>
            {
                posts.map(p => 
                    <Post           // TODO not decided yet
                        key={p.postId}
                        id={p.postId}
                        authorId={p.authId}
                        authorName={p.authName}
                        content={p.data}
                        postDate={p.postTime}
                        numReply={p.numReply}
                    />
                )                                    
            }

        </List>
    );
};

export default PostsSection;