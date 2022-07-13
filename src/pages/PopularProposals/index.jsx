import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import useAuth from 'auth/useAuth';
import AlertModal from 'glhfComponents/AlertModal';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import LikeButton from 'glhfComponents/LikeButton';
import ProposalCard from 'glhfComponents/ProposalCard';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopularProposals = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [detailOpen, setDetailOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);


    const handleOpenDetail = () => {
        // if no login info, navigate to login
        if (Object.keys(auth) === 0) {
            setAlertOpen(true)
        }

    }
    return (
        <BasicPageLayout title='Popular Proposals'>
            <ProposalDescriptionModal
                open={detailOpen}
                setOpen={setDetailOpen}
                value={{

                }}
                actionButton={<LikeButton originLike={false} originNumLike={23} />}
            />
            <AlertModal 
                open={alertOpen}
                handleClose={setAlertOpen(false)}
                title="Find an interesting proposal?"
                content="Please login to view proposal detail :)"
                handleConfirm={() => navigate('/authentication/login')}
            />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <ProposalCard
                        data={{
                            title: "Sample Title",
                            status: null,
                            topic: "Proposal Management",
                            authorId: 8,
                            authorName: 'Student 1',
                            lastModified: new Date().toLocaleString(),
                            likes: 5
                        }}
                        openDetail={() => setDetailOpen(true)}
                    />

                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default PopularProposals;