/**
 * Author: Ziqi Ding
 * Created At: 02 Jul 2022
 * Discription: A modal for displaying proposal details
 */
import React from 'react';
import MKBox from 'components/MKBox';
import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";

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

/*
value = {
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
        authorId,
        topic
    }
}

*/
const ProposalDescriptionModal = ({ open, setOpen, value, actionButton }) => {
    const { auth } = useAuth();

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
                    <StatusBadge statusLabel={value.status} type='proposal' />
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
                        auth.isCompany
                            ? <>
                                <DetailSection
                                    order={7}
                                    title='Rate'
                                    content={<CompanyRating />}
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
                </MKBox>
            </MKBox>
        </Dialog>
    );
};

export default ProposalDescriptionModal;