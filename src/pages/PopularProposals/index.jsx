import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';
import React from 'react';

const PopularProposals = () => {
    return (
        <BasicPageLayout title='Popular Proposals'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <RequestCard userType={'all'} page={'Popular Proposals'} />
                    <RequestCard userType={'all'} page={'Popular Proposals'} />
                    <RequestCard userType={'all'} page={'Popular Proposals'} />
                    <RequestCard userType={'all'} page={'Popular Proposals'} />
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default PopularProposals;