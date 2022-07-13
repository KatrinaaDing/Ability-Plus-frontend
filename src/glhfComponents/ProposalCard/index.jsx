import useAuth from 'auth/useAuth';
import React from 'react';
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


 * 
 */

const ProposalCard = ({ style, data }) => {
    const page = window.location.pathname.slice(1)
    console.log(page)

    return (
        <Card sx={{ minWidth: 345, margin: '10px' }}>
            <CardContent>
                <Grid container item justifyContent="center" xs={10}>
                    <MKTypography gutterBottom variant="h5" component="div">
                        {data.title}
                    </MKTypography>
                    {
                        page.startsWith('student-info') || page.startsWith('popular')
                            ? <></>
                            : <StatusBadge type='request' statusLabel={data.status} size='sm' />
                    }
                </Grid>
                <MKTypography variant="body2" color="secondary">
                    {data.description}
                </MKTypography>
                <Grid>
                    <MKTypography variant="caption">Topic: {topic}</MKTypography>
                    {((page.startsWith('popular')) || page.startsWith('company/personal')) &&
                        <Grid item>
                            <MKTypography variant="caption">Posted by:
                                <Link to={`/student-info/${data.authorId}`}>
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
                <br />
                <Grid container justifyContent='flex-end'>
                    {/* 10 */}
                    <MKButton variant="gradient" color="info" size="small" onClick={handleViewDetail}>View Details</MKButton>
                    {(page.startsWith('popular') ||
                        page.startsWith('student-info') ||
                        (page.startsWith('my-proposals') && data.status === statusBank.proposal.approved.label)) &&
                        <div>
                            <FcLike size={20} display='inline-block' />
                            <MKTypography variant="body2" mb={1} display='inline-block'>
                                {data.likes}
                            </MKTypography>
                        </div>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
};

export default ProposalCard;