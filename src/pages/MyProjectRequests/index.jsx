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

import StatusBadge from "glhfComponents/StatusBadge";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";

const MyProjectRequests = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);

    // request detail state
    const [reqOpen, setReqOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState({})

    // searching state
    const [ascending, setAcending] = useState(true);
    const [status, setStatus] = useState('draft');
    const [searchKey, setSearchKey] = useState('');
    
    useEffect(async () => {
        const params = new URLSearchParams({
            status: status,
            isAscendingOrder: ascending,
            pageNo: 1,
            pageSize: 10,
            searchKey: searchKey === '' ? undefined : searchKey
        })
        await axiosPrivate.get('/project/list_my_project_request/', {
            params: params
        })
            .then(res => {
                setReqs(res.data.records)
                setTotal(res.data.total)
            })
            .catch(e => {
                console.error(e)
            })

    }, [ascending, status, searchKey])

    const handleDate = (ascending) => {
        setAcending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
   
    const handleCreate = () => {
        navigate('/create-request')
    }


    const getProjectDetail = async (id) => {
        await axiosPrivate.get('/project/get_project_info', {
            params: new URLSearchParams({
                id: id
            })
        })
            .then(res => { console.log(JSON.parse(res.data.extraData));setReqDetail(res.data)})
            .then(res => setReqOpen(true))
            .catch(e => console.error(e))
    }



    return (
        <BasicPageLayout title="My Project Reqeusts">
            {
                Object.keys(reqDetail).length > 0  &&
                    <RequestDescriptionModal
                        open={reqOpen}
                        setOpen={setReqOpen}
                        value={{
                            title: reqDetail.name,
                            status: status,
                            category: reqDetail.projectArea,  
                            propDdl: new Date(reqDetail.proposalDdl * 1000).toLocaleString(),
                            soluDdl: new Date(reqDetail.solutionDdl * 1000).toLocaleString(),
                            description: reqDetail.description,
                            requirement: JSON.parse(reqDetail.extraData).requirement,
                            rewards: JSON.parse(reqDetail.extraData).rewards,
                            metaData: {
                                lastModified: new Date(reqDetail.lastModifiedTime * 1000).toLocaleString(),
                                authorName: reqDetail.creatorName,
                                authorId: reqDetail.creatorId,
                            }
                        }}
                        actionButton={<></>}
                    />
            }
            
            <MKBox display='flex'>
                <p>There are {total} reqeusts with status </p>
                <StatusBadge statusLabel={status} type='request' size='sm' />
            </MKBox>
            <Grid container justifyContent="flex-end">
                <MKButton variant="gradient" color="info" size="large" onClick={handleCreate}>Create Project</MKButton>
            </Grid>
            <br />
            <Box sx={{ flexGrow: 1 }}>
                <FilterBar handleDate={handleDate} handleStatus={handleStatus} handleSearch={ handleSearch}></FilterBar>
                <br />
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        reqs.length === 0
                            ? <MKTypography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    No Project Request match your criteria
                                </MKTypography>
                            :    reqs.map(r => 
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
