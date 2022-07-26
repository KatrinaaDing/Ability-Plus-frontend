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
import DefaultReviewCard from 'examples/Cards/ReviewCards/DefaultReviewCard';

const PopularProposals = () => {
    //hooks
    const { auth } = useAuth();
    const navigate = useNavigate();
    const axiosBasic = useAxiosBasic();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();

    // info display states
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [detailContent, setDetailContent] = React.useState()
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [popularProps, setPopularProps] = React.useState([]);
    // request states
    const [reqDetail, setReqDetail] = useState()
    const [reqOpen, setReqOpen] = useState(false)

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

    useEffect(() => {
        let params = {
            isAscendingOrderLike: isAscendingOrderLike,
            isAscendingOrderTime: ascending,
            pageNo: 1,
            pageSize: 20,
            searchKey: searchKey,
        }

        const listOutstandingProposal = async () =>
            await axiosBasic.get(`/proposal/pass/list_outstanding_proposal_request`, {
                params: new URLSearchParams(params),
            })
            .then(res => {
                setPopularProps(res.data.records)
            })
            .catch(e => console.error(e))
        
        listOutstandingProposal();
    
    }, [ascending, isAscendingOrderLike, searchKey])

    
    // handle open proposal detail
    const handleOpenDetail =  (id, projectName) => {
        // if no login info, navigate to login
        if (!auth || Object.keys(auth).length === 0) {
            setAlertOpen(true)
        
        } else {
            axiosPrivate.get(`/proposal/get_proposal_detail_info?proposalId=${id}`)
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
                                    project: projectName,
                                    openProject: () => getReqDetail(prop.projectId)
                                }
                            })
                            
                        })
                        .then(res => setDetailOpen(true))
                        .catch(e => console.error(e))
                })
                .catch(e => console.error(e))
        }
    }

    const getReqDetail = (projectId) =>
        axiosPrivate.get(`/project/get_project_info?id=${projectId}`)
            .then(res => setReqDetail({ ...res.data.data, id: projectId }))
            .then(res => setReqOpen(true))
            .catch(e => console.error(e))


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
                                originLike={detailContent.liked} 
                                originNumLike={detailContent.likeNum} 
                                propId={detailContent.id}
                            />
                        }
                    />
            }
            {
                reqDetail &&
                <RequestDescriptionModal
                    open={reqOpen}
                    setOpen={setReqOpen}
                    value={{
                        id: reqDetail.id,
                        title: reqDetail.name,
                        status: reqDetail.status,
                        category: reqDetail.projectArea,
                        propDdl: new Date(reqDetail.proposalDdl * 1000),
                        soluDdl: new Date(reqDetail.solutionDdl * 1000),
                        description: reqDetail.description,
                        requirement: JSON.parse(reqDetail.extraData).requirement,
                        rewards: JSON.parse(reqDetail.extraData).rewards,
                        metaData: {
                            lastModified: new Date(reqDetail.lastModifiedTime * 1000),
                            authorName: reqDetail.creatorName,
                            authorId: reqDetail.creatorId
                        }
                    }}
                    actionButton={<></>}
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
                                    key={p.proposalId}
                                    data={{
                                        id: p.proposalId,
                                        title: p.title,
                                        description: p.oneSentenceDescription,
                                        topic: p.area,
                                        projectName: p.projectName,
                                        authorId: p.authorId,
                                        authorName: p.authorName,
                                        lastModified: p.lastModifiedTime,
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