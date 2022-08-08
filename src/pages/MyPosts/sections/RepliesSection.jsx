import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import MKButton from 'components/MKButton';
import React from 'react';
import Post from '../components/Post';

const RepliesSection = ({replies, reqCreator}) => {
    return (
        <List sx={{ width: '95%' }}>
            {
                replies.map(r => 
                    <Reply           // TODO feel free to change
                        key={r.data.records.id}
                        current={r.data.current}
                        hitCount={r.data.hitCount}
                        pages={r.data.pages}
/*                         isProjectOwner={reqCreator == r.data.records.replierId} */
                        time={r.data.records.replyTime}
                        id={r.id}
                        postId={r.data.records.postId}
                        replierId={r.replierId}
                        replierName={r.data.records.replierName} //Need a userName from get backend
                        content={r.data.records.data}
                        searchCount={r.data.searchCount}
                        size={r.data.size}
                        total={r.data.total}
                    />
                )                                    
            }

        </List>
    );
};

export default RepliesSection;