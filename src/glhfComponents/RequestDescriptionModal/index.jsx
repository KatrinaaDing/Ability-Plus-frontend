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
import ShortInfo from './sections/ShortInfo';
import DetailSection from 'glhfComponents/ProposalDescriptionModal/sections/DetailSection';
import useAuth from 'auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { getCode } from 'utils/getStatus';
import { statusBank } from 'utils/getStatus';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

/**
value = {
    id,
    canEdit: undifined,
    title,
    status,
    category,
    propDdl,
    soluDdl,
    description,
    requirement,
    rewards,
    metaData: {
        lastModified,
        authorName,
        authorId
    }
}
 */
const RequestDescriptionModal = ({ open, setOpen, value, actionButton }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth='xl'
            onClose={() => setOpen(false)}

        >
            <MKBox display="flex" justifyContent="space-between" p={3}>
                <MKBox display='flex' justifyContent='flex-start'>
                    <MKTypography variant="h5">{value?.title}</MKTypography>
                    <StatusBadge statusLabel={value.status} type='request' />
                </MKBox>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox p={4}>
                <Grid container spacing={2} justify='flex-start'>
                    <Grid item xs={12} md={7} display='flex' flexDirection='column' justifyContent='space-between' order={{ xs: 2, md: 1 }}>
                        <ShortInfo title="Category" content={value.category} />
                        <ShortInfo title="Proposal Deadline" content={new Date(value.propDdl).toLocaleString()} />
                        <ShortInfo title="Solution Deadline" content={new Date(value.soluDdl).toLocaleString()} />
                    </Grid>
                    <Grid item xs={12} md={5} display='flex' flexDirection='column' order={{ xs: 1, md: 2 }}>
                        <MetaData metaData={value.metaData} />
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
                            onClick={() => navigate(`/edit-request/${value.id}`)}
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

export default RequestDescriptionModal;