import MKBox from 'components/MKBox';
import DefaultFooter from 'examples/Footers/DefaultFooter';
import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
import footerRoutes from 'footer.routes';
import React from 'react';
import getNavbarRoutes from 'utils/getNavbarRoutes';
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import bgImage from "assets/images/city-profile.jpg";


const ProfilePageLayout = ({children}) => {
    return (
        <>
            <DefaultNavbar
                routes={getNavbarRoutes()}
                transparent
                light
            />
            <MKBox bgColor="white">
                <MKBox
                    minHeight="25rem"
                    width="100%"
                    sx={{
                        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                            `${linearGradient(
                                rgba(gradients.dark.main, 0.8),
                                rgba(gradients.dark.state, 0.8)
                            )}, url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "grid",
                        placeItems: "center",
                    }}
                />
                <Card
                    sx={{
                        p: 2,
                        mx: { xs: 2, lg: 3 },
                        mt: -8,
                        mb: 4,
                        backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                        backdropFilter: "saturate(200%) blur(30px)",
                        boxShadow: ({ boxShadows: { xxl } }) => xxl,
                    }}
                >
                    {children}
                </Card>
                <DefaultFooter content={footerRoutes} />
            </MKBox>
        </>
    );
};

export default ProfilePageLayout;