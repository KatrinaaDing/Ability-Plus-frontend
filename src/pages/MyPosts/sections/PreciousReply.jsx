import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Post from "../components/Post";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import EndlessScroll from "glhfComponents/EndlessScroll";

const PAGE_SIZE = 20;

const PreciousReply = () => {
    // hooks
    const axiosPrivate = useAxiosPrivate();

    // states
    const [posts, setPosts] = useState([])
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        const getHistoryPosts = () => {
            const params = new URLSearchParams({
                pageNo: pageNum,
                pageSize: PAGE_SIZE
            })
            axiosPrivate.get('/forum/post/list_my_post?' + params.toString())
                .then(res => {
                    setPosts([...posts].concat(res.data.data.records))
                    if (pageNum * PAGE_SIZE >= res.data.data.total) 
                        setHasMore(false)
                    else
                        setHasMore(true)
                })
                .catch(e => console.error(e))
        }

        getHistoryPosts()
    }, [pageNum])



    return (
        <MKBox component="section">
            <Container>
                <br />
                <Grid container spacing={3} mb={3}>
                    <Grid>
                        <MKTypography component="div" variant="body1" fontWeight="bold" >
                            History Posts&nbsp;&nbsp;
                        </MKTypography>
                    </Grid>
                </Grid>
            </Container>
            <EndlessScroll
                dataLength={posts.length}
                next={() => setPageNum(pageNum + 1)}
                hasMore={hasMore}
            >
                {
                    posts.length === 0 
                    ? <MKTypography variant='body1'>You don't have post</MKTypography>
                    : posts.map(p =>
                        <Post 
                            key={p.postId}
                            postId={p.postId}
                            authId={p.authId}
                            authName={p.authName}
                            data={p.data}
                            isPin={p.isPin}
                            projectId={p.projectId}
                            lastModifiedTime={p.lastModifiedTime}
                        />
                    )
                }
            </EndlessScroll>
        </MKBox>
    );
};

export default PreciousReply;