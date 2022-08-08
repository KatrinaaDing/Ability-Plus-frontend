import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import ProposalRank from "glhfComponents/ProposalRank";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import useAuth from "auth/useAuth";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import LikeButton from "glhfComponents/LikeButton";
import ProjectDetailBtn from "glhfComponents/ProjectDetailBtn";
import DateSearchFilter from 'glhfComponents/DateSearchFilter';
// Showing the ranks of the project challenge after company selects outstadning proposals in the project challenge
const ProposalRanks = () => {
    const axiosPrivate = useAxiosPrivate();
    const { id: projectId } = useParams();

    const [proposals, setProposals] = useState([])
    
    // proposal and request state
    const [propDetail, setPropDetail] = useState();
    const [propDetailOpen, setPropDetailOpen] = useState(false);
    const [reqName, setReqName] = useState('');
    const [reqDetailOpen, setReqDetailOpen] = useState(false);

    // filter bar states
    const [searchKey, setSearchKey] = useState('')
    const [ascending, setAscending] = useState(false);
    //need to use request id to (requestname, status, a list of ranks)

    const handleDate = (ascending) => {
        setAscending(ascending)
    }
    const handleSearch = (key) => {
        setSearchKey(key);
    }
    useEffect( () => {
        const listApprovedProposals = async() =>
            await axiosPrivate.get(`/proposal/list_approved_project_proposals`, {
                params: new URLSearchParams({
                    isAscendingOrder: true,
                    pageNo: 1,
                    pageSize: 20,
                    projectId: projectId,
                    searchKey: searchKey
                })

            })
                .then(res => {
                    setProposals(res.data.data.records)
                })
                .catch(e => console.error(e))

        listApprovedProposals()
        
    }, [searchKey, ascending])

    const getPropDetail = async (id) => {
        await axiosPrivate.get(`/proposal/get_proposal_detail_info`, {
            params: new URLSearchParams({
                proposalId: id
            })
        })
            .then(res => {
                res.data.data.extraData = JSON.parse(res.data.data.extraData)
                setPropDetail({
                    ...res.data.data, 
                    id,
                    status: 'approved'
                    // status: 
                })
            })
            .then(res => setPropDetailOpen(true))
            .catch(e => console.error(e))
    }

    return (
        <BasicPageLayout 
            title={`View Proposal Ranking for challenge "${reqName}"`} 
            secondaryContent={
                <ProjectDetailBtn
                    setReqName={setReqName}
                    projectId={projectId}
                    open={reqDetailOpen}
                    setOpen={setReqDetailOpen}
                />
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
                            project: reqName
                        }
                    }}
                    actionButton={
                        <LikeButton 
                            originLike={false} 
                            originNumLike={propDetail.likeNum} 
                            propId={propDetail.id}
                        />
                    }
                />
            }
            <Container>
                <DateSearchFilter handleDate={handleDate} handleSearch={handleSearch}></DateSearchFilter>
                <Box sx={{ flexGrow: 1 }}>
                    <ProposalRank proposals={proposals} openDetail={getPropDetail}/>
                </Box>              
            </Container>
 
        </BasicPageLayout>
    );
}
export default ProposalRanks;