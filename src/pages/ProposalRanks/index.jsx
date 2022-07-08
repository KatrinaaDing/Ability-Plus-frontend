import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import routes from "routes";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import ProposalRank from "glhfComponents/ProposalRank";
import StatusBadge from "glhfComponents/StatusBadge";

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
        <>
            <DefaultNavbar
            routes={routes}
            />
            <MKBox component="section" py={12}>
            <Container>
                <Grid container item justifyContent="center" xs={10}>
                    <MKTypography variant="h3" mb={1}>
                        Project Request Title
                    </MKTypography>
                    <StatusBadge statusCode={ statusCode }  />
                </Grid>
                <br />  
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                        <ProposalRank proposals={ proposals } />
                    </Grid>
                </Box>              
            </Container>
        </MKBox>
        
        <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
        </MKBox>
        </>
    );
}
export default ProposalRanks;