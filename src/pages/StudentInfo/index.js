import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "auth/useAuth";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';


import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import bgImage from "assets/images/city-profile.jpg";
import Profile from "../StudentInfo/sections/Profile"
import Posts from "../StudentInfo/sections/Posts"
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";

const sampleData = {
    name: 'Jane Wong'
}

const StudentInfoPage = () => {

    const {auth} = useAuth();
    const title = auth.isCompany ? 'Company' : 'Student';
  
    return (
      <BasicPageLayout title = {title + " Info "}>
        <MKBox bgColor="white">
          <MKBox
            minHeight="25rem"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.8),
                  rgba(gradients.dark.state, 0.8)
                )}, url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Profile />
          </Card>
        </MKBox>
        <Posts />
      </BasicPageLayout>
    );
  }


export default StudentInfoPage