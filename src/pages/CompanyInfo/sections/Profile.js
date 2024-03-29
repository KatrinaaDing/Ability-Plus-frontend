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
import { Link, useNavigate, useParams } from "react-router-dom";

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
import profilePicture from "assets/images/profile-avatars/company.png";
import { Axios } from "axios";
import useAxiosBasic from "hooks/useAxiosBasic";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import axios from "axios";
import { BASE_URL } from 'api/axios';
import StatusDateDueSearchFilter from "glhfComponents/DateSearchFilter";

function Profile({ companyInfo }) {
  const {auth, setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [followText, setFollowText] = useState('Follow');
  const [companyId, setCompanyId] = useState(0);


  const params = useParams();
  const {id} = params;
  const [email, setEmail] = useState("")
  const [des, setDes] = useState("")
  const [companyName, setCompanyName] = useState("")
  console.log(companyName)
  console.log(email)
  /* Get companyInfo by id */
  useEffect(() => {
    const getProfile = async() =>
      await axiosPrivate.get(`/user/get_profile_info?id=${Number(id)}`)
        .then(res => {
          // if (res.data.data.extraData)
          //   setEmail(JSON.parse(res.data.data.extraData).email)
            setDes(JSON.parse(res.data.data.extraData).des)
          setCompanyName(res.data.data.fullName)
          // setEmail(res.data.data.account)
          setEmail(JSON.parse(res.data.data.extraData)?.email || res.data.data.account || '')
        })
        .catch(e => console.error(e))

    getProfile();
  }, [])


  useEffect(() => {
    const getFollowing = async () =>
      await axios.get(`${BASE_URL}/student_following/all`, {
          headers: {
            token: auth.accessToken
          }
        })
        .then(res => {
          let follow = false
          for (const { _, companyId, __} of res.data.data) {
            if (companyId === parseInt(companyInfo.companyId)) {
              follow = true
            }
          }
          setFollowText(follow ? 'Unfollow': 'Follow')
        })
        .catch(e => {
          console.error(e)
        })

    setCompanyId(companyInfo.companyId)
    getFollowing()
  }, [companyInfo.companyId])

  const handleFollow = async () => {
    console.log(companyId)
    if (followText !== 'Unfollow') {
      await axiosPrivate.post(`/student_following/${companyId}`)
        .then(res => {
          setFollowText('Unfollow')
        })
        .catch(e => console.error(e))
    } else {
      await axiosPrivate.delete(`/student_following/${companyId}`)
        .then(res => {
          setFollowText('Follow')
        })
        .then(e => console.error(e))
    }
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
                  {companyName}
                </MKTypography>
                {!auth.isCompany && 
                  <MKButton variant={followText === 'Follow' ? 'outlined' : 'contained'} color="error" size="small" onClick={ handleFollow}>
                  { followText }
                </MKButton> 
                }
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Contact Email&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                  {email === '' ? 'This company has not added the contact email yet': email}&nbsp;&nbsp;&nbsp;
                  </MKTypography>
                </Grid>
              </Grid>
              <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Description&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {des === '' ? 'This company has not added the description yet': des}&nbsp;&nbsp;&nbsp;
                  </MKTypography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>   
      </Container>
    </MKBox>
  );
}

export default Profile;