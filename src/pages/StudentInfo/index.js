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

import Profile from "../StudentInfo/sections/Profile"
import Posts from "../StudentInfo/sections/Posts"
import RequestCard from "glhfComponents/RequestCard";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import { axiosPrivate } from "api/axios";
import ProfilePageLayout from "glhfComponents/ProfilePageLayout";

const sampleData = {
    name: 'Jane Wong'
}

const StudentInfoPage = () => {

    return (
      <ProfilePageLayout>
        <Profile />
        <Posts />
      </ProfilePageLayout>
    );
  }


export default StudentInfoPage