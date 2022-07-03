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

    return (
        <>
        <DefaultNavbar
          routes={routes}
        />


        <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} />
        </MKBox>
        
        </>
    );
}

export default MyFollowingPage