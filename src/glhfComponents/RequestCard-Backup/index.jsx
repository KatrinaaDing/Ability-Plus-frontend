import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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

const RequestCard = ({ userType, page, data }) => {
  const [authorId, setAuthorId] = useState(0);
  const [title, setTitle] = useState('');
  const [oneSentenceDescription, setOneSentenceDescription] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [postedAt, setPostedAt] = useState('');
  const [like, setLike] = useState('');
  const [url, setUrl] = useState('');
  const [topic, setTopic] = useState('');
  const [lastModification, setLastModification] = useState('');
  const [status, setStatus] = useState('');
  const [cardButtonStyle, setCardButtonStyle] = useState('flex-end');
  
  useEffect(() => {
    //if no data from backend, use this fake data
    if (data === undefined) {
      setAuthorId(0);
      setTitle('title');
      setOneSentenceDescription('Here is the description xxxxxxxxxxxxx');
      setAuthorName('author');
      setLike('5');
      setLastModification('last-modification-date');
      setPostedAt('2022-01-01');
      setTopic('Topic Here')
    } else if (userType === 'company' && page === 'All Proposals') {
      setAuthorId(data.authorId);
      setAuthorName(data.authorName);
      setLastModification(data.lastModificationDate);
      setTitle(data.title);
    } else if (userType === 'company' && page === 'My Project Requests') {
      setAuthorId(data.authorId);
      setAuthorName(data.authorName);
      setOneSentenceDescription(data.description);
      setStatus(data.status);
      setTitle(data.title);
    } else if (userType === 'student' && page === 'Personal Page') {
      setTitle('title');
      setOneSentenceDescription('Here is the description xxxxxxxxxxxxx');
      setLike('5');
      setAuthorName('Google');
    }
    // student wants to see company's profile
    if (userType === 'student') {
      setUrl(`/company-info/${authorId}`);
    } else if (userType === 'company' || userType === 'all') {
      //company wants to see student's profile
      setUrl(`/student-info/${authorId}`);
    }
    // if not on popular proposal page and not on company sees students' profile page
    // it should have a status
    // if ((!(userType === 'all' && page === 'Popular Proposals')) && (!(userType === 'company' && page === 'Student Profile'))) {
    //   setStatusCode(2);
    // }

    //for display view details and view rank buttons
    if (page === 'Popular Proposals' || (userType === 'student' && page === 'Personal Page') || (userType === 'student' && page === 'Personal Page') || (userType === 'company' && page === 'Student Profile')) {
      setCardButtonStyle('space-around');
    }
  })

  const handleViewDetail = () => {
    if (userType === 'company' && page === 'All Proposals') { 

    } else if (page === 'My Project Requests') {
        assert(userType === 'company');


    } else if (userType === 'student' && page === 'Personal Page') {


    }
  }

  return (
    <Card sx={{ minWidth: 345, margin: '10px'}}>
        <CardContent>
          <Grid container item justifyContent="center" xs={10}> 
            <MKTypography gutterBottom variant="h5" component="div">
              {/* 1 */}
              {title} 
            </MKTypography>
            {(!(userType === 'company' && page === 'Student Profile')&& !(userType === 'all' && page === 'Popular Proposals')) &&
              // {/* 8 */}
              <StatusBadge type='request' statusLabel={status} size='sm' />
            }
          </Grid>
          <MKTypography variant="body2" color="secondary">
            {/* 2 */}
            {(oneSentenceDescription).substring(0,50)}
          </MKTypography>
          <Grid>
            {(userType === 'student' && page === 'My Proposals') &&
              // {/* 6 */}
              <Grid item>
              <MKTypography variant="caption">Topic: {topic}</MKTypography>
              </Grid>
            }
            {((page === 'Popular Proposals')||(userType === 'company' && page === 'All Proposals')||(userType === 'student' && page === 'Personal Page')) && 
              <Grid item>
              {/* 3 */}
                <MKTypography variant="caption">Posted by:
                
                  <Link to={url}>
                      {authorName}
                  </Link>
                </MKTypography>
            </Grid>
            }
            {((userType === 'company' && page === 'Student Profile')|| (userType === 'all' && page === 'Popular Proposals')) &&
              <Grid item>
              {/* 4 */}
              <MKTypography variant="caption">Posted At: {postedAt}</MKTypography>
              </Grid>
            }
            
            {((userType === 'student' && page === 'My Proposals') || (userType === 'company' && page === 'All Proposals') || (userType === 'company' && page === 'My Project Requests')) &&
            <Grid item>
              {/* 7 */}
              <MKTypography variant="caption">Last Modification Date: {lastModification}</MKTypography>
            </Grid>
            }
          </Grid>
        </CardContent>
        <CardActions>
          {((userType === 'company' && page === 'My Project Requests') || (userType === 'student' && page === 'Company Profile')) &&
            <Grid container justifyContent="flex-end"> 
              {/* 9 */}
              {status === 'Closed'&& <MKButton variant="gradient" color="info" size="small">View Ranking</MKButton>}
              {status === 'Draft' && <MKButton variant="gradient" color="info" size="small">Edit</MKButton>}
            </Grid> 
          }
          <br/>
          <Grid container justifyContent={cardButtonStyle}> 
            {/* 10 */}
              <MKButton variant="gradient" color="info" size="small" onClick={handleViewDetail}>View Details</MKButton>
              {((userType === 'student' && page === 'Personal Page') || (userType === 'company' && page === 'Student Profile') || (userType === 'all' && page === 'Popular Proposals')) &&
                <div>
                  <FcLike size={20} display='inline-block'/>
                  <MKTypography variant="body2" mb={1} display='inline-block'>
                    {/* 5 */}
                    {like}
                  </MKTypography>
                </div>
              }
            </Grid>
       </CardActions>
    </Card>
  );
}
export default RequestCard;