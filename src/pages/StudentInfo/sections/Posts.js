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

// Material Kit 2 React components
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";
import Box from '@mui/material/Box';

// Images
import post1 from "assets/images/examples/testimonial-6-2.jpg";
import post2 from "assets/images/examples/testimonial-6-3.jpg";
import post3 from "assets/images/examples/blog-9-4.jpg";
import post4 from "assets/images/examples/blog2.jpg";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import React from "react";

const Posts = () => {
  // hooks
  const axiosPrivate = useAxiosPrivate();
  const { id: id } = useParams();

  // states
  const [props, setProps] = React.useState([])

  React.useEffect(() => {
    const params = new URLSearchParams({
      creatorId: id,
      pageNo: 1,
      pageSize: 30
    })
    const getReqeusts = async () =>
      await axiosPrivate.get('/proposal/list_student_profile_proposals', {
        params: params
      })
        .then(res => setProps(res.data.data.records))
        .catch(e => console.error(e))

    getReqeusts();
  }, [])

  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={7} justifyContent="flex-start">
          <MKTypography variant="h3" textTransform="uppercase" mb={1}>
            Past Proposals
          </MKTypography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          TODO
          {/* TODO load card */}
          {/* {
            props.map(p =>
              <ProposalCard
                key={p.proposalId}
                data={{
                  title: p.title,
                  status: p.status,
                  description: p.oneSentenceDescription,
                  topic: p.area,
                  authorId: p.authorId,
                  authorName: p.authorName,
                  lastModified: p.lastModifiedTime,
                  likes: p.likeNum,
                  id: p.proposalId,
                  projectName: p.projectName,
                }}
                // openDetail={() => getPropDetail(p.proposalId, p.projectName)}
              />
            )
          } */}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Posts;