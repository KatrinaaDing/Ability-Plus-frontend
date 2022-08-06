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
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";

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
import profilePicture from "assets/images/profile-avatars/student.png";
import { Axios } from "axios";
import useAxiosBasic from "hooks/useAxiosBasic";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ProposalCard from "glhfComponents/ProposalCard";

function Profile() {

  const axiosBasic = useAxiosBasic();
  const {auth, setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();


  const params = useParams();
  const {id} = params;
  const [des, setDes] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [studentName, setStudentName] = useState("")

  /* Get studentInfo by id */
  useEffect(() => {
    const getInfo = async () => 
      await axiosPrivate.get(`/user/get_profile_info?id=${id}`)
        .then(res => {
          setDes(JSON.parse(res.data.data.extraData)?.des || '')
          setAge(JSON.parse(res.data.data.extraData)?.age || '')
          setEmail(JSON.parse(res.data.data.extraData)?.email || '')
          setStudentName(res.data.data.fullName)
          console.log(des, age, email, studentName)
        })
        .catch(e => console.error(e))
    getInfo()
  }, [])

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
                  {studentName}
                </MKTypography>

{/*                 <MKButton variant="outlined" color="info" size="small">
                  Follow
                </MKButton> */}
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <div>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                    Contact Email&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {email}&nbsp;&nbsp;&nbsp;
                  </MKTypography>
                  </div>
                  <div>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                    Age&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {age === ''? 'NA':age}
                  </MKTypography>
                  </div>
                  <div>
                    <MKTypography component="span" variant="body2" fontWeight="bold">
                      Description&nbsp;&nbsp;
                      </MKTypography>
                    <MKTypography variant="body1" component="span" fontWeight="light" color="text">
                      {des === '' ? 'NA': des}
                    </MKTypography>
                  </div>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Grid>   
      </Container>
    </MKBox>
  );
}

export default Profile;