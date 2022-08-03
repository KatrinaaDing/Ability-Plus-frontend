import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Post from "../components/Post";
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const NewReply = () => {
    const [count, setCount] = useState([])
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
            axiosPrivate.get('/forum/post/new_reply_post' )
                .then(res => {
                    console.log('cc', res.data.data)
                    setCount(res.data.data)
                })
                .catch(e => console.error(e))
      
    }, [])
    return (
        <MKBox component="section">
            <Container>
                <br />
                {
                    count?.length>0?<Grid container spacing={3} mb={3}>
                    <Grid>
                        <MKTypography component="div" variant="body1" fontWeight="bold" >
                        You Have New Reply!&nbsp;&nbsp;
                        </MKTypography>
                    </Grid>
                </Grid>:null
                }
                
            </Container>
            {
                count.map(p =>
                    <Post 
                        key={p}
                        postId={p}
                    />)
            }
        </MKBox>
    );
};

export default NewReply;