import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import StatusBadge from 'glhfComponents/StatusBadge';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import { getCode } from 'utils/getStatus';
import { statusBank } from 'utils/getStatus';
import { getRandomCategory } from 'assets/data/categories';
// 1.title
// 2.description
// 3.author
// 4.posted at
// 5.like count
// 6.topic
// 7.last modification
// 8.status
// 9. View Ranking
// 10.View Details
// popular proposals: 1 2 3 4 5 10 (userType: 'all', page: 'Popular Proposals')
// Company Personal Page: 1 2 7 8 9 10 (userType: 'company', page: 'My Project Requests')
// Company All Proposals: 1 2 3 8 7 10 (userType: 'company', page: 'All Proposals')
// Company see student's profile: 1 2 4 5 10 (userType: 'company', page: 'Student Profile')
// Student's My Proposal page: 1 2 3 6 8 7 10 (userType: 'student', page: 'My Proposals')
// Student's personal page: 1 2 5 8 10 (userType: 'student', page: 'Personal Page')
// Student see company's profile: 1 2 8 9 10 (userType: 'student', page: 'Company Profile')


/*
value = {
    id,
    title,
    status,
    description,
    topic,
    authorName,
    authorId,
    lastModification,
}
*/


const RequestCard = ({ data, openDetail }) => {
    const page = window.location.pathname.slice(1);
    const navigate = useNavigate();

    const ViewRankingBtn = () => 
         <MKButton
            variant="gradient"
            color="primary"
            size="small"
            onClick={() => navigate(`/view-request-ranks/${data.id}`)}
        >
            View Ranking
        </MKButton>
    

    const ViewDetailBtn = () => 
        <MKButton
            variant="gradient"
            color="info"
            size="small"
            onClick={openDetail}
        >
            View Detail
        </MKButton>

    return (
        <Card sx={{ minWidth: 345, margin: '10px' }}>
            <CardContent>
                <Grid container item justifyContent="flex-start" xs={10}>
                    <MKTypography gutterBottom variant="h5" sx={{ mt: 'auto', mb: 'auto', py: 1.5 }}>
                        {data.title}
                    </MKTypography>
                    <StatusBadge type='request' statusLabel={data.status} size='sm' variant="contained" />
                </Grid>
                {/* <MKTypography variant="body2" color="secondary">
                    {data.description.substring(0, 50)}
                </MKTypography> */}
                <Grid>
                    <Grid item>
                        <MKTypography variant="caption">Topic: &nbsp;{data.topic ?? getRandomCategory()}</MKTypography>
                    </Grid>
                    {
                        page.indexOf('browse') >= 0 &&
                        <Grid item>
                            <MKTypography variant="caption">Posted by: &nbsp;
                                <Link to={`/company-info/${data.authorId}`}>
                                    {data.authorName}
                                </Link>
                            </MKTypography>
                        </Grid>
                    }
                    <Grid item>
                        <MKTypography variant="caption">Last Modification Date: &nbsp;{new Date(data.lastModifiedTime*1000).toLocaleString()}</MKTypography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                    <Grid container justifyContent="flex-end">
                        {
                            getCode('request', data.status) > statusBank.request.approving.code 
                                ? <ViewRankingBtn />
                                : <ViewDetailBtn />
                        }
                    </Grid>
                
            </CardActions>
        </Card>
    );
}
export default RequestCard;