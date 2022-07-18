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
    const [ascending, setAscending] = useState(true);
    const [status, setStatus] = useState('');
    const [searchKey, setSearchKey] = useState('');

    useEffect(async () => {
        let params = {
            status: status === 'all' ? '' : status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
        }
        if (searchKey !== '')
            params = {...params, searchKey: searchKey}

        await axios.get(`${BASE_URL}/project/list_my_project_request`, {
            params:  new URLSearchParams(params),
            headers: {
                token: auth.accessToken
            }
        })
            .then(res => {
                
                setReqs(res.data.data.records)
                setTotal(res.data.total)
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
                await axiosPrivate.get('/project/can_edit_project', {
                    params: new URLSearchParams({
                        projectId: id
                    })
                })
                    .then(canEdit =>
                        setReqDetail({
                            ...res.data,
                            id: id,
                            canEdit: canEdit.data,
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
                    alert(`Project ${id} has been deleted`);
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
                        getCode('request', status) > statusBank.request.draft.code 
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

            <MKBox display='flex'>
                <p>There {total <= 1 ? 'is' : 'are'} {total} request{total > 1 ? 's' : ''} with &nbsp;</p>
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
            <Box sx={{ flexGrow: 1 }}>
                <FilterBar handleDate={handleDate} handleStatus={handleStatus} handleSearch={handleSearch}></FilterBar>
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
            </Box>
        </BasicPageLayout>
    );
}
export default MyProjectRequests;
