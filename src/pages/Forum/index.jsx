/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: A page for project forum
 */
import MKBox from 'components/MKBox';
import MKTypography from 'components/MKTypography';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import EndlessScroll from 'glhfComponents/EndlessScroll';
import ProjectDetailBtn from 'glhfComponents/ProjectDetailBtn';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import React from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostsSection from './sections/PostsSection';

const PAGE_SIZE = 20
// Forum for both companies and students: both students and companies can post and reply
const Forum = () => {
    const axiosPrivate = useAxiosPrivate();
    const { projectId: projectId } = useParams();

    // project request states
    const [reqName, setReqName] = React.useState('');
    const [reqCreator, setReqCreator] = React.useState('');
    const [reqDetailOpen, setReqDetailOpen] = React.useState(false);

    // posts states
    const [posts, setPosts] = React.useState([])
    const [pageNum, setPageNum] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(false);

    // get all posts on load
    React.useEffect(() => {
        const getPosts = () => {
            const params = new URLSearchParams({
                projectId: projectId,
                pageNo: pageNum,
                pageSize: PAGE_SIZE
            })
            axiosPrivate.get('/forum/post/list_all_post?' + params.toString())
                .then(res => {
                    setPosts([...posts].concat(res.data.data.records))
                    if (pageNum * PAGE_SIZE >= res.data.data.total)
                        setHasMore(false)
                    else
                        setHasMore(false)
                })
                .catch(e => console.error(e))
        }
        getPosts()
    }, [pageNum])

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
                <CreatePost reqCreator={reqCreator}/>
            </MKBox>
            <MKBox sx={{ pt: 10}}>
                <EndlessScroll
                    dataLength={posts.length}
                    next={() => setPageNum(pageNum + 1)}
                    hasMore={hasMore}
                >
                    <PostsSection posts={posts} reqCreator={reqCreator}/>
                </EndlessScroll>
            </MKBox>        
        </BasicPageLayout>
    );
};

export default Forum;