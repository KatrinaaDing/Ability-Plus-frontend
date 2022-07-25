/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import RequestCard from "glhfComponents/RequestCard";

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
import Box from '@mui/material/Box';

// Images
import post1 from "assets/images/examples/testimonial-6-2.jpg";
import post2 from "assets/images/examples/testimonial-6-3.jpg";
import post3 from "assets/images/examples/blog-9-4.jpg";
import post4 from "assets/images/examples/blog2.jpg";
import React from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import useAuth from "auth/useAuth";
import RequestDescriptionModal from "glhfComponents/RequestDescriptionModal";
import { statusBank } from "utils/getStatus";

const Posts = () => {
  // hooks
  const axiosPrivate = useAxiosPrivate();
  const { id: id } = useParams();
  const { auth } = useAuth();
  // states
  const [requests, setRequests] = React.useState([])
  const [reqOpen, setReqOpen] = React.useState(false);
  const [reqDetail, setReqDetail] = React.useState();

  React.useEffect(() => {
    const params = new URLSearchParams({
      companyId: id,
      pageNo: 1,
      pageSize: 30
    })
    const getReqeusts = async () =>
      await axiosPrivate.get('/project/list_company_profile_project_request', {
        params: params
      })
        .then(res => setRequests(res.data.data.records))
        .catch(e => console.error(e))

    getReqeusts();
  }, [])

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
            Project Requests
          </MKTypography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            requests.map(r =>
              <RequestCard
                key={r.id}
                color='light'
                data={{
                  ...r,
                  // topic: r.area,  // FIXME need area
                }}
                openDetail={() => getReqDetail(r.id)}
              />
            )
          }
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Posts;