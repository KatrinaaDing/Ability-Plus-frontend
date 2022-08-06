/**
 * Author: Ziqi Ding
 * Created At: 13 Jul 2022
 * Discription: A card to display proposal
 */
import { Icon, List, Rating } from '@mui/material';
import Grid from '@mui/material/Grid';
import MKBox from 'components/MKBox';
import MKButton from 'components/MKButton';
import MKTypography from 'components/MKTypography';
import ProcessStatusBadge from 'glhfComponents/ProcessStatusBadge';
import StatusBadge from 'glhfComponents/StatusBadge';
import React from 'react';
import { statusBank } from 'utils/getStatus';
import CardListItem from './components/CardListItem';
import LikeIcon from './components/LikeIcon';
import StarIcon from '@mui/icons-material/Star';

/*
the cases for displaying various infomation on proposal card:
| page                  | role | title | desc | topic | status | author | last-modi | like                  | action |
| --------------------- | ---- | ----- | ---- | ----- | ------ | ------ | --------- | --------------------- | ------ |
| popular proposal      | c,s  | 1     | 1    | 1     | 0      | 1      | 1         | 1                     | view   |
| company personal page | c    | 1     | 1    | 1     | 1      | 1      | 1         | 0                     | view   |
| my proposals          | s    | 1     | 1    | 1     | 1      | 0      | 1         | ==approved: 1, else 0 | view   |
| student info          | c,s  | 1     | 1    | 1     | 0      | 0      | 1         | 1                     | view   |

data structure:
data = {
    title,
    status,
    description,
    topic, (category)
    authorId,
    authorName,
    lastModified,
    likes,
}

*/

const ProposalCard = ({ data, openDetail, secondary, color }) => {
    const page = window.location.pathname.slice(1)

    const getProcessStatus = () => {
        // has notes or rating => viewed
        if (data.status !== undefined)
            return data.status
        else if (data.rating > 0 || data.note !== '')
            return 1
    }

    const renderStatus = () => {
        if (!page.startsWith('view-proposals') && data.status)
            return <StatusBadge type='proposal' statusLabel={data.status} position='top-right' />

        else if (page.startsWith('view-proposals'))
            return <ProcessStatusBadge status={getProcessStatus()} position='top-right' />

        else
            return <></>
    }


    return (
        <Grid item xs={12} md={6} lg={6} xl={4} xxl={3}>
            {renderStatus()}
            <MKBox
                variant='contained'//{color === "transparent" ? "contained" : "gradient"}
                bgColor={color || 'white'}
                borderRadius="xl"
                shadow={color === "transparent" ? "none" : "md"}
                px={3}
                pt={3}
                pb={2}
                sx={{
                    height: { 'lg': '330px', 'md': '330px', 'sm': '330px', 'xs': '300px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >

                <MKBox lineHeight={1}>
                    <MKTypography
                        display="block"
                        variant="h5"
                        fontWeight="bold"
                        color={!color || color === "transparent" || color === "light" ? "dark" : "white"}
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
                                color={!color || color === "transparent" || color === "light" ? "text" : "white"}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <Icon>schedule</Icon>&nbsp;
                            {new Date(data.lastModified * 1000).toLocaleString()}
                        </MKTypography>

                    }
                </MKBox>
                <MKTypography
                    variant="body2"
                    color={!color || color === "transparent" || color === "light" ? "text" : "white"}
                    my={2}
                    sx={{
                        height: '100px',
                        fontWeight: '500'
                    }}
                >
                    &quot; {data.description} &quot;
                </MKTypography>
                <List>
                    {data.projectName && <CardListItem title='Project' value={data.projectName} link={null} color={color} />}
                    {data.topic && <CardListItem title='Category' value={data.topic} link={null} color={color} />}
                    {data.authorName && <CardListItem title='Posted by' value={data.authorName} link={`/student-info/${data.authorId}`} color={color} />}
                    {
                        data.comment && data.comment !== null &&
                        <CardListItem 
                            title='My Comment' v
                            value={data.comment.length === 0
                                ? "No comment."
                                : data.comment.length > 45
                                    ? data.comment.split(' ').slice(0, 7).join(' ') + '...'
                                    : data.comment} 
                            link={null} 
                            color={color} 
                            />
                    }
                </List>
                <MKBox sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-between',
                    width: '-webkit-fill-available'

                }}>
                {
                    data.rating != null &&
                    <Rating
                        name="rating"
                        defaultValue={data.rating/2}
                        max={5}
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        size="medium"
                        readOnly
                    />
                }
                    <MKBox sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '-webkit-fill-available'
                    }}>
                        {
                            (page.startsWith('popular') ||
                                page.startsWith('student-info') ||
                                (page.startsWith('my-proposals') && data.status == statusBank.proposal.approved.label)) &&
                            <MKBox display='flex' flexDirection='row'  sx={{ mt: 'auto', mb: 'auto' }}>
                                <LikeIcon number={data.likes} direction='row' />
                            </MKBox>
                        }
                        {
                            secondary !== undefined
                                ? secondary
                                : <MKButton variant="outlined" color="info" size="small" onClick={openDetail}>View Details</MKButton>
                        }
                    </MKBox>
                </MKBox>

            </MKBox>
        </Grid>

    );
};

export default ProposalCard;