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
import StatusProposalSolutionFilter from 'glhfComponents/StatusProposalSolutionFilter';

import { BASE_URL } from 'api/axios';
import axios from 'axios';
import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';
import StatusDateDueSearchFilter from 'glhfComponents/StatusDateDueSearchFilter';
const BrowseRequests = () => {
    // hooks
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    // request states
    const [total, setTotal] = useState(0);
    const [cards, setCards] = useState([])
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState();

    // filter states
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState('open_for_proposal');
    const [searchKey, setSearchKey] = useState('');
    const [whatOrder, setWhatOrder] = useState('ProposalDue');
    const type = 'request';

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleStatus = (status) => {
        console.log(status)
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }

    const handleWhatOrder = (order) => {
        setWhatOrder(order);
    }
    useEffect(async () => {
        const params = new URLSearchParams({
            status: status.toLowerCase(),
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
            whatOrder: whatOrder,
            searchKey: searchKey
        })
        await axiosPrivate.get(`/project/list_all_project_requests`, {
            params: params,
        })
            .then(res => {
                setCards(res.data.data.records)
                setTotal(res.data.data.total)
            })
            .catch(e => console.error(e))
    }, [ascending, status, whatOrder, searchKey])
        
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
                    status === 'All'
                        ? <p>all status</p>
                        : (
                            <>
                                status
                                <StatusBadge statusLabel={status} type='request' size='sm' />
                            </>
                        )
                }
            </MKBox>
            <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={handleWhatOrder} handleSearch={handleSearch} type='request' userType='public'></StatusDateDueSearchFilter>
            <br />
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
                        requirement: JSON.parse(reqDetail.extraData).requirement,
                        rewards: JSON.parse(reqDetail.extraData).rewards,
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