import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import useAuth from 'auth/useAuth';
import AlertModal from 'glhfComponents/AlertModal';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import LikeButton from 'glhfComponents/LikeButton';
import ProposalCard from 'glhfComponents/ProposalCard';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LikeDateSearchFilter from 'glhfComponents/LikeDateSearchFilter';
import { useState, useEffect } from 'react';
import { statusBank } from 'utils/getStatus';
import { BASE_URL } from 'api/axios';
import useAxiosBasic from 'hooks/useAxiosBasic';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import MKButton from 'components/MKButton';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

const PopularProposals = () => {
    //hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosBasic = useAxiosBasic();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();

    // info display states
    const [reqOpen, setReqOpen] = React.useState(false);
    const [reqContent, setReqContent] = React.useState();
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
        await axiosBasic.get(`/proposal/pass/list_outstanding_proposal_request`, {
            params: new URLSearchParams(params),
        })
        .then(res => {
            setPopularProps(res.data.records)
        })
        .catch(e => console.error(e))
    
    }, [ascending, isAscendingOrderLike, searchKey])
    
    const handleOpenDetail = async (id, projectName) => {
        // if no login info, navigate to login
        if (!auth || Object.keys(auth).length === 0) {
            setAlertOpen(true)
        
        } else {
            await axiosPrivate.get(`/proposal/get_proposal_detail_info?proposalId=${id}`,)
                .then(res => {
                    axiosPrivate.get(`/user_proposal_like_record/already_like?proposalId=${id}`)
                        .then(liked => {
                            const prop = res.data.data
                            prop.extraData = JSON.parse(prop.extraData)
                            setDetailContent({
                                id: prop.id,
                                liked: liked.data.data,
                                title: prop.title,
                                status: prop.status,
                                desc: prop.oneSentenceDescription,
                                prob: prop.extraData.problemStatement,
                                vStat: prop.extraData.visionStatement,
                                goal: prop.extraData.goal,
                                detail: prop.extraData.detail,
                                likeNum: prop.likeNum,
                                metaData: {
                                    lastModified: prop.lastModifiedTime,
                                    authorName: prop.creatorName,
                                    authorId: prop.creatorId,
                                    project: projectName
                                }
                            })
                            setDetailOpen(true)
                        })
                        .catch(e => console.error(e))
                })
                .catch(e => console.error(e))
        }
    }

    return (
        <BasicPageLayout title='Popular Proposals'>
            {
                // render proposal detail when it's fetched
                detailContent &&
                    <ProposalDescriptionModal
                        open={detailOpen}
                        setOpen={setDetailOpen}
                        value={detailContent}
                        actionButton={
                            <LikeButton 
                                originLike={detailContent.liked}  // TODO need to fetch if the user has liked the proposal
                                originNumLike={detailContent.likeNum} 
                                propId={detailContent.id}
                            />
                        }
                    />

            }
            {   
                // TODO render request detail when it's fetched
                reqContent && 
                    <RequestDescriptionModal    
                        open={reqOpen}
                        setOpen={setReqOpen}
                        value={reqContent}
                        actionButton={
                            <MKButton>
                                View Proposal Ranks
                            </MKButton>
                        }
                    />

            }
            <AlertModal 
                open={alertOpen}
                handleClose={() => setAlertOpen(false)}
                title="Find an interesting proposal?"
                content="Please login to view proposal detail :)"
                handleConfirm={() => navigate('/authentication/sign-in', { state: { from: location }, replace: true})}
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
                                    id: p.proposalId,
                                    title: p.title,
                                    description: p.oneSentenceDescription,
                                    topic: p.area,
                                    projectName: p.projectName,
                                    authorId: p.authorId,
                                    authorName: p.authorName,
                   
                                    likes: p.likeNum
                                }}
                                openDetail={() => handleOpenDetail(p.proposalId, p.projectName)}
                            />
                        )
                    }
                    
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default PopularProposals;