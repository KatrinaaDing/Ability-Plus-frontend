import { useEffect, useState } from "react";
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


import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import BasicPageLayout from "glhfComponents/BasicPageLayout";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import axios from "axios";
import useAuth from "auth/useAuth";
import axiosBasic from "api/axios";

const MyFollowingPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [followList, setFollowList] = useState([]);
    const [follow, setFollow] = useState(false);

    const isFollowModal = () => setFollow(!follow);


    useEffect(async () =>  {
      await axiosPrivate.get('/student_following/all')
        .then(res => {
            setFollowList(res.data)
        })
        .catch(e=>{
            console.error(e)
            console.log(e)
        })
        
    
    }, [])
    


    return (
        <BasicPageLayout title="My Followings">
            <Grid container item justifyContent="space-around" xs={10}>
                {
                    followList.map(f => (
                        <MKBox key={f.name}>
                            <MKTypography variant="h5" color="text" fontWeight="bold" textTransform="uppercase">
                                Company Name
                            </MKTypography>
                            <MKButton variant="outlined" color="info" size="small" onClick={isFollowModal}>
                                Unfollow
                            </MKButton>
                        </MKBox>
                    ))
                }

            </Grid>
            <Modal open={follow} onClose={isFollowModal} sx={{ display: "grid", placeItems: "center" }}>
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
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={isFollowModal} />
                        </MKBox>

                        <Divider sx={{ my: 0 }} />
                        <MKTypography variant="body2" color="secondary" fontWeight="regular" textAlign="center">
                            Surely Unfollowing?
                        </MKTypography>
                        <Divider sx={{ my: 0 }} />
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="light">
                                No
                            </MKButton>
                            <MKButton variant="gradient" color="info">
                                Yes
                            </MKButton>
                        </MKBox>
                    </MKBox>
                </Slide>
            </Modal>


        </BasicPageLayout>
    );
}

export default MyFollowingPage