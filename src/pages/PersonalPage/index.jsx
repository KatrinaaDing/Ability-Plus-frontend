import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Box from '@mui/material/Box';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';

const PersonalPage = () => {
    return (
        <BasicPageLayout title="Personal Page">
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <RequestCard userType={'student'} page={'Personal Page'} />
                <RequestCard userType={'student'} page={'Personal Page'} />
                <RequestCard userType={'student'} page={'Personal Page'} />
                <RequestCard userType={'student'} page={'Personal Page'} />
            </Grid>
        </BasicPageLayout>
    );
};

export default PersonalPage;