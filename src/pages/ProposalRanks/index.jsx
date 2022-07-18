import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import ProposalRank from "glhfComponents/ProposalRank";
import StatusBadge from "glhfComponents/StatusBadge";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import axios from "axios";
import useAuth from "auth/useAuth";
import { BASE_URL } from "api/axios";
import MKButton from "components/MKButton";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import LikeButton from "glhfComponents/LikeButton";
import { BulletList } from 'react-content-loader'


const sampleProps = [
    {
        id: 18,
        rank: 1,
        title: 'title1',
        description: 'description1',
        author: 'author1',
        like: 100
    },
    {
        id: 17,
        rank: 2,
        title: 'title2',
        description: 'description2',
        author: 'author2',
        like: 10
    }
]


const ProposalRanks = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id: projectId } = useParams();
    const { auth } = useAuth();

    const [requestId, setRequestId] = useState(0);
    const [statusCode, setStatusCode] = useState(0);
    const [proposals, setProposals] = useState([])
    
    // detail modal states
    const [propDetail, setPropDetail] = useState();
    const [propDetailOpen, setPropDetailOpen] = useState(false);
    const [reqDetail, setReqDetail] = useState();
    const [reqDetailOpen, setReqDetailOpen] = useState(false);

    //need to use request id to (requestname, status, a list of ranks)


    useEffect(async () => {
        await axiosPrivate.get('/project/get_project_info', {
            params: new URLSearchParams({
                id: parseInt(projectId)
            })
        })
            .then(res =>
                setReqDetail({
                    ...res.data,
                    id: projectId,
                })
            )
            .catch(e => console.error(e))
        await axios.get(`${BASE_URL}/proposal/list_approved_project_proposals`, {
            params: new URLSearchParams({
                isAscendingOrder: true,
                pageNo: 1,
                pageSize: 20,
                projectId: projectId
            }),
            headers: {
                token: auth.accessToken
            }
        })
            .then(res => {
                if (res.data.data.status >= 400)
                    return Promise.reject(res)
                // setProposals(res.data.data.records)
                setProposals(sampleProps) // FIXME
            })
            .catch(e => console.error(e))

        
    }, [])

    const getPropDetail = async (id) => {
        await axios.get(`${BASE_URL}/proposal/get_proposal_detail_info`, {
            params: new URLSearchParams({
                proposalId: parseInt(id)
            }),
            headers: {
                token: auth.accessToken
            }
        })
            .then(res => {
                console.log(res)
                res.data.data.extraData = JSON.parse(res.data.data.extraData)
                setPropDetail({
                    ...res.data.data, 
                    id,
                    // status: 
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }

    if (reqDetail === undefined) {
        return (
            <BasicPageLayout
                title="Loading content. Please wait..."
            >
                <BulletList />
            </BasicPageLayout>
        )
    }
    console.log(reqDetail)
    return (
        <BasicPageLayout 
            title={`View Request Ranking for project "${reqDetail.name}"`} 
            secondaryContent={
                <MKButton
                    color='info'
                    onClick={() => setReqDetailOpen(true)}
                >
                    View Request Detail
                </MKButton>
            }
        >
            {
                propDetailOpen &&
                <ProposalDescriptionModal
                    open={propDetailOpen}
                    setOpen={setPropDetailOpen}
                    value={{
                        id: propDetail.id,
                        title: propDetail.title,
                        status: propDetail.status, // FIXME
                        desc: propDetail.oneSentenceDescription,
                        prob: propDetail.extraData.problemStatement,
                        vStat: propDetail.extraData.visionStatement,
                        goal: propDetail.extraData.goal,
                        detail: propDetail.extraData.detail,
                        likeNum: propDetail.likeNum,
                        metaData: {
                            lastModified: propDetail.lastModifiedTime,
                            authorName: propDetail.creatorName ?? "No Name",
                            authorId: propDetail.creatorId,
                            topic: reqDetail.name
                        }
                    }}
                    actionButton={
                        <LikeButton originLike={false} originNumLike={23} />
                    }
                />
            }
            {
                reqDetailOpen &&
                <RequestDescriptionModal
                    open={reqDetailOpen}
                    setOpen={setReqDetailOpen}
                    value={{
                        id: reqDetail.id,
                        title: reqDetail.name,
                        status: reqDetail.status,
                        category: reqDetail.projectArea,
                        propDdl: reqDetail.proposalDdl * 1000,
                        soluDdl: reqDetail.solutionDdl * 1000,
                        description: reqDetail.description,
                        requirement: JSON.parse(reqDetail.extraData).requirement,
                        rewards: JSON.parse(reqDetail.extraData).rewards,
                        metaData: {
                            lastModified: reqDetail.lastModifiedTime * 1000,
                            authorName: reqDetail.creatorName,
                            authorId: reqDetail.creatorId,
                        }
                    }}
                    actionButton={
                        <></>
                    }

                />
            }
            <Container>
                <br />  
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                        <ProposalRank proposals={proposals} openDetail={getPropDetail}/>
                    </Grid>
                </Box>              
            </Container>
 
        </BasicPageLayout>
    );
}
export default ProposalRanks;