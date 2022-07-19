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
import { Checkbox, FormControlLabel } from "@mui/material";

const ProjectProposals = () => {
    // hooks
    const { reqName: projectName, reqId: projectId } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    
    // search bar states
    const [isPick, setIsPick] = useState(0);
    
    // display states
    const [propCards, setPropCards] = useState([]);
    const [total, setTotal] = useState(0);
    const [propDetail, setPropDetail] = useState(null);
    const [propDetailOpen, setPropDetailOpen] = useState(false);

    // select states
    const [selectMode, setSelectMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

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
                // FIXME let everything unviewed. this only for demo, hard code status to unviewed
                const initialSelected = {}
                data.records.forEach((item, idx, arr) => {
                    arr[idx].status = 0
                    initialSelected['select-'+arr[idx].id] = Boolean(arr[idx].status)
                }) 
                setSelectedItem(initialSelected)
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
    
    const shortlistItem = (id, toShortList) => {
        // change propcards and details
        const toShortlist = propCards.find(e => e.id === id);
        const idx = propCards.indexOf(toShortlist)
        toShortlist.status = toShortList ? 2 : 1;
        const newPropCards = [...propCards]
        newPropCards[idx] = toShortlist

        const newDetail = { ...propDetail }
        newDetail.status = toShortList ? 2 : 1
        setPropDetail(newDetail)
        setPropCards(newPropCards);
        // setIsPick(Number(!isPick))  //FIXME revert is pick status

        // change selectedItem
        setSelectedItem({ ...selectedItem, [`select-${id}`]: toShortList })

    }

    const handleSelect = (e) => {
        setSelectedItem({ ...selectedItem, [e.target.name]: e.target.checked })
    }

    const commitSelect = (e) => {
        const newPropCards = [...propCards]

        Object.keys(selectedItem).forEach(key => {
            if (selectedItem[key]) {
                const id = parseInt(key.split('-')[1]);
                const toShortlist = propCards.find(e => e.id === id);
                const idx = propCards.indexOf(toShortlist)
                toShortlist.status = 2;
                newPropCards[idx] = toShortlist
            }
            else {
                const id = parseInt(key.split('-')[1]);
                const toShortlist = propCards.find(e => e.id === id);
                const idx = propCards.indexOf(toShortlist)
                toShortlist.status = 0;
                newPropCards[idx] = toShortlist
            }
        })

        setPropCards(newPropCards)
        setSelectMode(false);
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
            <MKBox
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    py: 3
                }}                
            >
                <MKTypography variant='subtitle1'>
                    There {total <= 1 ? 'is' : 'are'} {total} proposal{total > 1 ? 's' : ''}
                </MKTypography>
                {
                    !selectMode
                        ? <MKButton variant='outlined' color='info' onClick={() => setSelectMode(true)}> Select Mode</MKButton>
                        : (
                            <MKBox>
                                <MKButton variant='outlined' color='dark' onClick={() => setSelectMode(false)} sx={{ mx: 1 }}>Cancel</MKButton>
                                <MKButton variant='outlined' color='warning' onClick={() => commitSelect()}>Shorlisted</MKButton>
                            </MKBox>
                        )
                        
                }
                
            </MKBox>
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
                                    shortlistItem(propDetail.id, propDetail.status === 2 ? false : true)
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
                                    authorName: p.authorName,
                                    rating: p.rating,
                                    status: p.status,   // FIXME: hardcode status
                                    note: ''              // FIXME: 目前api没有返回公司的note
                                }}
                                openDetail={() => getPropDetail(p.id)}
                                secondary={
                                    selectMode 
                                        ? <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedItem[`select-${p.id}`]}
                                                    onChange={handleSelect}
                                                    name={`select-${p.id}`}
                                                />
                                            }
                                            label="Shortlisted"
                                        />
                                        : undefined
                                    
                                }
                            />
                        )
                    }
                </Grid>
            </Box>   
        </BasicPageLayout>
    );
}
export default ProjectProposals;
