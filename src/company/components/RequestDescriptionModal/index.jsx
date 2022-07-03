/**
 * Author: Ziqi Ding
 * Created At: 03 Jul 2022
 * Discription: A modal for displaying project request details
 */
import React from 'react';
import MKBox from 'components/MKBox';
import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";

import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import StatusBadge from '../StatusBadge';
import MetaData from './sections/MetaData';
import DetailSection from 'student/components/ProposalDescriptionModal/sections/DetailSection';
import ShortInfo from './sections/ShortInfo';


const RequestDescriptionModal = ({ preview, setPreview, value }) => {
    return (
        <Dialog
            open={preview}
            fullWidth={true}
            maxWidth='xl'
            onClose={() => setPreview(false)}
        >
            <MKBox display="flex" justifyContent="space-between" p={3}>
                <MKBox display='flex' justifyContent='flex-start'>
                    <MKTypography variant="h5">{value.title}</MKTypography>
                    <StatusBadge statusCode={0} />
                </MKBox>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={() => setPreview(false)} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={4}>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12} md={7} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <ShortInfo title="Category" content={value.category} />
                        <ShortInfo title="Proposal Deadline" content={value.propDdl} />
                        <ShortInfo title="Solution Deadline" content={value.soluDdl} />
                    </Grid>
                    <Grid item xs={12} md={5} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <MetaData />
                    </Grid>
                    <DetailSection
                        order={3}
                        title='Description'
                        content={value.description}
                    />
                    <DetailSection
                        order={4}
                        title='Requirements'
                        content={value.requirement}
                    />
                    <DetailSection
                        order={5}
                        title='Rewards'
                        content={(value.rewards === '' || value.rewards === '<p><br></p>') ? '<p>None</p>' : value.rewards}
                    />
                    
                    
                </Grid>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="dark" onClick={() => setPreview(false)}>
                    Close
                </MKButton>
                <MKButton variant="gradient" color="success">
                    Submit
                </MKButton>
            </MKBox>
        </Dialog>
    );
};

export default RequestDescriptionModal;