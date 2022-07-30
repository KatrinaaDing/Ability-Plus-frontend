import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React from 'react';
import NewReply from './sections/NewReply';
import PreciousReply from './sections/PreciousReply';

const MyPosts = () => {
    return (
        <BasicPageLayout title="My Posts">
            <NewReply />
            <PreciousReply />
        </BasicPageLayout>
    );
};

export default MyPosts;