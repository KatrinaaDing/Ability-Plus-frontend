/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: A modal for displaying proposal details
 */
import React from 'react';
import MKBox from 'components/MKBox';
import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';

import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import MetaData from './sections/MetaData';
import DetailSection from './sections/DetailSection';
import CompanyRating from './sections/CompanyRating';
import CompanyNote from './sections/CompanyNote';
import StatusBadge from 'glhfComponents/StatusBadge';
import useAuth from 'auth/useAuth';
import { getCode } from 'utils/getStatus';
import { statusBank } from 'utils/getStatus';
import { useNavigate } from 'react-router-dom';
import ProcessStatusBadge from 'glhfComponents/ProcessStatusBadge';

/*
value = {
    id,
    title,
    status,
    desc,
    prob,
    vStat,
    goal,
    detail,
    metaData: {
        lastModified,
        authorName,
        authorId: undefined,
        topic
    }
}

*/
const ProposalDescriptionModal = ({ open, setOpen, value, actionButton }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const page = window.location.pathname.slice(1)

    // is student &&  is author && status < approving
    // const canEdit =
    //     !auth.isCompany &&
    //     auth.id == value.metaData.authorId &&
    //     getCode('proposal', value.status) < statusBank.proposal.approving

    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth='xl'
            onClose={() => setOpen(false)}
        >
            <MKBox display="flex" justifyContent="space-between" p={3}>
                <MKBox display='flex' justifyContent='flex-start'>
                    <MKTypography variant="h5">{value.title}</MKTypography>
                    {
                        page.startsWith('view-proposals') 
                            ? <ProcessStatusBadge
                                status={value.status}  //FIXME 要根据有没有notes和rating判断
                            />
                            : <StatusBadge statusLabel={value.status} type='proposal' />
                        
                    }
                    
                </MKBox>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={4}>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12} md={7} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <div>
                            <MKTypography variant='h5' sx={{ mb: 1, mt: 2 }}>
                                One-line Description
                            </MKTypography>
                            <MKTypography variant='body2'>
                                {value.desc}
                            </MKTypography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={5} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <MetaData data={value.metaData} />
                    </Grid>
                    <DetailSection
                        order={3}
                        title='Problems to Solve'
                        content={value.prob}
                    />
                    <DetailSection
                        order={4}
                        title='Vision Statment'
                        content={value.vStat}
                    />
                    <DetailSection
                        order={5}
                        title='General Goals'
                        content={value.goal}
                    />
                    <DetailSection
                        order={6}
                        title='Details'
                        content={value.detail}
                    />
                    {
                        auth.isCompany && 
                        getCode('proposal', value.status) <= statusBank.proposal.approving.code &&
                        page.startsWith('view-proposals')
                            ? <>
                                <DetailSection
                                    order={7}
                                    title='Rate'
                                    content={<CompanyRating rating={value.rating}/>}
                                />
                                <DetailSection
                                    order={8}
                                    title='Note'
                                    content={<CompanyNote />}
                                />
                            </>
                            : <></>

                    }
                </Grid>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={() => setOpen(false)}>
                    Close
                </MKButton>
                <MKBox>
                    {actionButton}
                    {
                        value.canEdit &&
                        <MKButton
                            variant="gradient"
                            color="info"
                            startIcon={<EditIcon />}
                            onClick={() => window.open(`/edit-proposal/${value.metaData.topic}/${value.id}`)}
                            sx={{ ml: 2 }}
                        >
                            Edit
                        </MKButton>
                    }
                </MKBox>
            </MKBox>
        </Dialog>
    );
};

export default ProposalDescriptionModal;