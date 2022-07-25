/**
 * Author: Ziqi Ding
 * Created At: 13 Jul 2022
 * Discription: A card to demo proposal
 */
import { Checkbox, Icon, List } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import useAuth from 'auth/useAuth';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import ProcessStatusBadge from 'glhfComponents/ProcessStatusBadge';
import StatusBadge from 'glhfComponents/StatusBadge';
import React from 'react';
import { FcLike } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { statusBank } from 'utils/getStatus';
import { getCode } from 'utils/getStatus';
import CardListItem from './components/CardListItem';

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


const ProposalCard = ({ data, openDetail, secondary, color }) => {
    const page = window.location.pathname.slice(1)
    color='light'
    
    const getProcessStatus = () => {
        // has notes or rating => viewed
        if (data.status !== undefined)
            return data.status
        else if (data.rating > 0 || data.note !== '') 
            return 1
    }



    return (
        <MKBox
            variant="contained"
            bgColor={color === 'light' ? 'white' : color}
            borderRadius="xl"
            shadow={color === "transparent" ? "none" : "md"}
            p={3}
            sx={{
                height: '320px'
            }}
        >
            <MKBox lineHeight={1}>
                <MKTypography
                    display="block"
                    variant="h6"
                    fontWeight="bold"
                    color={color === "transparent" || color === "light" ? "dark" : "white"}
                    mb={0.5}
                >
                    {data.title}
                </MKTypography>
                {
                    data.lastModified &&
                    <MKTypography
                        variant="caption"
                        fontWeight="regular"
                        lineHeight={1}
                        color={color === "transparent" || color === "light" ? "text" : "white"}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon>schedule</Icon>&nbsp;
                        {new Date(data.lastModified * 1000).toLocaleString()}
                    </MKTypography>

                }
            </MKBox>
            <MKTypography
                variant="body1"
                color={color === "transparent" || color === "light" ? "text" : "white"}
                my={3}
                sx={{
                    height: '70px'
                }}
            >
                &quot;{ data.description } &quot;
            </MKTypography>
{/*                     
                    {
                        // student info/popular page does not show status
                        // (page.startsWith('student-info') || page.startsWith('popular')) ||
                        !page.startsWith('view-proposals') && data.status &&
                            <StatusBadge type='proposal' statusLabel={data.status} size='sm'  />
                    }
                    {
                        page.startsWith('view-proposals') &&
                            <ProcessStatusBadge 
                                status={getProcessStatus()} 
                            />
                    } */}
                {/* <MKTypography
                    variant="body2"
                    color={color === "transparent" || color === "light" ? "text" : "white"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 0.375,

                        "& .material-icons-round": {
                            ml: -0.375,
                        },
                    }}
                >
                    {data.authorName}
                </MKTypography> */}
                <List>
                    {data.topic && <CardListItem title='Category' value={data.topic} link={null} color={color}  /> }
                    {data.projectName && <CardListItem title='Project' value={data.projectName} link={null} color={color}  />}
                    {data.authorName && <CardListItem title='Posted by' value={data.authorName} link={`/student-info/${data.authorId}`} color={color} />}
                </List>
                    {/* {
                        data.topic &&
                            <MKTypography variant="caption">Category: {data.topic}</MKTypography>
                    }
                    <br/>
                    {
                        data.projectName &&
                        <MKTypography variant="caption">Project: {data.projectName}</MKTypography>
                    }
                    {
                        ((page.startsWith('popular')) || page.startsWith('company/personal') || page.startsWith('view')) &&
                        <Grid item>
                            <MKTypography variant="caption">Posted by:
                                <Link to={`/student-info/${data.authorId}`} target="_blank">
                                    {data.authorName}
                                </Link>
                            </MKTypography>
                        </Grid>
                    } */}
                    {
                        data.rating &&
                        <MKTypography variant="caption">Rating: {data.rating}</MKTypography>

                    }
                    
            <CardActions>
                <MKBox sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '-webkit-fill-available'
                }}>
                    {
                        (page.startsWith('popular') ||
                        page.startsWith('student-info') ||
                        (page.startsWith('my-proposals') && data.status == statusBank.proposal.approved.label)) &&
                            <MKBox display='flex' flexDirection='row' px={3} sx={{mt: 'auto', mb: 'auto'}}>
                                <FcLike size={20} display='inline-block' />
                                <MKTypography variant="body2"  display='inline-block'>
                                    {data.likes}
                                </MKTypography>
                            </MKBox>
                    }
                    {
                        secondary !== undefined
                            ? secondary
                            : <MKButton variant="gradient" color="info" size="small" onClick={openDetail}>View Details</MKButton>
                    }
                </MKBox>
            </CardActions>
        </MKBox>
    );
};

export default ProposalCard;