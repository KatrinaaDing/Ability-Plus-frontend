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


import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";


import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const sampleData = {
    name: 'Jane Wong'
}

const StudentInfoPage = () => {

    return (
        <BasicPageLayout title={sampleData.name}>
                <Grid container item xs={12} lg={7}>
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignText="center" py={2}>
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
                                    JaneWong@sample.com
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
                        Past Proposals
                    </MKTypography>
                </Grid>
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                    <RequestCard userType={'company'} page={'Student Profile'} />
                    <RequestCard userType={'company'} page={'Student Profile'} />
                    <RequestCard userType={'company'} page={'Student Profile'} />
                    <RequestCard userType={'company'} page={'Student Profile'} />
                </Grid>
            </Box>  
        </BasicPageLayout>
    );
}

export default StudentInfoPage