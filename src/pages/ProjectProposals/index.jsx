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
import ProcessStatusBadge from "glhfComponents/ProcessStatusBadge";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const ProjectProposals = () => {
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [propCards, setPropCards] = useState([]);

    const [total, setTotal] = useState(0);
    const [isPick, setIsPick] = useState(0);

    const [propDetail, setPropDetail] = useState(null);
    const [propDetailOpen, setPropDetailOpen] = useState(false);

    useEffect(async () => {
        // FIXME: add search key
        await axiosPrivate.get('/proposal/list_project_proposals', {
            params: new URLSearchParams({
                isAscendingOrder: true,
                pageNo: 1,
                pageSize: 20,
                projectId: projectId,
                whatOrder: 'LastModifiedTime',
                isPick: isPick,
                searchKey: ''
            })
        })
            .then(res => {
                console.log(res)
                setPropCards(res.data.records)
                setTotal(res.data.total)
            })
            .catch(e => console.error(e))
    }, [])

    const getPropDetail = async (id) => {
        await axiosPrivate('/proposal/get_proposal_detail_info', {
            params: new URLSearchParams({
                proposalId: parseInt(id)
            })
        })
            .then(res => {
                res.data.extraData = JSON.parse(res.data.extraData)
                setPropDetail({...res.data, id})
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }
    
    // TODO put proposal rank if status > approving

    return (
        <BasicPageLayout title={`All Proposals for project "${projectName}"`}>
            <p>There {total <= 1 ? 'is' : 'are'} {total} proposal{total > 1 ? 's' : ''}</p>
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
                        actionButton={
                            <MKButton 
                                variant="gradient" 
                                color="warning" 
                                startIcon={
                                    true
                                        ? <PlaylistAddCheckIcon />
                                        : <PlaylistAddIcon />
                                }
                                onClick={() => alert('approved')}
                            >
                                Shortlist
                            </MKButton>
                        }
                    />
            }

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
                    {
                        propCards.map(p =>
                            <ProposalCard
                                key={p.id}
                                data={{
                                    title: p.title,
                                    description: p.oneSentenceDescription,
                                    authorId: p.authorId,
                                    aurhorName: p.authorName,
                                    isPicked: isPick,
                                    rating: p.rating,
                                    note: ''              // FIXME: 目前api没有返回公司的note
                                }}
                                openDetail={() => getPropDetail(p.id)}
                            />
                            
                        )
                    }
                </Grid>
            </Box>              
        </BasicPageLayout>
    );
}
export default ProjectProposals;
