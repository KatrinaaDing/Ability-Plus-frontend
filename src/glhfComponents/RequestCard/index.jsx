import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { FcLike } from 'react-icons/fc';
import StatusBadge from 'glhfComponents/StatusBadge';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import { getCode } from 'utils/getStatus';
import { statusBank } from 'utils/getStatus';
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

const RequestCard = ({ data, openProp }) => {
    const page = window.location.pathname.slice(1);
    const navigate = useNavigate();

    const ViewRankingBtn = () => 
         <MKButton
            variant="gradient"
            color="info"
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
            onClick={openProp}
        >
            View Detail
        </MKButton>


    return (
        <Card sx={{ minWidth: 345, margin: '10px' }}>
            <CardContent>
                <Grid container item justifyContent="center" xs={10}>
                    <MKTypography gutterBottom variant="h5" component="div">
                        {data.id}.{data.title}
                    </MKTypography>
                    <StatusBadge type='request' statusLabel={data.status} size='sm' />
                </Grid>
                <MKTypography variant="body2" color="secondary">
                    {data.description.substring(0, 50)}
                </MKTypography>
                <Grid>
                    <Grid item>
                        <MKTypography variant="caption">Topic: {data.topic}</MKTypography>
                    </Grid>
                    {
                        page.startsWith('student/personal') &&
                        <Grid item>
                            <MKTypography variant="caption">Posted by:
                                <Link to={`/company-info/${data.authorId}`}>
                                    {data.authorName}
                                </Link>
                            </MKTypography>
                        </Grid>
                    }
                    <Grid item>
                        <MKTypography variant="caption">Last Modification Date: {data.lastModification}</MKTypography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                    <Grid container justifyContent="flex-end">
                        {/* 9 */}
                        {
                            getCode('request', data.status) > statusBank.request.approving.code 
                                ? <ViewRankingBtn />
                                : <ViewDetailBtn />
                        }
                    </Grid>
                <br />
                
            </CardActions>
        </Card>
    );
}
export default RequestCard;