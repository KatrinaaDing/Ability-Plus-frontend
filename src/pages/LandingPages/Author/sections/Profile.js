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

//Other components
import useAuth from "auth/useAuth";
import profilePicture from "assets/images/bruce-mars.jpg";
import { Axios } from "axios";
import useAxiosBasic from "hooks/useAxiosBasic";
import { axiosPrivate } from "api/axios";


function Profile() {

  const axiosBasic = useAxiosBasic();
  const {auth, setAuth} = useAuth();
  const user = auth.username;

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  const [userName, setUserName] = useState("");
  const [des, setDes] = useState("");
  const [age, setAge] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [alertStr, setAlertStr] = useState("");
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const navigate = useNavigate();

  const changeProfile = (event) => {

    const body = {
      extraData: {
        des: des.des,
        age: age.age,
        email: userEmail.userEmail,
      },
      newPassword: newPwd.newPwd,
      oldPassword: oldPwd.oldPwd,
      userName: userName.userName
    }
    console.log(body)
    console.log(JSON.stringify(body))

    if (Object.is(event.target.name, "save")) {
      axiosPrivate.post("/user/edit_own_profile_info", body)
        .then(function (response) {
          console.log("response:", response);
          if (response.code == 201) {
            return setAlertStr(response.data.message);
          }
        })
        .catch (err => {
          setAlertStr(response.data.message)
        })
    }
    setTimeout(function () {
      setAlertStr("");
    }, 3000);  
  }

  const updateUserName = e => {
    const userName = e.target.value
    setUserName({userName})
  }

  const updateUserEmail = e => {
    const userEmail = e.target.value
    setUserEmail ({userEmail})
  }

  const updateUserDes = e => {
    const des = e.target.value
    setDes({des})
  }

  const updateUserAge = e => {
    const age = e.target.value
    setAge({age})
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
                  {userName.userName}
                </MKTypography>
                <MKButton variant="outlined" color="info" size="small" onClick={toggleModal}>
                  Edit Profile
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
                    {userEmail.userEmail}&nbsp;&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Age&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {age.age}
                  </MKTypography>
                </Grid>
              </Grid>
              <MKTypography component="span" variant="body2" fontWeight="bold">
                Description&nbsp;&nbsp;
              </MKTypography>
              <MKTypography variant="body1" component="span" fontWeight="light" color="text">
                {des.des}
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{display:"grid", placeItems:"center"}}>
 
            <Slide direction="down" in={show} timeout={500}>
                <MKBox
                    position="relative"
                    width="30%"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"    
                >
                <Collapse in={alertStr != ""}>
                  <MKAlert color="error" style={{ zIndex: '100' }} dismissible>{alertStr}</MKAlert>                     
                </Collapse>   
                    <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                        <MKTypography variant="h5">Profile Edit</MKTypography>
                        <CloseIcon fontSize="medium" sx={{ cursor:"pointer" }} onClick={toggleModal} />
                    </MKBox>
                    <Divider sx={{my: 0}} />
                    <MKBox component="form" role="form" p={2} py={12}>
{/* The 'value' of Input should be parameters which have state change. */}                               
                        <Grid container item xs={12}>
                            <MKInput label="Username" fullWidth defaultValue={userName.userName} onChange={updateUserName} />
                        </Grid>     
                        <br />
                        <Grid container item xs={12}>
                            <MKInput type="email" label="Contact Email" onChange={updateUserEmail} defaultValue={userEmail.userEmail} fullWidth />
                        </Grid> 
                        <br />
                        <Grid container item xs={12}>
                            <MKInput label="Age" fullWidth defaultValue={age.age} onChange={updateUserAge} />
                        </Grid>    
                        <br />
                        <Grid container item xs={12}>
                            <MKInput label="Description" multiline fullWidth onChange={updateUserDes} defaultValue={des.des} rows={6} />
                        </Grid>                                                           
                    </MKBox>
                    <Divider sx={{my: 0}} />
                    <MKBox display="flex" justifyContent="space-between" p={1.5}>
                        <MKButton variant="gradient" color="light" onClick={toggleModal}>
                        Cancel
                        </MKButton>
                        <MKButton variant="gradient" color="info" name="save" onClick={changeProfile}>
                        Save
                        </MKButton>
                    </MKBox>                            
                </MKBox>
            </Slide>
        </Modal>     
      </Container>
    </MKBox>
  );
}

export default Profile;