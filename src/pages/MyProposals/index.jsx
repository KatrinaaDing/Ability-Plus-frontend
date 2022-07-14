import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';


const MyProposals = () => {
    return (
        <BasicPageLayout title="My Proposals">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* TODO proposal card */}
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default MyProposals;