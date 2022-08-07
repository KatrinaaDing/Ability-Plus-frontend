import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import React, { useEffect, useState } from 'react';
import NewReply from './sections/NewReply';
import PreciousReply from './sections/PreciousReply';
import useAxiosPrivate from 'hooks/useAxiosPrivate';


const MyPosts = () => {
    const axiosPrivate = useAxiosPrivate();
    const [newPosts, setNewPosts] = useState([])

    useEffect(() => {
        axiosPrivate.get('/forum/post/new_reply_post')
            .then(res => {
                setNewPosts(res.data.data)
                if (res.data.data.length) {
                    const params = JSON.stringify(
                        res.data.data
                    )
                    axiosPrivate.post('/forum/post/list_post_by_ids', params)
                        .then(res => {
                            setNewPosts(res.data.data)
                        })
                        .catch(e => console.error(e))
                }
            })
            .catch(e => console.error(e))

    }, [])

    return (
        <BasicPageLayout 
            title="My Posts"
            secondaryContent={newPosts.length > 0 && <NewReply count={newPosts} />}
        >
            <PreciousReply />
        </BasicPageLayout>
    );
};

export default MyPosts;