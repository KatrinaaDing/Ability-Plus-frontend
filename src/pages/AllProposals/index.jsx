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
import RequestCard from "glhfComponents/RequestCard-Backup";
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const AllProposals = () => {
    return (
        <BasicPageLayout title="All Proposals">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                    <RequestCard userType={'company'} page={'All Proposals'} />
                    <RequestCard userType={'company'} page={'All Proposals'} />
                    <RequestCard userType={'company'} page={'All Proposals'} />
                    <RequestCard userType={'company'} page={'All Proposals'} />
                </Grid>
            </Box>              
        </BasicPageLayout>
    );
}
export default AllProposals;
