import { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";

import CloseIcon from "@mui/icons-material/Close";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";


import routes from "routes";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import useAuth from "auth/useAuth";

const ProfileBasic = () => {
    const { auth } = useAuth();
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);
    const [confirm, setDelete] = useState(false)
    const deleteModal = () => setDelete(!confirm);

    const title = auth.isCompany ? 'Company' : 'Student'

    return (
        <BasicPageLayout title={title + ' Profile'}>
                <Grid container item xs={12} lg={7} sx={{mx:"auto"}}>
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h4" color="text" fontWeight="bold" textTransform="uppercase">
                                    Username
                                </MKTypography>
                            </Grid>

{/* The actual username should be changed to a parameter with state change. Just an ui sample here*/}

                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="h5">
                                    Jane Wong
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>

                <Grid container item xs={12} lg={7} sx={{mx:"auto"}}>
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h4" color="text" fontWeight="bold" textTransform="uppercase">
                                    Email
                                </MKTypography>
                            </Grid>

{/* The actual email should be changed to a parameter with state change. Just an ui sample here*/}

                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="h5">
                                    JaneWong@sample.com
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>        
                <Grid container item xs={12} lg={7} sx={{mx:"auto"}}>
                    <MKBox width="100%" component="form" method="post" autocomplete="off">
                        <Grid container alignItems="center" py={2}>
                            <Grid item xs={12} sm={3}>
                                <MKTypography variant="h4" color="text" fontWeight="bold" textTransform="uppercase">
                                    Description
                                </MKTypography>
                            </Grid>
                        </Grid>
{/* The actual description should be changed to a parameter with state change. Just an ui sample here*/}
                        <Grid item xs={12} sm={3}>
                            <Grid item xs={12} sm={9}>
                                <MKTypography variant="body2" color="text">
                                    xxxxxxxxxxx sample here
                                </MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                </Grid>     
                <br />
                <br />

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
                                <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                                Close
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
    
        </BasicPageLayout>
    );
}

export default ProfileBasic;