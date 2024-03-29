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

//Other components
import useAuth from "auth/useAuth";
import companyProfilePicture from "assets/images/profile-avatars/company.png";
import studentProfilePicture from "assets/images/profile-avatars/student.png";
import axios, { Axios } from "axios";
import useAxiosBasic from "hooks/useAxiosBasic";
import { axiosPrivate } from "api/axios";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import md5 from "md5";

function Profile() {

  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  //Profile edit modal show or not
  const [show, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!show);
  }
  // Password change modal show or not
  const [pShow, setPShow] = useState(false);

  const [emailErr, setEmailErr] = useState(false);

  const pwdChangeModal = () => {
    setPShow(!pShow);
  }
  //Params of Profile edit
  const [userName, setUserName] = useState("");
  const [des, setDes] = useState("");
  const [age, setAge] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [alertStr, setAlertStr] = useState("");
  const [sAlertStr, setSAlertStr] = useState("");
  const [fullName, setFullName] = useState("");
  const [cEmail, setCEmail] = useState(localStorage.getItem("cEmail"));
  const [cAge, setCAge] = useState(localStorage.getItem("cAge"));
  const [cDes, setCDes] = useState(localStorage.getItem("cDes"));

  //Params of Password change
  const [oldPwd, setOldPwd] = useState("")
  const [newPwd, setNewPwd] = useState("")

  console.log(cAge)
  useEffect(() => {
    const getInfo = async () =>
      await axiosPrivate.get("/user/view_own_profile_info")
        .then(res => {
          if (res.data.data.extraData === null) {
            setCEmail(res.data.data.account||"sample@email.com");
            setUserEmail(res.data.data.account||'sample@email.com');
            setCDes("Please introduce yourself");
            setDes("?");
            setAge("?");
            setCAge("?");
            return;
          }
          if (res.data.data.fullName) {
            setAuth({
              username: res.data.data.fullName,
              isCompany: auth.isCompany,
              accessToken: auth.accessToken
            })
          }
          if (JSON.parse(res.data.data.extraData).email === null || JSON.parse(res.data.data.extraData).email === '') {
            setCEmail(res.data.data.account||"sample@email.com");
            setUserEmail(res.data.data.account||'sample@email.com');
          } else {
            setCEmail(JSON.parse(res.data.data.extraData).email)
          }
          if (JSON.parse(res.data.data.extraData).des === null || JSON.parse(res.data.data.extraData).des == '') {
            setCDes("Please introduce yourself");
            setDes("Please introduce yourself");
          } else {
            setCDes(JSON.parse(res.data.data.extraData).des)
          }
          if (JSON.parse(res.data.data.extraData).age === null || JSON.parse(res.data.data.extraData).age == '') {
            setCAge("?")
            setAge("?");

          } else {
            setCAge(JSON.parse(res.data.data.extraData).age)
          }

        })
        .catch(e => console.error(e))

    getInfo()
  }, [])

  //Profile edit func
  const changeProfile = (event) => {
    setAlertStr('')
    setEmailErr(false)
    const body = {
      "extraData": {
        "des": des.des == '' ? '' : des.des || cDes,
        "age": age.age == '' ? '' : age.age || cAge,
        "email": userEmail.userEmail == '' ? '' : userEmail.userEmail || cEmail,
      },
      "userName": userName.userName || auth.username,
/*       "account": account.account */
    }
    /*     console.log(body)
        console.log(JSON.stringify(body))
        console.log(userName.userName)
        console.log(auth.username)
        console.log(cAge)
        console.log(cDes)
        console.log(cEmail) */
    if (!validateInput(body.extraData.email))
      return
    if (Object.is(event.target.name, "save")) {
      axiosPrivate.post("/user/edit_own_profile_info", body)
        .then(function (res) {
          console.log("response:", res);
          if (userName.userName === '') {
            return setAlertStr("Username is empty")
          }

          if (res.code == 201) {
            return setAlertStr(res.data.message)
          }
          localStorage.setItem("cDes", body.extraData.des)
          localStorage.setItem("cAge", body.extraData.des)
          localStorage.setItem("cEmail", body.extraData.account)
          localStorage.setItem("userName", userName.userName)

          setAuth({
            username: userName.userName,
            isCompany: auth.isCompany,
            accessToken: auth.accessToken
          })
          setSAlertStr("Success!")
        })
        .catch(err => {
          if (err !== undefined && err.response !== undefined && err.response.data !== undefined) {
            return setAlertStr(err.res.data.error);
          }
          else {
            return setAlertStr("Failed to change profile")
          }
        })
    }
    setTimeout(function () {
      setAlertStr("")
      window.location.reload()
    }, 800);

  }

  //Password change func
  const pwdChange = (event) => {

    const body = {
      oldPassword: md5(oldPwd.oldPwd),
      newPassword: md5(newPwd.newPwd)
    }
    if (Object.keys(oldPwd).length === 0) {
      return setAlertStr("Old password is empty!")
    }
    else if (Object.keys(newPwd).length === 0) {
      return setAlertStr("New password is empty!")
    }
    else if (Object.is(oldPwd.oldPwd, newPwd.newPwd)) {
      return setAlertStr("There is no change of password!")
    }
    else if (newPwd.newPwd.length < 8) {
      return setAlertStr("Password has to be longer than 8 characters!")
    }
    else if (Object.is(event.target.name, "changePwd")) {
      axiosPrivate.post("/user/change_password", body)
        .then(res => {
          if (res.status == 200) {
            return setSAlertStr("Success!")
          }
        })
        .catch(err => {
          if (err !== undefined && err.res !== undefined && err.res.data !== undefined) {
            return setAlertStr(err.res.data.error);
          }
          else {
            return setAlertStr("Old password is incorrect!")
          }
        })
    }
    setTimeout(() => {
      setAlertStr("")
      window.location.reload()
    }, 800);
  }

  const validateInput = (userEmail) => {
    let valid = true
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!userEmail) {
      setEmailErr(true);
      valid = false;
      setAlertStr('Please enter email')
    }
    if (userEmail.length && !userEmail.match(emailReg)) {
      setEmailErr(true);
      valid = false;
      setAlertStr('Please enter email in correct format!')
    }
    return valid
  }

  //Profile edit related params onChange 
  const updateUserName = e => {
    const userName = e.target.value
    setUserName({ userName })
    localStorage.setItem("userName", userName)
  }

  const updateUserEmail = e => {
    const userEmail = e.target.value
    setUserEmail({ userEmail })
    setAlertStr('')
    setEmailErr(false)
    localStorage.setItem("cEmail", userEmail)
  }

  const updateUserDes = e => {
    const des = e.target.value
    setDes({ des });
    localStorage.setItem("cDes", des)
  }

  const updateUserAge = e => {
    const age = e.target.value
    setAge({ age });
    localStorage.setItem("cAge", age)
  }

  //Password change related params onChange
  const updateOldPwd = e => {
    const oldPwd = e.target.value
    setOldPwd({ oldPwd })
  }
  const updateNewPwd = e => {
    const newPwd = e.target.value
    setNewPwd({ newPwd })
  }


  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={auth.isCompany ? companyProfilePicture : studentProfilePicture} alt="Burce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">
                  {auth.username}
                </MKTypography>
                <MKButton variant="outlined" color="info" size="small" onClick={toggleModal}>
                  Edit Profile
                </MKButton>
              </MKBox>

              <Grid item>
                <MKTypography component="span" variant="body2" fontWeight="bold">
                  Contact Email&nbsp;&nbsp;
                </MKTypography>
                <MKTypography component="span" variant="body2" color="text">
                  {cEmail!== null? cEmail: 'NA'}&nbsp;&nbsp;&nbsp;
                </MKTypography>
              </Grid>

              <Grid item>
              {!auth.isCompany && 
                <>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                  Age&nbsp;&nbsp;
                </MKTypography>
                <MKTypography component="span" variant="body2" color="text">
                  {cAge === null? 'NA': cAge}
                </MKTypography>
                </>
              }
              </Grid>
              <Grid item>
                <MKTypography component="span" variant="body2" fontWeight="bold">
                  Description&nbsp;&nbsp;
                </MKTypography>
                <MKTypography variant="body2" component="span" fontWeight="light" color="text">
                  {cDes !== null ? cDes: 'NA'}
                </MKTypography>
              </Grid>
              <br />
              <MKButton variant="outlined" color="error" size="medium" onClick={pwdChangeModal}>
                Password Change
              </MKButton>
            </Grid>
          </Grid>
        </Grid>
        {/* Profile edit modal */}
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
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

              <Collapse in={sAlertStr != ""}>
                <MKAlert color="success" style={{ zIndex: '100' }}>{sAlertStr}</MKAlert>
              </Collapse>

              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                <MKTypography variant="h5">Profile Edit</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox component="form" role="form" p={2} py={12}>
                <Grid container item xs={12}>
                  <MKInput label="Username" fullWidth defaultValue={auth.username} onChange={updateUserName} />
                </Grid>
                <br />
                <Grid container item xs={12}>
                  <MKInput type="email" label="Contact Email (by default is your account email)" error={emailErr} onChange={updateUserEmail} defaultValue={cEmail} fullWidth />
                </Grid>
                <br />
                {!auth.isCompany && 
                  <>
                  <Grid container item xs={12}>
                    <MKInput label="Age" fullWidth defaultValue={cAge} onChange={updateUserAge} />
                  </Grid>
                  <br />
                  </>
                } 
                
                <Grid container item xs={12}>
                  <MKInput label="Description" multiline fullWidth onChange={updateUserDes} defaultValue={cDes} rows={6} />
                </Grid>
              </MKBox>
              <Divider sx={{ my: 0 }} />
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

        {/* Password change modal */}
        <Modal open={pShow} onClose={pwdChangeModal} sx={{ display: "grid", placeItems: "center" }}>

          <Slide direction="down" in={pShow} timeout={500}>
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
              <Collapse in={sAlertStr != ""}>
                <MKAlert color="success" style={{ zIndex: '100' }}>{sAlertStr}</MKAlert>
              </Collapse>
              <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                <MKTypography variant="h5">Password Change</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={pwdChangeModal} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox component="form" role="form" p={2} py={12}>
                <Grid container item xs={12}>
                  <MKInput type="password" label="Old Password" onChange={updateOldPwd} fullWidth />
                </Grid>
                <br />
                <Grid container item xs={12}>
                  <MKInput type="password" label="New Password" onChange={updateNewPwd} fullWidth />
                </Grid>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton variant="gradient" color="light" onClick={pwdChangeModal}>
                  Cancel
                </MKButton>
                <MKButton variant="gradient" color="info" name="changePwd" onClick={pwdChange}>
                  Submit
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