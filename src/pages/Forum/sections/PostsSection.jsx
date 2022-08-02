/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: Posts section in button
 */
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import React from 'react';
import Post from '../components/Post';

// posts: a list of posts
// reqCreator (integer): the creator of project request of this forum
const PostsSection = ({ posts, reqCreator }) => {
    /*
        posts: [{
            "authId": 0,
            "authName": "string",
            "data": "string",
            "postId": 0
        }]
    */
    return (
        <List sx={{ width: '95%' }}>
            {
                posts.length === 0
                    ? <MKTypography variant='body1' textAlign='center'>No post in this forum.</MKTypography>
                    : posts.map(p =>
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