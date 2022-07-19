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
import { Link, useNavigate } from "react-router-dom";

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
import Collapse from '@mui/material/Collapse';
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
import useAxiosBasic from "hooks/useAxiosBasic";
import AlertModal from "glhfComponents/AlertModal";
import md5 from "md5";

function SignInBasic() {
  const { auth, setAuth } = useAuth();
  const axiosBasic = useAxiosBasic();
  const navigate = useNavigate();

  // const [rememberMe, setRememberMe] = useState(false);
  const [alertStr, setAlertStr] = useState("");
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [userPwd, setUserPwd] = useState("");
  const [pwdErr, setPwdErr] = useState(false);

  useEffect(() => {
    // if user has logged in, redirect to personal page
    if (auth) {
      setAlertModalOpen(true)
    }

  }, [])

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (event) => {
    // validate form
    if (!validateInput(userEmail, userPwd))
      return

    // sign in user - use search params
    const hashedPwd = md5(userPwd) 
    const loginData = new URLSearchParams({
      email: userEmail,
      password: hashedPwd // md5 hashing
    })

    // call api
    try {
      await axiosBasic.post('/user/login', loginData)
        // on success
        .then(res => {
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
        
          
        // on failed
        .catch(e => {
          setAlertStr(e.statusText)
        })

    } catch (err) {
      console.error(err)
      setAlertStr("Login failed. Please try again later.")
    }

  }

  const validateInput = (email, pwd) => {
    let valid = true;
    let error = '';
    if (!email) {
      error += "Please enter email. ";
      setEmailErr(true)
      valid = false;
    }
    if (!pwd) {
      error += 'Please enter password. '
      setPwdErr(true)
      valid = false;
    }

    if (!valid) setAlertStr(error)
    return valid;
  }

  //onChange email
  const updateUserEmail = e => {
    const userEmail = e.target.value
    setEmail(userEmail)
    setEmailErr(false)
    setAlertStr("");
  }
  //onChange pwd
  const updateUserPwd = e => {
    const userPwd = e.target.value
    setUserPwd(userPwd)
    setPwdErr(false)
    setAlertStr("");
  }


  return (
    <>
      <DefaultNavbar
        routes={getNavbarRoutes()}
        transparent
        light
      />
      <AlertModal
        open={alertModalOpen}
        handleClose={() => setAlertModalOpen(false)}
        handleConfirm={() =>
          navigate(auth.isCompany
            ? '/my-project-requests'
            : '/student/browse-requests'
          )
        }
        title="You have logged in."
        content="You'll be redirected."
      />
      <Collapse in={alertStr != ""}>
        <MKAlert color="error" style={{ zIndex: '100' }} dismissible>{alertStr}</MKAlert>
      </Collapse>
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
                  Sign in
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput type="email" error={emailErr} label="Email" onChange={updateUserEmail} fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" error={pwdErr} label="Password" onChange={updateUserPwd} fullWidth />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" name="signIn" fullWidth onClick={handleSubmit}>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

    </>
  );
}

export default SignInBasic;
