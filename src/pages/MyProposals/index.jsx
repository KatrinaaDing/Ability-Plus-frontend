import { useEffect, useState } from "react";
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestFilter from "glhfComponents/RequestFilter";
const MyProposals = () => {
    const [status, setStatus] = useState('draft');
    const [searchKey, setSearchKey] = useState('');
    const [ascending, setAcending] = useState(true);
    const handleDate = (ascending) => {
        setAcending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    return (
        <BasicPageLayout title="My Proposals">
            <Box sx={{ flexGrow: 1 }}>
                <RequestFilter handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></RequestFilter>
                <br/>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* TODO proposal card */}
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default MyProposals;