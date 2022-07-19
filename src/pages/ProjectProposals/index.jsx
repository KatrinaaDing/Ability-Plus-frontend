import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import MKButton from "components/MKButton";

const ProjectProposals = () => {
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [propCards, setPropCards] = useState([]);
    const navigate = useNavigate();

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
                const data = res.data.data
                data.records.forEach((item, idx, arr) => arr[idx].status = 0) // FIXME this only for demo, hard code status to unviewed
                setPropCards(data.records)
                setTotal(data.total)
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
                const data = res.data.data
                data.extraData = JSON.parse(data.extraData)
                console.log(propCards.find(e => e.id === id).status)
                setPropDetail({
                    ...data, 
                    id,
                    status: propCards.find(e => e.id === id).status 
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }

    const approveProposals =  () => {
        alert('All shorlisted proposals has been approved!')
        navigate('/view-request-ranks/' + projectId)
    }
    
    const shortlistItem = (id) => {
        console.log(propCards)
        const toShortlist = propCards.find(e => e.id === id);
        console.log(id, toShortlist)
        const idx = propCards.indexOf(toShortlist)
        console.log(idx)
        toShortlist.status = 2;
        const newPropCards = [...propCards]
        newPropCards[idx] = toShortlist

        const newDetail = { ...propDetail }
        newDetail.status = 2
        setPropDetail(newDetail)
        setPropCards(newPropCards);
        // setIsPick(Number(!isPick))  //FIXME revert is pick status
    }
    // TODO put proposal rank if status > approving
    
    

    return (
        <BasicPageLayout 
            title={`All Proposals for project "${projectName}"`}
            secondaryContent={
                <MKButton
                    vairnat='gradient'
                    color='success'
                    onClick={approveProposals}
                >
                    Approve all shortlisted proposal
                </MKButton>
            }
        >
            <p>There {total <= 1 ? 'is' : 'are'} {total} proposal{total > 1 ? 's' : ''}</p>
            {
                propDetail &&
                    <ProposalDescriptionModal
                        key={propDetail}
                        open={propDetailOpen}
                        setOpen={setPropDetailOpen}
                        value={{
                            id: propDetail.id,
                            title: propDetail.title,
                            status: propDetail.status ,//propDetail.status, // FIXME
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
                                color={propDetail.status === 2 ? 'success' : "warning"}
                                startIcon={
                                    propDetail.status === 2
                                        ? <PlaylistAddCheckIcon />
                                        : <PlaylistAddIcon />
                                }
                                onClick={() => {
                                    shortlistItem(propDetail.id)
                                    // alert('The proposal has been added to shortlist.')
                                }}
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
                                    rating: p.rating,
                                    status: p.status,   // FIXME: hardcode status
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
