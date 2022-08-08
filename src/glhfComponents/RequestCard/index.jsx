import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions, Icon, List } from '@mui/material';
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import StatusBadge from 'glhfComponents/StatusBadge';
import ProposalDescriptionModal from 'glhfComponents/ProposalDescriptionModal';
import RequestDescriptionModal from 'glhfComponents/RequestDescriptionModal';
import { getCode } from 'utils/getStatus';
import { statusBank } from 'utils/getStatus';
import { getRandomCategory } from 'assets/data/categories';
import MKBox from 'components/MKBox';
import CardListItem from 'glhfComponents/ProposalCard/components/CardListItem';
import ViewRankingBtn from './components/ViewRankingBtn';
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
    topic/area,
    authorName,
    authorId,
    lastModification,
}
*/

//Showing the project challenge in a summary format; users can click to see more details
const RequestCard = ({ data, openDetail, color}) => {
    const page = window.location.pathname.slice(1);


    const ViewDetailBtn = () =>
        <MKButton
            variant="outlined"
            color="info"
            size="small"
            onClick={openDetail}
        >
            View Detail
        </MKButton>

    return (
        <Grid item xs={12} md={6} lg={6} xl={4} >
            <StatusBadge 
                type='request' 
                statusLabel={data.status} 
                size='sm' 
                variant={ color && color === 'light' ? 'gradient' : "contained"}
                position='top-right' 
            />
            <MKBox
                variant='contained'//{color === "transparent" ? "contained" : "gradient"}
                bgColor={color || 'white'}
                borderRadius="xl"
                shadow={color === "transparent" ? "none" : "md"}
                px={3}
                pt={3}
                pb={2}
                sx={{
                    height: 
                        page.indexOf('info') >= 0
                        ?   '320px'
                        :   { xl:'370px', 'lg': '310px', 'md': '400px', 'xs': '350px'},
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
                    <MKTypography
                        variant="caption"
                        fontWeight="regular"
                        lineHeight={1}
                        color={!color || color === "transparent" || color === "light" ? "text" : "white"}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Icon>schedule</Icon>&nbsp;
                        {new Date(data.lastModifiedTime * 1000).toLocaleString()}
                    </MKTypography>
                </MKBox>
                <MKTypography
                    variant="body2"
                    color={!color || color === "transparent" || color === "light" ? "text" : "white"}
                    sx={{
                        height: 
                            page.indexOf('info') >= 0
                                ? '70px'
                                : { xl: '170px', 'lg': '100px', 'md': '100px', 'xs': '100px' }
                        ,
                        fontWeight: '500',
                        pt: 3
                    }}
                >
                    &quot; {data.description.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 140)}... &quot;
                </MKTypography>
                <List>
                    {(data.topic || data.area) && <CardListItem title='Category' value={data.topic ?? data.area} link={null} color={color} />}
                    {page.indexOf('browse') >= 0 && <CardListItem title='Posted by' value={data.authorName} link={`/company-info/${data.authorId}`} color={color} />}
                </List>
                <MKBox sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '-webkit-fill-available'
                }}>
                    {
                        getCode('request', data.status) > statusBank.request.approving.code
                            ? <ViewRankingBtn id={data.id} />
                            : <ViewDetailBtn />
                    }
                </MKBox>

            </MKBox>
        </Grid >
    );
}
export default RequestCard;