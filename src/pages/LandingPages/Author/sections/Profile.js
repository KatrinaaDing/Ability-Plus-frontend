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
import { useState } from "react";

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

// Images
import profilePicture from "assets/images/bruce-mars.jpg";

function Profile() {

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const [confirm, setDelete] = useState(false)
  const deleteModal = () => setDelete(!confirm);

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
                <MKTypography variant="h3">Jane Wong</MKTypography>
{/*                 <MKButton variant="outlined" color="info" size="small">
                  Follow
                </MKButton> */}
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Email&nbsp;&nbsp;&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    JaneWong@sample.com
                  </MKTypography>
                </Grid>
              </Grid>
              <MKTypography component="span" variant="body2" fontWeight="bold">
                Description&nbsp;&nbsp;
              </MKTypography>
              <MKTypography variant="body1" component="span" fontWeight="light" color="text">
                If you can&apos;t decide, the answer is no. If two equally difficult
                paths, choose the one more painful in the short term (pain avoidance is creating an
                illusion of equality). Choose the path that leaves you more equanimous. <br />
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-around"> 
                        <MKButton variant="outlined" color="error" size="small" onClick={deleteModal}>
                            Delete Account
                        </MKButton>
                        <MKButton variant="outlined" color="info" size="small" onClick={toggleModal}>
                            Edit Profile
                        </MKButton>
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
                            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                                <MKTypography variant="h5">Profile Edit</MKTypography>
                                <CloseIcon fontSize="medium" sx={{ cursor:"pointer" }} onClick={toggleModal} />
                            </MKBox>
                            <Divider sx={{my: 0}} />
                            <MKBox component="form" role="form" p={2} py={12}>
{/* The 'value' of Input should be parameters which have state change. */}                               
                                <Grid container item xs={12}>
                                    <MKInput label="Username" fullWidth value="Jane Wong" />
                                </Grid>     
                                <br />
                                <Grid container item xs={12}>
                                    <MKInput type="email" label="Email" fullWidth value="JaneWong@sample.com" />
                                </Grid> 
                                <br />
                                <Grid container item xs={12}>
                                    <MKInput label="Description" multiline fullWidth value="xxxxxxxxxxx sample here" rows={6} />
                                </Grid>                                                           
                            </MKBox>
                            <Divider sx={{my: 0}} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="light" onClick={toggleModal}>
                                Cancel
                                </MKButton>
                                <MKButton variant="gradient" color="info">
                                Save
                                </MKButton>
                            </MKBox>                            
                        </MKBox>
                    </Slide>
                </Modal>     
                <Modal open={confirm} onClose={deleteModal} sx={{display:"grid", placeItems:"center"}}>
                    <Slide direction="down" in={confirm} timeout={500}>
                        <MKBox
                            position="relative"
                            width="20%"
                            display="flex"
                            flexDirection="column"
                            borderRadius="xl"
                            bgColor="white"
                            shadow="xl"    
                        >
                            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={3}>
                                <MKTypography variant="h5">Delete Account</MKTypography>
                                <CloseIcon fontSize="medium" sx={{ cursor:"pointer" }} onClick={deleteModal} />
                            </MKBox>
                            <Divider sx={{my: 0}} />
                                <MKTypography variant="body2" color="secondary" fontWeight="regular" textAlign="center">
                                    Are you sure about it?
                                </MKTypography>                        
                            <Divider sx={{my: 0}} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="dark">
                                Yes
                                </MKButton>
                                <MKButton variant="gradient" color="info">
                                No
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