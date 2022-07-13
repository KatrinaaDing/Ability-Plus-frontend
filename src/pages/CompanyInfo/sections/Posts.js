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

function Places() {
  return (
    <MKBox component="section" py={2}>
      <Container>
      <Grid container item xs={12} lg={7} justifyContent="flex-start">
        <MKTypography variant="h5" color="error" fontWeight="bold" textTransform="uppercase" mb={1}>
            Project Requests
        </MKTypography>
        </Grid>
        <Grid container spacing={2} sx={{display:'flex', flexWrap: 'wrap'}}>
            {/* TODO request card */}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;