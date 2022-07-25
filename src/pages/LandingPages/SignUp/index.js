/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, React, useEffect } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Collapse from "@mui/material/Collapse";
import MKAlert from "components/MKAlert";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import getNavbarRoutes from "utils/getNavbarRoutes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Tabs
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import useAuth from "auth/useAuth";
import AlertModal from "glhfComponents/AlertModal";
import useAxiosBasic from "hooks/useAxiosBasic";
import md5 from "md5";


const NAME_LIMIT = 16;
const EMAIL_LIMIT = 40;
const PWD_LIMIT = 50;

function SignUpBasic() {
  // hooks
  const { auth, setAuth } = useAuth();
  const axiosBasic = useAxiosBasic();
  const navigate = useNavigate();

  // status state
  const [activeTab, setActiveTab] = useState(0);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  // input states
  const [alertStr, setAlertStr] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userConfirmPwd, setConfirmPwd] = useState("");

  // error states
  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [confirmPwdErr, setConfirmPwdErr] = useState(false);

  // word count states
  const [emailCount, setEmailCount] = useState(0);
  const [nameCount, setNameCount] = useState(0);
  const [pwdCount, setPwdCount] = useState(0);

  useEffect(() => {
    // if user has logged in, redirect to personal page
    if (auth) {
      setAlertModalOpen(true)
    }

  }, [])


  const handleTabType = (event, newValue) => setActiveTab(newValue);

  const handleRegister = async (event) => {
    event.preventDefault()
    // input validation
    if (!validateInput())
      return

    // wrap params
    const hashedPwd = md5(userPwd); 
    const registerData = new URLSearchParams({
      email: userEmail,
      password: hashedPwd,
      fullName: userName,
      isCompany: Boolean(activeTab)
    })
    const loginData = new URLSearchParams({
      email: userEmail,
      password: hashedPwd
    })

    // call api
    try {
      await axiosBasic.post('/user/register', registerData)
        // auto login on success
        .then(res => {
          axiosBasic.post('/user/login', loginData)
            .then(res => {
              console.log('successful login', res)
              setAuth({
                username: res.data.userName,
                isCompany: res.data.isCompany,
                accessToken: res.data.accessToken
              })
              navigate(res.data.isCompany
                ? '/my-project-requests'
                : '/student/browse-requests'
              )
            })
        })
        // on register failed
        .catch(e => {
          setAlertStr(e.statusText)
        })

    } catch (err) {
      console.error(err)
      setAlertStr("Register failed. Please try again later.")
    }

  }

  const validateInput = () => {
    let valid = true
    let pwdLen = true;
    let confirm = true;
    let format = true
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const emptyInput = [];

    if (!userEmail) {
      emptyInput.push('email')
      setEmailErr(true);
      valid = false;
    }
    if (userEmail.length && !userEmail.match(emailReg)) {
      setEmailErr(true);
      valid = false;
      format = false;
    }
    if (!userName) {
      emptyInput.push('username')
      setNameErr(true);
      valid = false;
    }
    if (!userPwd) {
      emptyInput.push('password')
      setPwdErr(true);
      valid = false;
    }
    if (userPwd.length < 8) {
      setPwdErr(true);
      valid = false;
      pwdLen = false;
    }
    if (userPwd !== userConfirmPwd) {
      setConfirmPwdErr(true);
      valid = false;
      confirm = false;
    }
    if (!valid) {
      let errStr = '';
      if (emptyInput.length > 0)
        errStr += "Please enter " + emptyInput.join(', ') + "! ";

      if (!pwdLen)
        errStr += " Password must be >= 8 characters! "

      if (!emptyInput.includes('password') && !confirm)
        errStr += " The confirm password doesn't match the password! "

      if (!format)
        errStr += "Please enter email in correct format! ";

      setAlertStr(errStr)

    // all other error are input length error
    } else if (emailErr || nameErr || pwdErr || confirmPwdErr) {
      setAlertStr("Please check your input length.")
      valid = false
    }
    
    return valid
  }

  // onChange
  const updateEmail = e => {
    const userEmail = e.target.value;
    setEmail(userEmail);
    setAlertStr("");
    setEmailCount(userEmail.length);
    setEmailErr(userEmail.length > EMAIL_LIMIT)
  }

  const updateUserName = e => {
    const userName = e.target.value;
    setUserName(userName);
    setAlertStr("");
    setNameCount(userName.length)
    setNameErr(userName.length > NAME_LIMIT)
  }

  const updatePwd = e => {
    const userPwd = e.target.value;
    setUserPwd(userPwd);
    setAlertStr("");
    setPwdCount(userPwd.length)
    setPwdErr(userPwd.length > PWD_LIMIT)
  }

  const updateConfirmPwd = e => {
    const userConfirmPwd = e.target.value;
    setConfirmPwd(userConfirmPwd);
    setAlertStr("");
    setConfirmPwdErr(false);
  }

  return (
    <>
      <DefaultNavbar
        routes={getNavbarRoutes()}
        transparent
        light
      />

      <Collapse in={alertStr != ""}>
        <MKAlert color="error" style={{ zIndex: '100' }} dismissible>{alertStr}</MKAlert>
      </Collapse>
      <AlertModal
        open={alertModalOpen}
        handleClose={() => setAlertModalOpen(false)}
        handleConfirm={() =>
          navigate(auth.isCompany
            ? '/my-project-requests'
            : '/browse-requests'
          )
        }
        title="You have logged in."
        content="You'll be redirected."
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign up
                </MKTypography>
              </MKBox>
              <Container>
                <Grid container item justifyContent="center" xs={40} lg={20} mx="auto">
                  <AppBar position="static">
                    <Tabs value={activeTab} onChange={handleTabType}>
                      <Tab label="Student" />
                      <Tab label="Company" />
                    </Tabs>
                  </AppBar>
                </Grid>
              </Container>
              <MKBox pt={5} pb={4} px={4} sx={{ minHeight: '450px' }}>
                  {
                    activeTab === 0 &&
                    <>
                    <MKBox component="form" role="form" onSubmit={handleRegister}>
                      <MKBox mb={2}>
                        <MKInput error={emailErr} type="email" label={`Email (${emailCount} /${EMAIL_LIMIT})`} onChange={updateEmail} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput error={nameErr} type="username" label={`Username (${nameCount} /${NAME_LIMIT})`} onChange={updateUserName} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput error={pwdErr} type="password" label={`Password (${pwdCount} /${PWD_LIMIT})`} onChange={updatePwd} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput error={confirmPwdErr} type="password" label="Confirm Password" onChange={updateConfirmPwd} fullWidth />
                      </MKBox>
                      <MKBox mt={4} mb={1}>
                        <MKButton variant="gradient" color="info" name="signUp" type='submit' onClick={handleRegister} fullWidth>
                          sign up
                        </MKButton>
                      </MKBox>
                      <MKBox mt={3} mb={1} textAlign="center">
                        <MKTypography variant="button" color="text">
                          Already have an account?{" "}
                          <MKTypography
                            component={Link}
                            to="/authentication/sign-in"
                            variant="button"
                            color="info"
                            fontWeight="medium"
                            textGradient
                          >
                            Sign in
                          </MKTypography>
                        </MKTypography>
                      </MKBox>
                    </MKBox>

                    </>
                  }
                  {
                    activeTab === 1 &&
                    <>
                      <MKBox sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                        <MKTypography variant='h5' sx={{ px: 4, pb: 5, m: 'auto' }}>
                          Want to post a project request?
                        </MKTypography>
                        <MKTypography variant='body' sx={{ p: 3, m: 'auto' }}>
                          Contact us to get a new account today!
                        </MKTypography>
                        <MKTypography variant='subtitle1' sx={{ p: 3, m: 'auto' }}>
                          <a href="mailto:ability.test.official@outlook.com">ability.test.official@outlook.com</a>
                        </MKTypography>
                      </MKBox>
                    </>
                  }
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

    </>
  );
}

export default SignUpBasic;
