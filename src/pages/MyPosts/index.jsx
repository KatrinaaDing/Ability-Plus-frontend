import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import NewReply from './sections/NewReply';
import PreciousReply from './sections/PreciousReply';
// Company's My Posts page(Forum)
const MyPosts = () => {
    return (
        <BasicPageLayout title="My Posts">
            <NewReply />
            <PreciousReply />
        </BasicPageLayout>
    );
};

export default MyPosts;