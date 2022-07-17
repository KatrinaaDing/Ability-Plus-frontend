import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';

import CloseIcon from "@mui/icons-material/Close";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";


import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import Profile from "../CompanyInfo/sections/Profile";
import Posts from "../CompanyInfo/sections/Posts";
import profilePicture from "assets/images/bruce-mars.jpg";
import bgImage from "assets/images/city-profile.jpg";

const sampleData = {
    name: 'Google'
}

const CompanyInfoPage = () => {

    return (
        <BasicPageLayout title = {sampleData.name}>
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
            <Posts />
          </Card>
        </MKBox>
      </BasicPageLayout>
    );
  }

export default CompanyInfoPage