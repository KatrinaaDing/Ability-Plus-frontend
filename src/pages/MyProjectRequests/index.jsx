import { useState } from "react";
import { Link } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import routes from "routes";
import Box from '@mui/material/Box';
import RequestCard from "glhfComponents/RequestCard";
const MyProjectRequests = () => {
    return (
        <>
            <DefaultNavbar
            routes={routes}
            />
            <MKBox component="section" py={12}>
            <Container>
                <Grid container item justifyContent="center" xs={10}>
                    <MKTypography variant="h3" mb={1}>
                        All Project Requests
                    </MKTypography>
                </Grid>
                <br />  
                <Grid container justifyContent="flex-end"> 
                    <MKButton variant="gradient" color="info" size="large">Create Project</MKButton>
                </Grid> 
                <br />   
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                        <RequestCard userType={'company'} page={'My Project Requests'} />
                        <RequestCard userType={'company'} page={'My Project Requests'} />
                        <RequestCard userType={'company'} page={'My Project Requests'} />
                        <RequestCard userType={'company'} page={'My Project Requests'} />
                    </Grid>
                </Box>              
            </Container>
        </MKBox>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
        </MKBox>
        </>
    );
}
export default MyProjectRequests;
