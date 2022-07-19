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
import LikeDateSearchFilter from 'glhfComponents/LikeDateSearchFilter';
import { useState, useEffect } from 'react';
import { statusBank } from 'utils/getStatus';
import axios from 'axios';
import { BASE_URL } from 'api/axios';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const PopularProposals = () => {
    //hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    // info display states
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [detailContent, setDetailContent] = React.useState()
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [popularProps, setPopularProps] = React.useState([]);

    // search bar states
    const [searchKey, setSearchKey] = useState('');
    const [ascending, setAscending] = useState(true);
    const [isAscendingOrderLike, setIsAcendingOrderLike] = useState(true);

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    const handleLike = (like) => {
        setIsAcendingOrderLike(like)
    }

    useEffect(async () => {
        let params = {
            isAscendingOrderLike: isAscendingOrderLike,
            isAscendingOrderTime: ascending,
            pageNo: 1,
            pageSize: 20,
            searchKey: searchKey,
        }
        
        await axiosPrivate.get(`/proposal/list_outstanding_proposal_request`, {
            params: new URLSearchParams(params)
        })
        .then(res => {
            setPopularProps(res.data.data.records)
        })
        .catch(e => console.error(e))
    
    }, [ascending, isAscendingOrderLike, searchKey])
    
    console.log(popularProps)

    const handleOpenDetail = () => {
        // if no login info, navigate to login
        if (!auth || Object.keys(auth).length === 0) {
            setAlertOpen(true)
            // alert('please log in')
        

        // if user logged in, open detail
        } else {
            setDetailContent({
                id: 5,
                title: 'title 1',
                status: statusBank.proposal.approved.label,
                desc: "sample description",
                prob: 'problem',
                vStat: 'state',
                goal: '1., 2.,..',
                detail: 'detail haha',
                metaData: {
                    lastModified: new Date().getTime()/1000,
                    authorName: 'Student M',
                    authorId: 9,
                    topic: 'project topic'
                }
            })
            setDetailOpen(true)
        }
    }

    return (
        <BasicPageLayout title='Popular Proposals'>
            {
                detailContent &&
                    <ProposalDescriptionModal
                        open={detailOpen}
                        setOpen={setDetailOpen}
                        value={detailContent}
                        actionButton={<LikeButton originLike={false} originNumLike={23} />}
                    />

            }
            <AlertModal 
                open={alertOpen}
                handleClose={() => setAlertOpen(false)}
                title="Find an interesting proposal?"
                content="Please login to view proposal detail :)"
                handleConfirm={() => navigate('/authentication/sign-in')}
            />
            <Box sx={{ flexGrow: 1 }}>
                <LikeDateSearchFilter handleLike={handleLike} handleDate={ handleDate} handleSearch={ handleSearch}></LikeDateSearchFilter>
                <br/>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        popularProps.map(p =>
                            <ProposalCard
                                key={p.title}       // FIXME 没给id，没法get details
                                data={{
                                    title: p.title,
                                    description: p.oneSentenceDescription,
                                    topic: p.area,
                                    projectName: p.projectName,
                                    authorId: p.authorId,
                                    authorName: p.authorName,
                                    lastModified: p.lastModifiedTime,
                                    likes: p.likeNum
                                }}
                                openDetail={() => handleOpenDetail()}
                            />
                        )
                    }
                    
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default PopularProposals;