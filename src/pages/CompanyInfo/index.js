import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { BASE_URL } from 'api/axios';
import useAuth from "auth/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ProfilePageLayout from "glhfComponents/ProfilePageLayout";
// Viewing the company info including personal details and all of its project challenges
const CompanyInfoPage = () => {
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [companyInfo, setCompanyInfo] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      await axiosPrivate.get(`/user/get_profile_info`, {
        params: new URLSearchParams({
          id: params.id
        })
      })
        .then(res => {
          const newCompanyInfo = { ...companyInfo }
          newCompanyInfo.companyName = res.data.data.fullName
          newCompanyInfo.companyId = params.id
          setCompanyInfo(newCompanyInfo)
      })
      .catch(e => {
        console.error(e)
      })
    }
    fetchData()
  }, [params.id])
  return (
    <ProfilePageLayout>
      <Profile companyInfo={ companyInfo } />
      <Posts />
    </ProfilePageLayout>
  );
}
export default CompanyInfoPage;