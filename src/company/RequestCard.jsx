import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { FcLike } from 'react-icons/fc';
import StatusBadge from './components/StatusBadge';
// 1. title
// 2.description
// 3.author
// 4.posted at
// 5.like count
// 6.topic
// 7.last modification
// 8.status
// 9. View Ranking
// popular proposals: 1 2 3 4 5 (userType: 'all', page: 'Popular Proposals')
// Company My Project Requests: 1 2 8 9 (userType: 'company', page: 'My Project Requests')
// Company All Proposals: 1 2 8 7 (userType: 'company', page: 'All Proposals')
// Company see student's profile: 1 2 3 4 5 (userType: 'company', page: 'Student Profile'
// Student's My Proposal page: 1 2 6 8 7 (userType: 'student', page: 'My Proposals')
// Student's personal page: 1 2 5 8 (userType: 'student', page: 'Personal Page')
// Student see company's profile: 1 2 3 8 9 (userType: 'student', page: 'Company Profile')

const RequestCard = ({ userType, page }) => {
  const [statusCode, setStatusCode] = useState(0);
  const sample = {
    title: 'title',
    description: 'description',
    author: 'author',
    postedAt: 'postedbydate',
    like: '5',
    topic: 'topic',
    last_modification: 'last-modification-date',
    status: 'Closed'
  }
  
  useEffect(() => {
    if (sample.status === 'Draft') {
    setStatusCode(0);
  } else if (sample.status === 'Open for Proposal') {
    setStatusCode(1);
  } else if (sample.status === 'Approving') {
    setStatusCode(2);
  } else if (sample.status === 'Open for Solution') {
    setStatusCode(3);
  } else if (sample.status === 'Closed') {
    setStatusCode(4);
  } else if (sample.status === 'Ejected') {
    setStatusCode(5);
  }
  }, [])
  return (
    <Card sx={{ minWidth: 345, margin: '10px'}}>
      <CardActionArea>
        <CardContent>
          <Grid container item justifyContent="center" xs={10}> 
            <MKTypography gutterBottom variant="h5" component="div">
              {/* 1 */}
              {sample.title} 
            </MKTypography>
            {(!(userType === 'company' && page === 'Student Profile')&& !(userType === 'all' && page === 'Popular Proposals')) &&
              // {/* 8 */}
             <StatusBadge statusCode={ statusCode } color={ 'light'} />
            }
          </Grid>
          <MKTypography variant="body2" color="text.secondary">
            {/* 2 */}
            {sample.description}
          </MKTypography>
          <Grid>
            {(userType === 'student' && page === 'My Proposals') &&
              // {/* 6 */}
              <Grid item>
              <MKTypography variant="caption">Topic: {sample.topic}</MKTypography>
              </Grid>
            }
            {((page === 'Popular Proposals') || (userType === 'company' && page === 'Student Profile')|| (userType === 'student' && page === 'Company Profile')) && 
              <Grid item>
              {/* 3 */}
              <MKTypography variant="caption">Posted by: {sample.author}</MKTypography>
            </Grid>
            }
            {((userType === 'company' && page === 'Student Profile')|| (userType === 'all' && page === 'Popular Proposals')) &&
              <Grid item>
              {/* 4 */}
              <MKTypography variant="caption">Posted At: {sample.postedAt}</MKTypography>
              </Grid>
            }
            
            {((userType === 'student' && page === 'My Proposals') || (userType === 'company' && page === 'All Proposals')) &&
            <Grid item>
              {/* 7 */}
              <MKTypography variant="caption">Last Modification Date: {sample.last_modification}</MKTypography>
            </Grid>
            }
          </Grid>
          {((userType === 'company' && page === 'My Project Requests') || (userType === 'student' && page === 'Company Profile')) &&
            <Grid container justifyContent="flex-end"> 
              {/* 9 */}
              {sample.status === 'Closed'&& <MKButton variant="gradient" color="info" size="small">View Ranking</MKButton>}
              {sample.status === 'Draft' && <MKButton variant="gradient" color="info" size="small">Edit</MKButton>}
            </Grid> 
          }
          {((userType === 'student' && page === 'Personal Page') || (userType === 'company' && page === 'Student Profile')|| (userType === 'all' && page === 'Popular Proposals' ))&&
            <Grid container justifyContent="flex-end"> 
              <FcLike size={20} />
              <MKTypography variant="body2" mb={1}>
                {/* 5 */}
                  {sample.like}
              </MKTypography>
            </Grid>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default RequestCard;