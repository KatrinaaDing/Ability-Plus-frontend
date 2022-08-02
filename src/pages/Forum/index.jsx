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
import CreatePost from './components/CreatePost';
import PostsSection from './sections/PostsSection';


const Forum = () => {
    const axiosPrivate = useAxiosPrivate();
    const { projectId: projectId } = useParams();

    // project request states
    const [reqName, setReqName] = React.useState('');
    const [reqCreator, setReqCreator] = React.useState(-1);
    const [reqDetailOpen, setReqDetailOpen] = React.useState(false);

    // posts states
    const [posts, setPosts] = React.useState([])
    
    // get all posts on load
    React.useEffect(() => {
        const getPosts = () =>
            axiosPrivate.get('/forum/post/list_all_post?projectId=' + projectId)
                .then(res => setPosts(res.data.data))
                .catch(e => console.error(e))
        getPosts()
    }, [])

    return (
        <BasicPageLayout 
            title="Forum" 
            secondaryContent={
                <ProjectDetailBtn
                    setReqName={setReqName}
                    setReqCreator={setReqCreator}
                    projectId={projectId}
                    open={reqDetailOpen}
                    setOpen={setReqDetailOpen}
                />
            }
        >
            <MKBox 
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
            >
                <MKTypography variant='subtitle1'>Project: {reqName}</MKTypography>    
                <CreatePost />
            </MKBox>
            <MKBox sx={{ pt: 10}}>
                <PostsSection posts={posts} reqCreator={reqCreator}/>
            </MKBox>        
        </BasicPageLayout>
    );
};

export default Forum;