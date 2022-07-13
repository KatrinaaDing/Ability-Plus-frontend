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
import FilterBar from "glhfComponents/Filter"
const MyProjectRequests = () => {
    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);
    const [ascending, setAcending] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
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
                console.log(res)
                setReqs(res.data.records)
                setTotal(res.data.total)
            })
            .catch(e => {
                console.error(e)
            })
      
    }, [ascending, status, searchKey])
    const handleCreate = () => {
        navigate('/create-request')
    }
    const handleDate = (ascending) => {
        setAcending(ascending)
    }
    const handleStatus = (status) => {
        setStatus(status)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    return (
        <BasicPageLayout title="My Project Reqeusts">
            <p>There are {total} reqeusts in total</p>
            <Grid container justifyContent="flex-end">
                <MKButton variant="gradient" color="info" size="large" onClick={handleCreate}>Create Project</MKButton>
            </Grid>
            <br />
            <Box sx={{ flexGrow: 1 }}>
                <FilterBar handleDate={handleDate} handleStatus={handleStatus} handleSearch={ handleSearch}></FilterBar>
                <br />
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {
                        reqs.map(r => 
                             <RequestCard
                                key={r.id}
                                userType={'company'}
                                page={'My Project Requests'}
                                data={{...r}}
                            />
                        )
                    }
                    {
                        reqs.length === 0 && <MKTypography sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>No Project Request match your criteria</MKTypography>
                    }
                </Grid>
            </Box>

        </BasicPageLayout>
    );
}
export default MyProjectRequests;
