import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import FilterBar from "glhfComponents/RequestFilter"
import DeleteIcon from '@mui/icons-material/Delete';
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import ViewProposalsBtn from "./components/ViewProposalsBtn";
import CreateProjectBtn from "./components/CreateProjectBtn";

import CardCounters from "glhfComponents/CardCounter";
import EndlessScroll from "glhfComponents/EndlessScroll";

const PAGE_SIZE = 18

const MyProjectRequests = () => {
    const axiosPrivate = useAxiosPrivate();
    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);

    // request detail state
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState({})

    // searching state
    const [ascending, setAscending] = useState(false);
    const [status, setStatus] = useState('all');
    const [searchKey, setSearchKey] = useState('');

    // pagination state
    const [numPage, setNumPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    /**
     * Fetching a list of request card
     * @param {integer} pageNo page number to fetch
     * @param {boolean} newList determine if is to fetch a new card list (like changing status)
     */
    const fetchData = (pageNo, newList) => {
        let params = {
            status: status === 'all' ? '' : status,
            isAscendingOrder: ascending,
            pageNo: pageNo,
            pageSize: PAGE_SIZE,
            searchKey: searchKey,
        }
        axiosPrivate.get(`/project/list_my_project_request`, {
            params: new URLSearchParams(params)
        })
            .then(res => {
                if (newList)
                    setReqs(res.data.data.records)
                else
                    setReqs([...reqs].concat(res.data.data.records))

                if (pageNo * PAGE_SIZE >= res.data.data.total)
                    setHasMore(false)
                else
                    setHasMore(true)
                setNumPage(pageNo)
                setTotal(res.data.data.total)

            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(() => {
        fetchData(1, true)
    }, [ascending, status, searchKey])

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }


    const getProjectDetail = async (id) => {
        await axiosPrivate.get('/project/get_project_info', {
            params: new URLSearchParams({
                id: id
            })
        })
            .then(async res => {
                const data = res.data.data
                await axiosPrivate.get('/project/can_edit_project', {
                    params: new URLSearchParams({
                        projectId: id
                    })
                })
                    .then(canEdit =>
                        setReqDetail({
                            ...data,
                            id: id,
                            canEdit: canEdit.data.data,
                        })
                    )
                    .then(res => setReqOpen(true))
                    .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
    }

    const deleteProject = async (id) => {
        if (confirm("Do you really want to delete the project request?")) {
            await axiosPrivate.post(`/project/delete_project?projectId=${id}`)
                .then(res => {
                    alert(`Project has been deleted`);
                    setReqOpen(false)
                    location.reload();
                })
                .catch(e => console.error(e))
        }
    }

    return (
        <BasicPageLayout title="My Project Requests" secondaryContent={<CreateProjectBtn />}>
            {
                reqOpen &&
                <RequestDescriptionModal
                    open={reqOpen}
                    setOpen={setReqOpen}
                    value={{
                        id: reqDetail.id,
                        title: reqDetail.name,
                        status: reqDetail.status,
                        category: reqDetail.projectArea,
                        propDdl: reqDetail.proposalDdl * 1000,
                        soluDdl: reqDetail.solutionDdl * 1000,
                        description: reqDetail.description,
                        canEdit: reqDetail.canEdit,
                        requirement: JSON.parse(reqDetail.extraData).requirement,
                        rewards: JSON.parse(reqDetail.extraData).rewards,
                        metaData: {
                            lastModified: reqDetail.lastModifiedTime * 1000,
                            authorName: reqDetail.creatorName,
                            authorId: reqDetail.creatorId,
                        }
                    }}
                    actionButton={
                        // if status is not draft, can view proposal.
                        // if is draft, can delete
                        reqDetail.status !== statusBank.request.draft.label
                            ? <ViewProposalsBtn reqName={reqDetail.name} reqId={reqDetail.id} />
                            : <MKButton
                                variant="gradient"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteProject(reqDetail.id)}
                                sx={{ ml: 2 }}
                            >
                                Delete
                            </MKButton>
                    }
                />
            }

            <CardCounters total={total} status={status} type='request' />
            <FilterBar handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch} type='request'></FilterBar>
            <EndlessScroll
                dataLength={reqs.length}
                next={() => fetchData(numPage + 1, false)}
                hasMore={hasMore}
            >
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '30px' }}>
                    {
                        reqs.length === 0
                            ? <MKTypography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                No Project Request match your criteria
                            </MKTypography>
                            : reqs.map(r =>
                                <RequestCard
                                    key={r.id}
                                    data={{
                                        ...r,
                                        topic: r.area,
                                    }}
                                    openDetail={() => getProjectDetail(r.id)}
                                />
                            )
                    }
                </Grid>
            </EndlessScroll>
        </BasicPageLayout>
    );
}
export default MyProjectRequests;
