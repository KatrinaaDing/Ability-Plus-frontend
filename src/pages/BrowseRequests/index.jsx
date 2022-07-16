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
<<<<<<< HEAD

import { BASE_URL } from 'api/axios';
import axios from 'axios';
import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';

const BrowseRequests = () => {
    // hooks
=======
import axios from 'axios';
import StatusDateDueSearchFilter from 'glhfComponents/StatusDateDueSearchFilter';

const BrowseRequests = () => {
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

<<<<<<< HEAD
    // request states
    const [total, setTotal] = useState(0);
    const [cards, setCards] = useState([])
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState({});

    // filter states
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState('');
    const [searchKey, setSearchKey] = useState('');
=======
    const [cards, setCards] = useState([])
    const [proOpen, setProOpen] = useState(false);
    const [proDetail, setProDetail] = useState();
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState([]);
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState('open_for_proposal');
    const [searchKey, setSearchKey] = useState('');
    const [whatOrder, setWhatOrder] = useState('ProposalDue');
    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);
    const type = 'request';
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
<<<<<<< HEAD
=======
        console.log(status)
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
<<<<<<< HEAD
    const handleProposalDeadline = (proposal) => {
        setIsAscendingProposalDeadline(proposal)
    }
    const handleSolutionDeadline = (solution) => {
        setIsAscendingProposalDeadline(solution)
    }

    useEffect(async () => {
        await axios.get(`${BASE_URL}/project/list_all_project_requests`, {
            params: new URLSearchParams({
                isAscendingOrder: ascending,
                pageNo: 1,
                pageSize: 20,
                searchKey: searchKey,
                status: status,
                whatOrder: 'SolutionDue'
            }),
            headers: {
                token: auth.accessToken
            }
        })
            .then(res => {
                setCards(res.data.data.records)
                setTotal(res.data.data.total)
                console.log('get all request with status [', status, ']')
            })
            .catch(e => console.error(e))
    
    }, [status, searchKey, ascending])
    

    const getReqDetail = async (reqId) =>
        await axios.get(`${BASE_URL}/project/get_project_info?id=${reqId}`, {
            headers: {
                token: auth.accessToken
            }
        })
            .then(res => {
                if (res.data.status >= 400)
                    return Promise.reject(res.data.message)
                setReqDetail({ ...res.data.data, id: reqId })
            })
=======
    const handleWhatOrder = (order) => {
        setWhatOrder(order);
    }
    useEffect(async () => {
        let params;
        console.log(status)
        if (searchKey == '') {
            params = new URLSearchParams({
                status: status,
                isAscendingOrder: ascending,
                pageNo: 1,
                pageSize: 10,
                whatOrder: whatOrder
            })
        } else {
            params = new URLSearchParams({
                status: status,
                isAscendingOrder: ascending,
                pageNo: 1,
                pageSize: 10,
                whatOrder: whatOrder,
                searchKey: searchKey
            })
        }
        console.log(params)
        await axiosPrivate.get('/project/list_all_project_requests/', {
            params: params
        })
            .then(res => {
                console.log(res)
                setReqs(res.data.records)
                setTotal(res.data.total)
            })
            .catch(e => {
                console.error(e)
            })
    }, [ascending, status, whatOrder, searchKey])

  // what button to put in the proposal detail modal
    // const getProposalModalActionButton = (statusStr) => {
    //     // if the status is waiting approval
    //     if (statusStr === statusBank.proposal.approving.label) {
    //         return (
    //             <>
    //                 <MKButton variant="gradient" color="error" onClick={() => alert('reject')} sx={{ mx: 1 }}>
    //                     Reject
    //                 </MKButton>
    //                 <MKButton variant="gradient" color="success" onClick={() => alert('approved')}>
    //                     Approve
    //                 </MKButton>
    //             </>
    //         )
    //     }
    //     return <></>
    // }

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
                    "status": "open_for_solution",
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
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
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

<<<<<<< HEAD

    return (
        <BasicPageLayout title="Browse All Project Requests">
            <MKBox display='flex'>
                <p>There {total <= 1 ? 'is' : 'are'} {total} request{total > 1 ? 's' : ''} with&nbsp;</p>
                {
                    status === ''
                        ? <p>all status</p>
                        : (
                            <>
                                status
                                <StatusBadge statusLabel={status} type='request' size='sm' />
                            </>
                        )
                }
            </MKBox>
            {
                // auth.isCompany 
                // ? <RequestFilter handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></RequestFilter>
                // : <StatusProposalSolutionFilter handleStatus={handleStatus} handleProposalDeadline={handleProposalDeadline} handleSolutionDeadline={handleSolutionDeadline} />
                <RequestFilter handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></RequestFilter>
            }
            {
=======
    // const renderProposalCards = () => {
    //     return cards.map(content => 
    //         <ProposalCard
    //             key={content.id}
    //             data={content}
    //             openDetail={() => getProDetail(content.id)}
    //         />
    //     )

    // }

    return (
        <BasicPageLayout title={"Browse Company Requests" }>
            <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={handleWhatOrder} handleSearch={handleSearch} type={ type }></StatusDateDueSearchFilter>
            <br />
            {
                // student view
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
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
<<<<<<< HEAD
                        propDdl: new Date(reqDetail.proposalDdl*1000),
                        soluDdl: new Date(reqDetail.solutionDdl*1000),
=======
                        propDdl: reqDetail.proposalDdl,
                        soluDdl: reqDetail.solutionDdl,
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
                        description: reqDetail.description,
                        requirement: 'req',
                        rewards: 'rew',
                        metaData: {
<<<<<<< HEAD
                            lastModified: new Date(reqDetail.lastModifiedTime*1000),
=======
                            lastModified: reqDetail.lastModifiedTime,
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
                            authorName: reqDetail.creatorName,
                            authorId: reqDetail.creatorId
                        }
                    }}
                    actionButton={
<<<<<<< HEAD
                        // allow student submission when open for proposal
                        !auth.isCompany && 
=======
                        // allow submission when open for proposal
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
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
<<<<<<< HEAD

            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderRequestCards()}
=======
            {
                // company view
                proDetail &&
                <ProposalDescriptionModal
                    open={proOpen}
                    setOpen={setProOpen}
                    value={{
                        id: proDetail.id,
                        title: proDetail.title,
                        status: proDetail.status,
                        desc: proDetail.description,
                        prob: 'problem statement',
                        vStat: 'vision statement',
                        goal: 'general goals',
                        detail: 'detail',
                        metaData: {
                            lastModified: proDetail.lastModifiedTime,
                            authorName: 'fds',
                            authorId: proDetail.creatorId,
                            topic: 'proposal management'
                        }
                    }}
                    actionButton={getProposalModalActionButton(proDetail.status)}
                />

            }

            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {auth.isCompany && renderProposalCards()}
                {!auth.isCompany && renderRequestCards()}
>>>>>>> 369d636 (remove view all proposal page, add view requests to company)
            </Grid>
        </BasicPageLayout>
    );
};

export default BrowseRequests;