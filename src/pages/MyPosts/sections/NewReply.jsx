import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import Post from "../components/Post";

const NewReply = () => {

    return (
        <MKBox component="section">
            <Container>
                <br />
                <Grid container spacing={3} mb={3}>
                    <Grid>
                        <MKTypography component="div" variant="body1" fontWeight="bold" >
                        You Have New Reply!&nbsp;&nbsp;
                        </MKTypography>
                    </Grid>
                </Grid>
            </Container>
            <Post />
        </MKBox>
    );
};

export default NewReply;