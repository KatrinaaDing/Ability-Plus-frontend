import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import routes from "routes";
import Box from '@mui/material/Box';
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import ProposalCard from "glhfComponents/ProposalCard";
import { useEffect } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";

const AllProposals = () => {
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [propCards, setPropCards] = useState([]);

    const [propDetail, setPropDetail] = useState(null);
    const [propDetailOpen, setPropDetailOpen] = useState(false);

    useEffect(async () => {
        // await axiosPrivate.get('')
        // TODO call api
        setPropCards([
            {
                id: 1,
                title: "Sample Title",
                status: 'submitted',
                topic: "Proposal Management",
                authorId: 8,
                authorName: 'Student 1',
                lastModified: new Date().toLocaleString(),
                likes: 5
            }
        ])



    }, [])
/*
{
    "createTime": 0,
    "creatorId": 0,
    "extraData": "string",
    "id": 0,
    "lastModifiedTime": 0,
    "likeNum": 0,
    "oneSentenceDescription": "string",
    "status": "string",
    "title": "string"
  },
  */
    const getPropDetail = async () => {
        await axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: parseInt(projectId)
            })
        })
            .then(res => {
                // TODO handle data
                // res.data.extraData = JSON.parse(res.data.extraData)
                // setPropDetail(res.data)
                setPropDetail({
                    "createTime": 0,
                    "creatorId": 1,
                    "extraData": "string",
                    "id": 0,
                    "lastModifiedTime": 0,
                    "likeNum": 0,
                    "oneSentenceDescription": "string",
                    "status": "approving",
                    "title": "string"
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }
    
    // TODO put proposal rank if status > approving

    return (
        <BasicPageLayout title={`All Proposals for project "${projectName}"`}>
            {
                propDetail &&
                    <ProposalDescriptionModal
                        open={propDetailOpen}
                        setOpen={setPropDetailOpen}
                        value={{
                            id: propDetail.id,
                            title: propDetail.title,
                            status: propDetail.status,
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
                                topic: projectName
                            }
                        }}
                        actionButton={<></>}
                    />
            }
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                    {
                        propCards.map(p =>
                            <ProposalCard
                                key={p.id}
                                data={p}
                                openDetail={() => getPropDetail()}
                            />
                            
                        )
                    }
                </Grid>
            </Box>              
        </BasicPageLayout>
    );
}
export default AllProposals;
