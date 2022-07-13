import React from 'react';
import { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Box from '@mui/material/Box';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';
import useAuth from "auth/useAuth";
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';

const PersonalPage = () => {
    const { auth, setAuth } = useAuth();
    const [userType, setUserType] = useState('student');
    const [page, setPage] = useState('Personal Page');

    const [proOpen, setProOpen] = useState(false);
    const [proDetail, setProDetail] = useState('');
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState('')

    useEffect(() => {
        if (auth.isCompany) {  
            setUserType('company');
            setPage('All Proposals');
        }
    }, [])
    const data = [
        {
            "authorId": 0,
            "authorName": "student1",
            "oneSentenceDescription": "description",
            "title": "title",
            "lastModificationDate": "2022/10/02"
        },
        {
            "authorId": 1,
            "authorName": "student2",
            "oneSentenceDescription": "description",
            "title": "title",
            "lastModificationDate": "2022/10/02"
        },
    ]
    
    return (
        <BasicPageLayout title="Personal Page">
            <RequestDescriptionModal 
                open={reqOpen}
                setOpen={setReqOpen}
                value={reqDetail}
                handleSubmit={null}
            />
            <ProposalDescriptionModal />
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* {data.map((d, key) => <RequestCard key={key} userType={userType} page={page} data={ d } />)}  */}
            </Grid>
        </BasicPageLayout>
    );
};

export default PersonalPage;