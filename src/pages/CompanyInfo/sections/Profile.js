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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import Collapse from "@mui/material/Collapse";
import MKAlert from "components/MKAlert";
import AlertModal from "glhfComponents/AlertModal";
import Box from '@mui/material/Box';

//Other components
import useAuth from "auth/useAuth";
import profilePicture from "assets/images/bruce-mars.jpg";
import { Axios } from "axios";
import useAxiosBasic from "hooks/useAxiosBasic";
import { axiosPrivate } from "api/axios";


function Profile() {

  const axiosBasic = useAxiosBasic();
  const {auth, setAuth} = useAuth();

  const navigate = useNavigate();

  const sampleData = {
    name: 'Google',
    email: "google@gmail.com"
  }

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">
                  {sampleData.name}
                </MKTypography>
                <MKButton variant="outlined" color="error" size="small">
                    Follow
                </MKButton> 
{/*                 <MKButton variant="outlined" color="info" size="small">
                  Follow
                </MKButton> */}
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Contact Email&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {sampleData.email}&nbsp;&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Tel&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    xxxx xxxx
                  </MKTypography>
                </Grid>
              </Grid>
              <MKTypography component="span" variant="body2" fontWeight="bold">
                Description&nbsp;&nbsp;
              </MKTypography>
              <MKTypography variant="body1" component="span" fontWeight="light" color="text">
                Google Company
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>   
      </Container>
    </MKBox>
  );
}

export default Profile;