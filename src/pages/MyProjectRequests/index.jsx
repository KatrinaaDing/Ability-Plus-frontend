import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import routes from "routes";
import Box from '@mui/material/Box';
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import FilterBar from "glhfComponents/RequestFilter"
import DeleteIcon from '@mui/icons-material/Delete';


import StatusBadge from "glhfComponents/StatusBadge";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import { getCode } from "utils/getStatus";
import { statusBank } from "utils/getStatus";
import ViewProposalsBtn from "./components/ViewProposalsBtn";
import CreateProjectBtn from "./components/CreateProjectBtn";

// FIXME fake data, testing purpose only
import { BASE_URL } from "api/axios";
import useAuth from "auth/useAuth";
import axios from "axios";

const MyProjectRequests = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const {auth} = useAuth();
    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);

    // request detail state
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState({})

    // searching state
    const [ascending, setAscending] = useState(false);
    const [status, setStatus] = useState('all');
    const [searchKey, setSearchKey] = useState('');

    useEffect(async () => {
        let params = {
            status: status === 'all' ? '' : status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 20,
            searchKey: searchKey,
        }

        await axiosPrivate.get(`/project/list_my_project_request`, {
            params:  new URLSearchParams(params)
        })
            .then(res => {
                // res.data.data.records = res.data.data.records.filter (e => e.authorName === auth.username)
                // FIXME 目前后端会返回全部status的request，因此在这里filter，等后端修复后应删除
                // if (status !== 'all'){
                //     const filteredData = res.data.data.records.filter(e => e.status == status)
                //     setReqs(filteredData)
                //     setTotal(filteredData.length)
                // } else {
                    setReqs(res.data.data.records)
                    setTotal(res.data.data.total)

                // }
            })
            .catch(e => {
                console.error(e)
            })

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
                            ? <ViewProposalsBtn reqName={reqDetail.name} reqId={reqDetail.id}/>
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

            {/* <MKBox display='flex'>
                <p>There {total <= 1 ? 'is' : 'are'} {total} request{total > 1 ? 's' : ''} with &nbsp;</p>
                {
                    status === 'all'
                        ? <p>all status</p>
                        : (
                            <>
                                status
                                <StatusBadge statusLabel={status} type='request' size='sm' />
                            </>
                        )
                }
                
            </MKBox> */}
            <FilterBar handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch} type='request'></FilterBar>
            <br />
            <br />
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
                                    lastModification: new Date(reqDetail.lastModifiedTime * 1000).toLocaleString()
                                }}
                                openDetail={() => getProjectDetail(r.id)}
                            />
                        )
                }
            </Grid>
        </BasicPageLayout>
    );
}
export default MyProjectRequests;
