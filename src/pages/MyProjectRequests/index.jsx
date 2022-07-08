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
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const MyProjectRequests = () => {
    return (
        <BasicPageLayout title="My Project Reqeusts">
            
             
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
       
        </BasicPageLayout >
    );
}
export default MyProjectRequests;
