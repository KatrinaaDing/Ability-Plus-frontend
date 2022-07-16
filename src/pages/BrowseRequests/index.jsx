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

import { BASE_URL } from 'api/axios';
import axios from 'axios';
import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';

const BrowseRequests = () => {
    // hooks
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // request states
    const [total, setTotal] = useState(0);
    const [cards, setCards] = useState([])
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState({});

    // filter states
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
                        propDdl: new Date(reqDetail.proposalDdl*1000),
                        soluDdl: new Date(reqDetail.solutionDdl*1000),
                        description: reqDetail.description,
                        requirement: 'req',
                        rewards: 'rew',
                        metaData: {
                            lastModified: new Date(reqDetail.lastModifiedTime*1000),
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