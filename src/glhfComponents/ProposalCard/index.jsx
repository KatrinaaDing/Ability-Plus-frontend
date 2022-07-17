/**
 * Author: Ziqi Ding
 * Created At: 13 Jul 2022
 * Discription: A card to demo proposal
 */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import useAuth from 'auth/useAuth';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import StatusBadge from 'glhfComponents/StatusBadge';
import React from 'react';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { statusBank } from 'utils/getStatus';
import { getCode } from 'utils/getStatus';

/**
 * 

| page                  | role | title | desc | topic | status | author | last-modi | like                  | action |
| --------------------- | ---- | ----- | ---- | ----- | ------ | ------ | --------- | --------------------- | ------ |
| popular proposal      | c,s  | 1     | 1    | 1     | 0      | 1      | 1         | 1                     | view   |
| company personal page | c    | 1     | 1    | 1     | 1      | 1      | 1         | 0                     | view   |
| my proposals          | s    | 1     | 1    | 1     | 1      | 0      | 1         | ==approved: 1, else 0 | view   |
| student info          | c,s  | 1     | 1    | 1     | 0      | 0      | 1         | 1                     | view   |

value = {
    title,
    status,
    description,
    topic, (category)
    authorId,
    authorName,
    lastModified,
    likes,
}
 * 
 */


const ProposalCard = ({ data, openDetail }) => {
    const page = window.location.pathname.slice(1)

    return (
        <Card sx={{ minWidth: 345, margin: '10px' }}>
            <CardContent>
                <Grid container item justifyContent="flex-start" xs={10}>
                    <MKTypography gutterBottom variant="h5" sx={{mt: 'auto', mb: 'auto', py: 1.5}}>
                        {data.title}
                    </MKTypography>
                    {
                        // student info/popular page does not show status
                        // (page.startsWith('student-info') || page.startsWith('popular')) ||
                        !data.status
                            ? <></>
                            : <StatusBadge type='proposal' statusLabel={data.status} size='sm'  />
                    }
                </Grid>
                <MKTypography variant="body2" color="secondary">
                    {data.description}
                </MKTypography>
                <Grid>
                    {
                        data.topic &&
                            <MKTypography variant="caption">Category: {data.topic}</MKTypography>
                    }
                    <br/>
                    {
                        data.projectName &&
                        <MKTypography variant="caption">Project: {data.projectName}</MKTypography>

                    }
                    {((page.startsWith('popular')) || page.startsWith('company/personal')) &&
                        <Grid item>
                            <MKTypography variant="caption">Posted by:
                                <Link to={`/student-info/${data.authorId}`}>
                                    {data.authorName}
                                </Link>
                            </MKTypography>
                        </Grid>
                    }
                    {
                        data.lastModified &&
                        <Grid item>
                            <MKTypography variant="caption">Last Modification Date: {new Date(data.lastModified*1000).toLocaleString()}</MKTypography>
                        </Grid>
                    }
                </Grid>
            </CardContent>
            <CardActions >
                <MKBox sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '-webkit-fill-available'
                }}>
                    {
                        (page.startsWith('popular') ||
                        page.startsWith('student-info') ||
                        (page.startsWith('my-proposals') && getCode('proposal', data.status) > statusBank.proposal.approved.code)) &&
                            <MKBox display='flex' flexDirection='row' px={3} sx={{mt: 'auto', mb: 'auto'}}>
                                <FcLike size={20} display='inline-block' />
                                <MKTypography variant="body2"  display='inline-block'>
                                    {data.likes}
                                </MKTypography>
                            </MKBox>
                    }
                    <MKButton variant="gradient" color="info" size="small" onClick={openDetail}>View Details</MKButton>
                </MKBox>
            </CardActions>
        </Card>
    );
};

export default ProposalCard;