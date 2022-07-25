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
import { BASE_URL } from 'api/axios';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
const MyFollowingPage = () => {
    const {auth, setAuth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [followList, setFollowList] = useState([]);
    const [follow, setFollow] = useState(false);
    const [followChanged, setFollowChanged] = useState(false);
    const [currentClick, setCurrentClick] = useState('');
    
    useEffect( () =>  {
        const listFollowing = async() =>
            await axiosPrivate.get(`/student_following/all`)
            .then(res => {

                setFollowList(res.data.data)
            })
            .catch(e=>{
                console.error(e)
            })
        
        listFollowing()
    }, [followChanged])
    
    const handleFollow = async (event) => {
        if (Object.is(event.target.name, "confirm")) {
            try {
                const response = await fetch(`${BASE_URL}/student_following/${currentClick}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        token: auth.accessToken
                    },
                });
                if (response.status === 200) {
                    setFollowChanged(!followChanged)
                    setFollow(!follow)
                    console.log(followChanged)
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
    const handleSetCurFollow = (f) => {
        setCurrentClick(f.companyId)
        setFollow(!follow)
    }

    return (
        <BasicPageLayout title="My Followings">
            <List sx={{ width: '100%', px: 3 }}>
                {
                    followList.map(f => 
                        <ListItem
                            key={f.companyName}
                            secondaryAction={
                                <MKButton variant="outlined" color="info" sx={{ mr: 10 }} onClick={() => handleSetCurFollow(f)}>
                                    Unfollow
                                </MKButton>
                            }
                            alignItems="flex-start"
                            sx={{ my: 4 }}
                        >
                            <ListItemButton
                                role={undefined}
                                onClick={() => window.open(`/company-info/${f.id}`)}
                                alignItems="flex-start"
                                sx={{
                                    borderRadius: '10px',
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt={f.companyName} src="/src/assets/images/profile-avatars/company.png" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={f.companyName}
                                    secondary={
                                        <>
                                            Followed At: {new Date(f.followTime*1000).toLocaleString()} <br/>
                                            Opening Projects: {f.openingProjectNum}
                                        </>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
            <Modal open={follow} onClose={()=> setFollow(!follow)} sx={{ display: "grid", placeItems: "center" }}>
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
                            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={() => setFollow(!follow)} />
                        </MKBox>
                        <MKTypography variant="body2" color="secondary" fontWeight="regular" textAlign="center" sx={{py:2}}>
                            Surely Unfollowing?
                        </MKTypography>
                        <MKBox display="flex" justifyContent="space-between" p={1.5}>
                            <MKButton variant="gradient" color="light" onClick={ ()=> setFollow(!follow)}>
                                No
                            </MKButton>
                            <MKButton variant="gradient" color="info" name="confirm" onClick={ handleFollow }>
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