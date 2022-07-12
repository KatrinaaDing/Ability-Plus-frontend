import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';

import CloseIcon from "@mui/icons-material/Close";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";


import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const sampleData = {
    name: 'Google'
}

const CompanyInfoPage = () => {
    

    return (
        <BasicPageLayout title={sampleData.name}>

            <Container>
                <Grid container item justifyContent="space-between" xs={10}>
                    <MKButton variant="outlined" color="error" size="small">
                        Follow
                    </MKButton>
                </Grid>
                <br />
                <Grid container item xs={12} lg={7} justifyContent="flex-start" >
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h5" color="text" fontWeight="bold" textTransform="uppercase">
                                    Username
                                </MKTypography>
                            </Grid>

{/* The actual username should be changed to a parameter with state change. Just an ui sample here*/}

                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="h6">
                                    {sampleData.name}
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>

                <Grid container item xs={12} lg={7} justifyContent="flex-start">
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h5" color="text" fontWeight="bold" textTransform="uppercase">
                                    Email
                                </MKTypography>
                            </Grid>

{/* The actual email should be changed to a parameter with state change. Just an ui sample here*/}

                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="h6">
                                    company@sample.com
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>        
                <Grid container item xs={12} lg={7} justifyContent="flex-start">
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h5" color="text" fontWeight="bold" textTransform="uppercase">
                                    Description
                                </MKTypography>
                            </Grid>
                        </Grid>
{/* The actual description should be changed to a parameter with state change. Just an ui sample here*/}
                        <Grid item xs={12} sm={3}>
                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="body2" color="text">
                                    xxxxxxxxxxx sample here
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>
                <br />
                <br />
                <Grid container item xs={12} lg={7} justifyContent="flex-start">
                <MKTypography variant="h5" color="error" fontWeight="bold" textTransform="uppercase" mb={1}>
                    Project Requests
                </MKTypography>
                </Grid>
                <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                    <RequestCard userType={'student'} page={'Company Profile'} />
                    <RequestCard userType={'student'} page={'Company Profile'} />
                    <RequestCard userType={'student'} page={'Company Profile'} />
                    <RequestCard userType={'student'} page={'Company Profile'} />
                </Grid>
            </Container>
       
        </BasicPageLayout>
    );
}

export default CompanyInfoPage