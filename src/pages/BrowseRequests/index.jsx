import React from 'react';
import { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Box from '@mui/material/Box';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';
import useAuth from "auth/useAuth";

import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import { statusBank } from 'utils/getStatus';
import MKButton from 'components/MKButton';
import ProposalCard from 'glhfComponents/ProposalCard';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import RequestFilter from "glhfComponents/RequestFilter";
import StatusProposalSolutionFilter from 'glhfComponents/StatusProposalSolutionFilter';

const BrowseRequests = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [cards, setCards] = useState([])
    const [proOpen, setProOpen] = useState(false);
    const [proDetail, setProDetail] = useState();
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState();
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState('');
    const [searchKey, setSearchKey] = useState('');

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    const handleProposalDeadline = (proposal) => {
        setIsAscendingProposalDeadline(proposal)
    }
    const handleSolutionDeadline = (solution) => {
        setIsAscendingProposalDeadline(solution)
    }

    useEffect(async () => {
        await axiosPrivate.get('/project/list_all_project_requests', {
            params: new URLSearchParams({
                isAscendingOrder: ascending,
                pageNo: 1,
                pageSize: 20,
                searchKey: searchKey,
                status: status,
                whatOrder: 'SolutionDue'
            })
        })
            .then(res => {
                console.log('get all request with status [', status, ']')
            })
            .catch(e => console.error(e))
    
    }, [status, searchKey, ascending])
    

    // const getProDetail = async (proId) => {
    //   await axiosPrivate.get('/proposal/get_proposal_detail_info',{
    //     params: new URLSearchParams({
    //         proposalId: proId
    //     })
    //   })
    //     .then(res => 
    //         setProDetail({
    //             "createTime": 0,
    //             "creatorId": 0,
    //             "description": "string",
    //             "id": proId,
    //             "lastModifiedTime": 0,
    //             "likeNum": 0,
    //             "oneSentenceDescription": "string",
    //             "status": "submitted",
    //             "title": "string"
    //         })
    //     )
    //     .then(res => setProOpen(true))
    //     .catch(e => console.error(e))
    // }

    const getReqDetail = async (reqId) =>
        await axiosPrivate.get('/project/get_project_info', {
            params: new URLSearchParams({
                id: reqId
            })
        })
            .then(res => 
                setReqDetail({
                    id: reqId,
                    "contactEmail": "string",
                    "createTime": 0,
                    "creatorId": 0,
                    "creatorName": "string",
                    "description": "string",
                    "extraData": "string",
                    'status': 'open_for_proposal',
                    "lastModifiedTime": 0,
                    "name": "health record",
                    "projectArea": "string",
                    "proposalDdl": 0,
                    "solutionDdl": 0
                })
            )
            .then(res => setReqOpen(true))
            .catch(e => console.error(e))

    const renderRequestCards = () => {
        return cards.map(content => 
            <RequestCard
                key={content.id}
                data={content}
                openDetail={() => getReqDetail(content.id)}
            />
        )
    }



    return (
        <BasicPageLayout title="Browse All Project Requests">
            {
                // auth.isCompany 
                // ? <RequestFilter handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></RequestFilter>
                // : <StatusProposalSolutionFilter handleStatus={handleStatus} handleProposalDeadline={handleProposalDeadline} handleSolutionDeadline={handleSolutionDeadline} />
                <RequestFilter handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></RequestFilter>
            }
            {
                // mount modal only when detail is loaded
                reqDetail &&
                <RequestDescriptionModal
                    open={reqOpen}
                    setOpen={setReqOpen}
                    value={{
                        id: reqDetail.id,
                        title: reqDetail.name,
                        status: reqDetail.status,
                        category: reqDetail.projectArea,
                        propDdl: reqDetail.proposalDdl,
                        soluDdl: reqDetail.solutionDdl,
                        description: reqDetail.description,
                        requirement: 'req',
                        rewards: 'rew',
                        metaData: {
                            lastModified: reqDetail.lastModifiedTime,
                            authorName: reqDetail.creatorName,
                            authorId: reqDetail.creatorId
                        }
                    }}
                    actionButton={
                        // allow student submission when open for proposal
                        !auth.isCompany && 
                        reqDetail.status === statusBank.request.proposal.label &&
                        <MKButton
                            variant="gradient"
                            color='success'
                            onClick={() => navigate(`/create-proposal/${reqDetail.name}/${reqDetail.id}`)}
                        >
                            Create Proposal
                        </MKButton>
                    }
                />
            }

            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderRequestCards()}
            </Grid>
        </BasicPageLayout>
    );
};

export default BrowseRequests;