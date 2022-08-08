/**
 * Author: Ziqi Ding
 * Created At: 25 Jul 2022
 * Discription: The released project of a company. Show in company user info page
 */

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import RequestCard from "glhfComponents/RequestCard";


import React from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import useAuth from "auth/useAuth";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import { statusBank } from "utils/getStatus";
import MKButton from "components/MKButton";
import EditIcon from '@mui/icons-material/Edit';
import EndlessScroll from "glhfComponents/EndlessScroll";
import StatusDateDueSearchFilter from "glhfComponents/StatusDateDueSearchFilter";
import CardCounters from "glhfComponents/CardCounter";

const PAGE_SIZE = 30

const Posts = () => {
  // hooks
  const axiosPrivate = useAxiosPrivate();
  const { id: id } = useParams();
  const { auth } = useAuth();
  // states
  const [requests, setRequests] = React.useState([])
  const [reqOpen, setReqOpen] = React.useState(false);
  const [reqDetail, setReqDetail] = React.useState();
  //pagination
  const [numPage, setNumPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  // filter states
  const [ascending, setAscending] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [searchKey, setSearchKey] = React.useState('');
  const [whatOrder, setWhatOrder] = React.useState('SolutionDue');

  const handleDate = (ascending) => {
    setAscending(ascending)
  }
  const handleStatus = (status) => {
    console.log(status)
    setStatus(status)
  }
  const handleSearch = (key) => {
    setSearchKey(key);
  }

  const handleWhatOrder = (order) => {
    setWhatOrder(order);
  }

  /**
 * Fetching a list of request card
 * @param {integer} pageNo page number to fetch
 * @param {boolean} newList determine if is to fetch a new card list (like changing status)
 */
  const fetchData = (pageNo, newList) => {
    const params = new URLSearchParams({
      creatorId: id,
      isAscendingOrderTime: ascending,
      isAscendingOrder: whatOrder,
      status: status,
      searchKey: searchKey,
      pageNo: pageNo,
      pageSize: PAGE_SIZE
    })
    axiosPrivate.get('/project/list_company_project_request', {
      params: params
    })
      .then(res => {
        if (newList)
          setRequests(res.data.data.records)
        else
          setRequests([...requests].concat(res.data.data.records))
        if (pageNo * PAGE_SIZE >= res.data.data.total)
          setHasMore(false)
        else
          setHasMore(true)
        setNumPage(pageNo)
        setTotal(res.data.data.total)
      })
      .catch(e => console.error(e))
    // const params = new URLSearchParams({
    //   companyId: id,
    //   pageNo: pageNo,
    //   pageSize: PAGE_SIZE
    // })
    // axiosPrivate.get('/project/list_company_profile_project_request', {
    //     params: params
    //   })
    //     .then(res => {
    //       setRequests([...requests].concat(res.data.data.records))
    //       if (pageNo * PAGE_SIZE >= res.data.data.total)
    //         setHasMore(false)
    //       else
    //         setHasMore(true)
    //       setNumPage(pageNo)
    //       setTotal(res.data.data.total)
    //     })
    //     .catch(e => console.error(e))
  }


  React.useEffect(() => {
    fetchData(1, true)
  }, [ascending, status, whatOrder, searchKey])

  const getReqDetail = async (reqId) =>
    await axiosPrivate.get(`/project/get_project_info?id=${reqId}`)
      .then(async (res) => {
        // for student user, fetch if he can submit proposal
        if (!auth.isCompany)
          await axiosPrivate.get(`/proposal/can_submit_proposal?projectId=${reqId}`)
            .then(canProcess =>
              setReqDetail({
                ...res.data.data,
                id: reqId,
                mySubmittedProposal: canProcess.data.data
              })
            )
            .catch(e => console.error(e))

        // for company user, if he is author, fetch if he can edit request
        else if (auth.isCompany && res.data.data.creatorName === auth.username)
          await axiosPrivate.get('/project/can_edit_project', {
            params: new URLSearchParams({
              projectId: reqId
            })
          })
            .then(canEdit =>
              setReqDetail({
                ...res.data.data,
                id: reqId,
                canEdit: canEdit.data.data,
              })
            )
            .catch(e => console.error(e))
        
        // for other cases
        else
          setReqDetail({ ...res.data.data, id: reqId })
      })
      .then(res => setReqOpen(true))

      .catch(e => console.error(e))


  return (
    <MKBox component="section" py={2}>
      {
        // mount modal only when detail is loaded
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
            canEdit: reqDetail.canEdit,
            metaData: {
              lastModified: new Date(reqDetail.lastModifiedTime * 1000),
              authorName: reqDetail.creatorName,
              authorId: reqDetail.creatorId
            }
          }}
          actionButton={
                // allow student submission when open for proposal
                !auth.isCompany &&
                reqDetail.status === statusBank.request.proposal.label &&
                (
                  reqDetail.mySubmittedProposal <= 0
                    ? <MKButton
                      variant="gradient"
                      color='success'
                      onClick={() => window.open(`/create-proposal/${reqDetail.name}/${reqDetail.id}`)}
                    >
                      Create Proposal
                    </MKButton>
                    : <MKButton
                      variant="gradient"
                      color="info"
                      startIcon={<EditIcon />}
                      onClick={() => window.open(`/edit-proposal/${reqDetail.name}/${reqDetail.mySubmittedProposal}`)}
                      sx={{ ml: 2 }}
                    >
                      Edit My Proposal
                    </MKButton>
                )
          }
        />
      }
      <Container>
        <Grid container item xs={12} lg={7} justifyContent="flex-start">
          <MKTypography variant="h3" textTransform="uppercase" mb={1}>
            Released Challenges
          </MKTypography>
        </Grid>
        <CardCounters status={status} total={total} type='request'/>
        <StatusDateDueSearchFilter handleStatus={handleStatus} handleDate={handleDate} handleWhatOrder={handleWhatOrder} handleSearch={handleSearch} type='request' userType='public'></StatusDateDueSearchFilter>

        <EndlessScroll
          dataLength={requests.length}
          next={() => fetchData(numPage+1, false)}
          hasMore={hasMore}
        >
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            requests.map(r =>
              <RequestCard
              key={r.id}
              color='light'
              data={{
                ...r,
              }}
              openDetail={() => getReqDetail(r.id)}
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