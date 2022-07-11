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

const MyProjectRequests = () => {
    const [reqs, setReqs] = useState([]);
    const [total, setTotal] = useState(0);

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const params = new URLSearchParams({
        status: "Draft",
        isAscendingOrder: true,
        pageNo: 1,
        pageSize: 10,
    })
    useEffect(async () => {
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
      
    }, [])
    
    const handleCreate = () => {
        navigate('/create-request')
    }

    return (
        <BasicPageLayout title="My Project Reqeusts">
            <p>There are {total} reqeusts in total</p>
            <Grid container justifyContent="flex-end">
                <MKButton variant="gradient" color="info" size="large" onClick={handleCreate}>Create Project</MKButton>
            </Grid>
            <br />
            <Box sx={{ flexGrow: 1 }}>
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

                </Grid>
            </Box>

        </BasicPageLayout>
    );
}
export default MyProjectRequests;
