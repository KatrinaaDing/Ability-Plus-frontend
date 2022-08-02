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


const samplePosts = [
    {
        postId: 0,
        authId: 65,
        authName: 'Google',
        data: 'Anoucement: Deadline extend to Sep 2022',
        postTime: new Date().getTime() / 1000,
        pin: true,
        numReply: 5
    },
    {
        postId: 4,
        authId: 37,
        authName: 'ZIQI',
        data: 'I am so confusing as well! Sed tempus nisi quis ipsum ullamcorper tincidunt. Maecenas elementum ac mi nec fermentum. Maecenas et scelerisque nunc. Fusce rutrum nunc lacus, eget tristique justo iaculis facilisis. Aenean ornare suscipit quam, in viverra lorem convallis at. Aliquam fringilla maximus sapien, non semper odio tincidunt vitae. Sed semper ante quam, in viverra erat accumsan sit amet. Sed vitae ligula nibh.',
        postTime: new Date().getTime()/1000,
        pin: false,
        numReply: 5
    },
    {
        postId: 1,
        authId: 56,
        authName: 'Tom Wong',
        data: 'I am so confusing too!',
        postTime: new Date().getTime() / 1000,
        pin: false,
        numReply: 0
    },
    {
        postId: 3,
        authId: 65,
        authName: 'Google',
        data: 'Project detail updated',
        postTime: new Date().getTime() / 1000,
        pin: false,
        numReply: 5
    },
    {
        postId: 2,
        authId: 89,
        authName: 'Jack Wong',
        data: 'I am so confusing as well! Sed tempus nisi quis ipsum ullamcorper tincidunt. Maecenas elementum ac mi nec fermentum. Maecenas et scelerisque nunc. Fusce rutrum nunc lacus, eget tristique justo iaculis facilisis. Aenean ornare suscipit quam, in viverra lorem convallis at. Aliquam fringilla maximus sapien, non semper odio tincidunt vitae. Sed semper ante quam, in viverra erat accumsan sit amet. Sed vitae ligula nibh.',
        postTime: new Date().getTime() / 1000,
        pin: false,
        numReply: 4
    }
]

const Forum = () => {
    const axiosPrivate = useAxiosPrivate();
    const { projectId: projectId } = useParams();

    // project request states
    const [reqName, setReqName] = React.useState('');
    const [reqCreator, setReqCreator] = React.useState(-1);
    const [reqDetailOpen, setReqDetailOpen] = React.useState(false);

    // posts states
    const [posts, setPosts] = React.useState([])
    
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