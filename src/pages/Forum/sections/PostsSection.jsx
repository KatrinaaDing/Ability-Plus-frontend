/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: Posts section in button
 */
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
                        isProjectOwner={reqCreator == p.authId}
                        id={p.postId}
                        authorId={p.authId}
                        authorName={p.authName}
                        content={p.data}
                        postDate={p.postTime}
                        numReply={p.numReply}
                        isPin={p.pin}
                    />
                )                                    
            }

        </List>
    );
};

export default PostsSection;