/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: The approved of a student. Show in student user info page
 */

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";


import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import React from "react";
import ProposalCard from "glhfComponents/ProposalCard";
import useAuth from "auth/useAuth";
import ProposalDescriptionModal from "glhfComponents/ProposalDescriptionModal";
import LikeButton from "glhfComponents/LikeButton";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import EndlessScroll from "glhfComponents/EndlessScroll";
import DateSearchFilter from 'glhfComponents/DateSearchFilter';
import CardCounters from "glhfComponents/CardCounter";


const PAGE_SIZE = 30

const Posts = () => {
  // hooks
  const axiosPrivate = useAxiosPrivate();
  const { id: id } = useParams();
  const { auth } = useAuth();

  // states
  const [props, setProps] = React.useState([])
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailContent, setDetailContent] = React.useState()
  // request states
  const [reqDetail, setReqDetail] = React.useState()
  const [reqOpen, setReqOpen] = React.useState(false)
  // pagination
  const [numPage, setNumPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  //filter states
  const [searchKey, setSearchKey] = React.useState('')
  const [ascending, setAscending] = React.useState(false);

  const handleDate = (ascending) => {
    setAscending(ascending)
  }
  const handleSearch = (key) => {
    setSearchKey(key);
  }
  
  /**
* Fetching a list of request card
* @param {integer} pageNo page number to fetch
* @param {boolean} newList determine if is to fetch a new card list (like changing status)
*/
  const fetchData = (pageNo, newList) => {
    const params = new URLSearchParams({
      creatorId: id,
      isAscendingOrderLastModifiedTime: ascending,
      searchKey: searchKey,
      pageNo: 1,
      pageSize: 30
    })
    axiosPrivate.get('/proposal/list_student_proposal', {
        params: params
      })
        .then(res => {
          if (newList)
            setProps(res.data.data.records)
          else
            setProps([...props].concat(res.data.data.records))
          if (pageNo * PAGE_SIZE >= res.data.data.total)
            setHasMore(false)
          else
            setHasMore(true)
          setNumPage(pageNo)
          setTotal(res.data.data.total)
        })
        .catch(e => console.error(e))
  }

  React.useEffect(() => {
    fetchData(1, true)
  }, [searchKey, ascending])

  const handleOpenDetail = async (id, projectName) => {
    // if no login info, navigate to login
    if (!auth || Object.keys(auth).length === 0) {
      setAlertOpen(true)

    } else {
      await axiosPrivate.get(`/proposal/get_proposal_detail_info?proposalId=${id}`,)
        .then(res => {
          axiosPrivate.get(`/user_proposal_like_record/already_like?proposalId=${id}`)
            .then(liked => {
              const prop = res.data.data
              prop.extraData = JSON.parse(prop.extraData)
              setDetailContent({
                id: prop.id,
                liked: liked.data.data,
                title: prop.title,
                status: prop.status,
                desc: prop.oneSentenceDescription,
                prob: prop.extraData.problemStatement,
                vStat: prop.extraData.visionStatement,
                goal: prop.extraData.goal,
                detail: prop.extraData.detail,
                likeNum: prop.likeNum,
                metaData: {
                  lastModified: prop.lastModifiedTime,
                  authorName: prop.creatorName,
                  authorId: prop.creatorId,
                  project: projectName,
                  openProject: () => getReqDetail(prop.projectId)
                }
              })
              setDetailOpen(true)
            })
            .catch(e => console.error(e))
        })
        .catch(e => console.error(e))
    }
  }

  const getReqDetail = async (projectId) =>
    await axiosPrivate.get(`/project/get_project_info?id=${projectId}`)
      .then(res => setReqDetail({ ...res.data.data, id: projectId }))
      .then(res => setReqOpen(true))
      .catch(e => console.error(e))


  return (
    <MKBox component="section" py={2}>
      {
        // render proposal detail when it's fetched
        detailContent &&
        <ProposalDescriptionModal
          open={detailOpen}
          setOpen={setDetailOpen}
          value={detailContent}
          actionButton={
            <LikeButton
              originLike={detailContent.liked}  
              originNumLike={detailContent.likeNum}
              propId={detailContent.id}
            />
          }
        />
      }
      {
        reqDetail &&
        <RequestDescriptionModal
          open={reqOpen}
          setOpen={setReqOpen}
          value={{
            id: reqDetail.id,
            title: reqDetail.name,
            status: reqDetail.status,
            category: reqDetail.projectArea,
            propDdl: new Date(reqDetail.proposalDdl * 1000),
            soluDdl: new Date(reqDetail.solutionDdl * 1000),
            description: reqDetail.description,
            requirement: JSON.parse(reqDetail.extraData).requirement,
            rewards: JSON.parse(reqDetail.extraData).rewards,
            metaData: {
              lastModified: new Date(reqDetail.lastModifiedTime * 1000),
              authorName: reqDetail.creatorName,
              authorId: reqDetail.creatorId
            }
          }}
          actionButton={<></>}
        />
      }
      <Container>
        <Grid container item xs={12} lg={7} justifyContent="flex-start">
          <MKTypography variant="h3" textTransform="uppercase" mb={1}>
            Past Proposals
          </MKTypography>
        </Grid>
        <CardCounters status='approved' total={total} type='proposal'/>
        <DateSearchFilter handleDate={handleDate} handleSearch={handleSearch}></DateSearchFilter>
        <EndlessScroll
          dataLength={props.length}
          next={() => fetchData(numPage + 1, false)}
          hasMore={hasMore}
        >
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            props.map(p =>
              <ProposalCard
                key={p.proposalId}
                color="light"
                data={{
                  title: p.title,
                  status: p.status,
                  description: p.oneSentenceDescription,
                  topic: p.area,
                  // authorName: p.authorName,
                  lastModified: p.lastModifiedTime,
                  likes: p.likeNum,
                  id: p.proposalId,
                  projectName: p.projectName,
                }}
                openDetail={() => handleOpenDetail(p.proposalId, p.projectName)}
              />
            )
          }
        </Grid>
        </EndlessScroll>
      </Container>
    </MKBox>
  );
}

export default Posts;