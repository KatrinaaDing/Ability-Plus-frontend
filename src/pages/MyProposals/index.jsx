import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';


const MyProposals = () => {
    return (
        <BasicPageLayout title="My Proposals">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <RequestCard userType={'student'} page={'My Proposals'} />
                    <RequestCard userType={'student'} page={'My Proposals'} />
                    <RequestCard userType={'student'} page={'My Proposals'} />
                    <RequestCard userType={'student'} page={'My Proposals'} />
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default MyProposals;