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

/**
 * 
 * @param {array} posts a list of posts
 * @param {string} reqCreator the creator of project request of this forum
 * @returns 
 */
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
                posts.map(p =>
                    <Post           // TODO feel free to change
                        key={p.postId}
                        isProjectOwner={reqCreator === p.authName}
                        id={p.postId}
                        authorId={p.authId}
                        authorName={p.authName}
                        content={p.data}
                        postDate={p.lastModifiedTime}
                        numReply={p.numReply}
                        isPin={p.isPin}
                    />
                )

            }
        </List>
    );
};

export default PostsSection;