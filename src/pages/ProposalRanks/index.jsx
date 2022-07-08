import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import ProposalRank from "glhfComponents/ProposalRank";
import StatusBadge from "glhfComponents/StatusBadge";
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const requestTitle = "Management Proposals"

const ProposalRanks = () => {
    const params = useParams();
    const [requestId, setRequestId] = useState(0);
    const [statusCode, setStatusCode] = useState(0);
    //need to use request id to (requestname, status, a list of ranks)
    const proposals = [
        {
        rank: 1,
        title: 'title1',
        description: 'description1',
        author: 'author1',
        like: 100
        },
        {
        rank: 2,
        title: 'title2',
        description: 'description2',
        author: 'author2',
        like: 10
        }
    ]
    
    return (
        <BasicPageLayout title={title}>
            <Container>
                <br />  
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                        <ProposalRank proposals={ proposals } />
                    </Grid>
                </Box>              
            </Container>
 
        </BasicPageLayout>
    );
}
export default ProposalRanks;