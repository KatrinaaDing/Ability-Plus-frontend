/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A page for project forum
 */
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import ProjectDetailBtn from 'glhfComponents/ProjectDetailBtn';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React from 'react';
import { useParams } from 'react-router-dom';
import PostsSection from './sections/PostsSection';


const samplePosts = [
    {
        postId: 0,
        authId: 37,
        authName: 'Jane Wong',
        data: 'I am so confusing!',
        postTime: new Date().getTime()/1000,
        numReply: 5
    },
    {
        postId: 1,
        authId: 56,
        authName: 'Tom Wong',
        data: 'I am so confusing too!',
        postTime: new Date().getTime() / 1000,
        numReply: 0
    },
    {
        postId: 2,
        authId: 89,
        authName: 'Jack Wong',
        data: 'I am so confusing as well!',
        postTime: new Date().getTime() / 1000,
        numReply: 4
    }
]

const Forum = () => {
    const axiosPrivate = useAxiosPrivate();
    const { projectId: projectId } = useParams();
    const [reqName, setReqName] = React.useState('');
    const [reqDetailOpen, setReqDetailOpen] = React.useState(false);
    

    return (
        <BasicPageLayout 
            title="Forum" 
            secondaryContent={
                <ProjectDetailBtn
                    setReqName={setReqName}
                    projectId={projectId}
                    open={reqDetailOpen}
                    setOpen={setReqDetailOpen}
                />
            }
        >
            <MKTypography variant='subtitle1'>Project: {reqName}</MKTypography>    
            <MKBox sx={{ pt: 10}}>
                <PostsSection posts={samplePosts}/>
            </MKBox>        
        </BasicPageLayout>
    );
};

export default Forum;