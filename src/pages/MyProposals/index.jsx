import { useEffect, useState } from "react";
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import StatusDateDueSearchFilter from "glhfComponents/StatusDateDueSearchFilter";
import StatusBadge from "glhfComponents/StatusBadge";
import MKBox from "../../components/MKBox";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const MyProposals = () => {
    const [status, setStatus] = useState('draft');
    const [searchKey, setSearchKey] = useState('');
    const [ascending, setAcending] = useState(true);
    const [whatOrder, setWhatOrder] = useState('');
    const [total, setTotal] = useState(0);
     const [reqs, setReqs] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const handleDate = (ascending) => {
        setAcending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    const handleWhatOrder = (whatOrder) => {
        setWhatOrder(whatOrder)
    }
    useEffect(async ()=> {
        const params = new URLSearchParams({
            status: status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
            searchKey: searchKey === '' ? undefined: searchKey,
            whatOrder: whatOrder === '' ? undefined: whatOrder
    })
    await axiosPrivate.get('/proposal/list_my_proposal/',{
        params: params
    })
        .then(res => {
            setReqs(res.data.records)
            setTotal(res.data.total)
        })
        .catch(e => {
            console.log(e)
        })
    }, [ascending, status, searchKey, whatOrder])

    return (
        <BasicPageLayout title="My Proposals">
            <MKBox display='flex'>
                <p>There are {total} proposals with status </p>
                <StatusBadge statusLabel={status} type='request' size='sm' />
            </MKBox>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={ handleWhatOrder} handleSearch={handleSearch}></StatusDateDueSearchFilter>
                <br/>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* TODO proposal card */}
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default MyProposals;