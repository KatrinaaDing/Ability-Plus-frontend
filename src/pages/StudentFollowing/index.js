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

const MyFollowingPage = () => {

    const [follow, setFollow] = useState(false);
    const isFollowModal = () => setFollow(!follow);
    
    return (
        <>
        <DefaultNavbar
          routes={routes}
        />

        <MKBox component="section" py={12}>
            <Container>
                <Grid container item justifyContent="center" xs={10}>
                    <MKTypography variant="h3" mb={1}>
                        My Following
                    </MKTypography>
                </Grid>
                <br />
                <Grid container item justifyContent="space-around" xs={10}>
                    <MKTypography variant="h5"color="text" fontWeight="bold" textTransform="uppercase">
                        Company Name
                    </MKTypography>
                    <MKButton variant="outlined" color="info" size="small" onClick={isFollowModal}>
                        Unfollow
                    </MKButton>
                </Grid>
                <Modal open={follow} onClose={isFollowModal} sx={{display:"grid", placeItems:"center"}}>
                    <Slide direction="down" in={follow} timeout={500}>
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
                                <MKTypography variant="h6">Unfollow Confirm</MKTypography>
                                <CloseIcon fontSize="medium" sx={{ cursor:"pointer" }} onClick={isFollowModal} />
                            </MKBox>
                            <Divider sx={{my: 0}} />
                                <MKTypography variant="body2" color="secondary" fontWeight="regular" textAlign="center">
                                    Surely Unfollowing?
                                </MKTypography>                        
                            <Divider sx={{my: 0}} />
                            <MKBox display="flex" justifyContent="space-between" p={1.5}>
                                <MKButton variant="gradient" color="error">
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
        </MKBox>

        </>
    );
}

export default MyFollowingPage