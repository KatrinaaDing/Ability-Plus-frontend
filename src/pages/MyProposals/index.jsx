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

const MyProposals = () => {
    // hooks
    const navigate = useNavigate();

    // filter states
    const [status, setStatus] = useState('draft');
    const [searchKey, setSearchKey] = useState('');
    const [ascending, setAcending] = useState(true);
    const [whatOrder, setWhatOrder] = useState('');

    // proposal states
    const [total, setTotal] = useState(0);
    const [props, setProps] = useState([]);
    const [propDetail, setPropDetail] = useState('')
    const [propOpen, setPropOpen] = useState(false)

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
    useEffect(async ()=> {
        const params = new URLSearchParams({
            status: status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
            searchKey: searchKey === '' ? undefined: searchKey,
            whatOrder: whatOrder === '' ? undefined: whatOrder
        })
        
        await axiosPrivate.get('/proposal/list_my_proposal',{
            params: params
        })
            .then(res => {
                setProps(res.data.records)
                setTotal(res.data.total)
            })
            .catch(e => {
                console.log(e)
            })
    }, [ascending, status, searchKey, whatOrder])

    const getPropDetail = async (propId, projectName) => {
        await axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: propId
            })
        })
            .then(async res => {
                // TODO handle data
                res.data.extraData = JSON.parse(res.data.extraData)
                await axiosPrivate('/proposal/can_edit_proposal', {
                    params: new URLSearchParams({
                        proposalId: propId
                    })
                })
                    .then(canEdit => setPropDetail({...res.data, canEdit, projectName}))
                    .catch(e => console.error(e))
            })
            .then(res => setPropOpen(true))
            .catch(e => console.error(e))
    }
/*
"data": {
   "area": "string",
    "authorId": 0,
    "authorName": "string",
    "lastModifiedTime": 0,
    "likeNum": 0,
    "oneSentenceDescription": "string",
    "projectName": "string",
    "proposalId": 0,
    "status": "string",
    "title": "string"
  },

*/
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
                        metaData: {
                            lastModified: propDetail.lastModifiedTime,
                            authorName: propDetail.creatorName ?? "No Name",
                            authorId: propDetail.creatorId,
                            topic: propDetail.projectName
                        }
                    }}
                    actionButton={
                        // can edit before proposal ddl
                       propDetail.canEdit &&
                        <MKButton
                            variant="gradient"
                            color="info"
                            onClick={() => navigate(`/edit-proposal/${propDetail.projectName}/${propDetail.id}`)}
                            sx={{ ml: 2 }}
                        >
                            Edit
                        </MKButton>
                    }
                />
            }
            <MKBox display='flex'>
                <p>There are {total} proposals with status </p>
                <StatusBadge statusLabel={status} type='request' size='sm' />
            </MKBox>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={ handleWhatOrder} handleSearch={handleSearch}></StatusDateDueSearchFilter>
                <br/>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        props.map(p => 
                            <ProposalCard
                                key={p.title}
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