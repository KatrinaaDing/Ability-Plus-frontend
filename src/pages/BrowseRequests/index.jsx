import React from 'react';
import { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import RequestCard from 'glhfComponents/RequestCard';
import useAuth from "auth/useAuth";

import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import { statusBank } from 'utils/getStatus';
import MKButton from 'components/MKButton';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

import MKBox from 'components/MKBox';
import StatusBadge from 'glhfComponents/StatusBadge';
import StatusDateDueSearchFilter from 'glhfComponents/StatusDateDueSearchFilter';
import EditIcon from '@mui/icons-material/Edit';
import AlertModal from 'glhfComponents/AlertModal';
import EndlessScroll from 'glhfComponents/EndlessScroll';
import CardCounters from 'glhfComponents/CardCounter';
import MKTypography from 'components/MKTypography';

const PAGE_SIZE = 18 

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
    const [status, setStatus] = useState('');
    const [searchKey, setSearchKey] = useState('');
    const [whatOrder, setWhatOrder] = useState('SolutionDue');
    const [numPage, setNumPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const [alertOpen, setAlertOpen] = React.useState(false);
    const location = useLocation();

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
    
    /**
     * Fetching a list of request card
     * @param {integer} pageNo page number to fetch
     * @param {boolean} newList determine if is to fetch a new card list (like changing status)
     */
    const fetchData = (pageNo, newList) => {
        const params = new URLSearchParams({
            status: status.toLowerCase(),
            isAscendingOrder: ascending,
            pageNo: pageNo,
            pageSize: PAGE_SIZE,
            whatOrder: whatOrder,
            searchKey: searchKey
        })
        axiosPrivate.get(`/project/list_all_project_requests`, {
            params: params,
        })
            .then(res => {
                if (!newList)
                    setCards(cards.concat(res.data.data.records))
                else
                    setCards(res.data.data.records)

                if (pageNo * PAGE_SIZE >= res.data.data.total)
                    setHasMore(false)
                else
                    setHasMore(true)
                setNumPage(pageNo)
                setTotal(res.data.data.total)
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        // if no login info, navigate to login
        if (!auth || Object.keys(auth).length === 0)
            setAlertOpen(true)
        else
            fetchData(1, true)
    }, [ascending, status, whatOrder, searchKey])

    const getReqDetail = async (reqId) =>
        await axiosPrivate.get(`/project/get_project_info?id=${reqId}`)
            .then((res) => {
                if (!auth.isCompany)
                    axiosPrivate.get(`/proposal/can_submit_proposal?projectId=${reqId}`)
                        .then(canProcess =>
                            setReqDetail({
                                ...res.data.data,
                                id: reqId,
                                mySubmittedProposal: canProcess.data.data
                            })
                        )
                        .then(res => setReqOpen(true))
                        .catch(e => console.error(e))
                else
                    setReqDetail({
                        ...res.data.data,
                        id: reqId,
                    })
                setReqOpen(true)

            })

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
        <BasicPageLayout title="Browse All Industry Challenges">
            <MKTypography variant='body'>You can find all released industry challenges on this page.</MKTypography>

            <AlertModal
                open={alertOpen}
                handleClose={() => setAlertOpen(false)}
                title="Looking for industry challenges?"
                content="Please login to browse challenges :)"
                disableClose={true}
                handleConfirm={() => navigate('/authentication/sign-in', { state: { from: location }, replace: true })}
            />
            <CardCounters status={status} total={total} type="request" />
            <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={handleWhatOrder} handleSearch={handleSearch} type='request' userType='public'></StatusDateDueSearchFilter>
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
                    actionButton={
                        // allow student submission when open for proposal
                        !auth.isCompany &&
                        reqDetail.status === statusBank.request.proposal.label &&
                        (
                            reqDetail.mySubmittedProposal <= 0
                                ? <MKButton
                                    variant="gradient"
                                    color='success'
                                    onClick={() => window.open(`/create-proposal/${reqDetail.name}/${reqDetail.id}`)}
                                >
                                    Create Proposal
                                </MKButton>
                                : <MKButton
                                    variant="gradient"
                                    color="info"
                                    startIcon={<EditIcon />}
                                    onClick={() => window.open(`/edit-proposal/${reqDetail.name}/${reqDetail.mySubmittedProposal}`)}
                                    sx={{ ml: 2 }}
                                >
                                    Edit My Proposal
                                </MKButton>

                        )
                    }
                />
            }
            <EndlessScroll
                dataLength={cards.length}
                next={() => fetchData(numPage + 1, false)}
                hasMore={hasMore}
            >
                <Grid container spacing={2} >
                    {renderRequestCards()}
                </Grid>
            </EndlessScroll>
        </BasicPageLayout>
    );
};

export default BrowseRequests;