import { useEffect, useState } from "react";
import React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import StatusDateDueSearchFilter from "glhfComponents/StatusDateDueSearchFilter";
import StatusBadge from "glhfComponents/StatusBadge";
import MKBox from "../../components/MKBox";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ProposalCard from "glhfComponents/ProposalCard";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";
import { getCode } from "utils/getStatus";
import { statusBank } from "utils/getStatus";
import MKButton from "components/MKButton";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import LikeButton from "glhfComponents/LikeButton";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";

const MyProposals = () => {
    // hooks
    const navigate = useNavigate();

    // filter states
    const [status, setStatus] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [ascending, setAcending] = useState(true);
    const [whatOrder, setWhatOrder] = useState('');

    // proposal states
    const [total, setTotal] = useState(0);
    const [props, setProps] = useState([]);
    const [propDetail, setPropDetail] = useState()
    const [propOpen, setPropOpen] = useState(false)

    // request states
    const [reqDetail, setReqDetail] = useState()
    const [reqOpen, setReqOpen] = useState(false)


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
    useEffect(()=> {
        const params = new URLSearchParams({
            status: status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
            searchKey: searchKey,
            whatOrder: whatOrder
        })
        
        const listMyProposals = async () =>
            await axiosPrivate.get('/proposal/list_my_proposal',{
                params: params
            })
                .then(res => {
                    const data = res.data.data
                    setProps(data.records)
                    setTotal(data.total)
                })
                .catch(e => {
                    console.log(e)
                })
        
        listMyProposals();
    }, [ascending, status, searchKey, whatOrder])

    const getPropDetail = async (propId, projectName) => {
        console.log(propId)
        await axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: propId
            })
        })
            .then(async res => {
                // TODO handle data
                res.data.data.extraData = JSON.parse(res.data.data.extraData)
                await axiosPrivate('/proposal/can_edit_proposal', {
                    params: new URLSearchParams({
                        proposalId: propId
                    })
                })
                    .then(canEdit => setPropDetail({
                        ...res.data.data, 
                        canEdit: canEdit.data.data, 
                        projectName,
                    }))
                    .catch(e => console.error(e))
            })
            .then(res => setPropOpen(true))
            .catch(e => console.error(e))
    }

    const deleteProposal = async(id) => {
        if (confirm("Do you really want to delete the proposal?")) {
            await axiosPrivate.post(`/proposal/delete_proposal?proposalId=${id}`)
                .then(res => {
                    alert(`The proposal has been deleted`);
                    setPropOpen(false)
                    location.reload(); 
                })
                .catch(e => console.error(e))
        }
    }

    const getReqDetail = async (projectId) => 
        await axiosPrivate.get(`/project/get_project_info?id=${projectId}`)
            .then(res => setReqDetail({ ...res.data.data, id: projectId }))
            .then(res => setReqOpen(true))
            .catch(e => console.error(e))
    

    return (
        <BasicPageLayout title="My Proposals">
            {
                propDetail &&
                <ProposalDescriptionModal
                    open={propOpen}
                    setOpen={setPropOpen}
                    value={{
                        id: propDetail.id,
                        title: propDetail.title,
                        status: propDetail.status,
                        desc: propDetail.oneSentenceDescription,
                        prob: propDetail.extraData.problemStatement,
                        vStat: propDetail.extraData.visionStatement,
                        goal: propDetail.extraData.goal,
                        detail: propDetail.extraData.detail,
                        likeNum: propDetail.likeNum,
                        canEdit: propDetail.canEdit,
                        metaData: {
                            lastModified: propDetail.lastModifiedTime,
                            authorName: propDetail.creatorName ?? "No Name",
                            authorId: propDetail.creatorId,
                            project: propDetail.projectName,
                            projectId: propDetail.projectId,
                            openProject: () => getReqDetail(propDetail.projectId)
                        }
                    }}
                    actionButton={
                        <>
                        {
                            // if it's approved, allow like
                            propDetail.status === statusBank.proposal.approved.label &&
                            <LikeButton
                                originLike={false} // TODO need to fetch if the user liked the proposal
                                originNumLike={propDetail.likeNum}
                            />
                        }
                        {
                            // if is draft, allow deletion
                            propDetail.status === statusBank.proposal.draft.label &&
                                <MKButton
                                    variant="gradient"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => deleteProposal(propDetail.id)}
                                    sx={{ ml: 2 }}
                                >
                                    Delete
                                </MKButton>
                        }
                        </>
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
            <MKBox display='flex'>
                <MKBox display='flex'>
                    <p>There {total <= 1 ? 'is' : 'are'} {total} proposal{total > 1 ? 's' : ''} with&nbsp;</p>
                    {
                        status === ''
                            ? <p>all status</p>
                            : (
                                <>
                                    status
                                    <StatusBadge statusLabel={status} type='request' size='sm' position='normal'/>
                                </>
                            )
                    }
                </MKBox>
       
            </MKBox>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={ handleWhatOrder} handleSearch={handleSearch} type='proposal'></StatusDateDueSearchFilter>
                <br/>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        props.map(p => 
                                <ProposalCard
                                    key={p.proposalId}
                                    data={{
                                        title: p.title,
                                        status: p.status,
                                        description: p.oneSentenceDescription,
                                        topic: p.area,
                                        authorId: p.authorId,
                                        authorName: p.authorName,
                                        lastModified: p.lastModifiedTime,
                                        likes: p.likeNum,
                                        id: p.proposalId,
                                        projectName: p.projectName,
                                    }}
                                    openDetail={() => getPropDetail(p.proposalId, p.projectName)}
                                />
                        )
                    }
                </Grid>
            </Box>
        </BasicPageLayout>
    );
};

export default MyProposals;