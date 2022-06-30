// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
/*   brand: {
    name: "Team GLHF",
    image: logoCT,
    route: "/",
  }, */

  socials: [

  ],
  menus: [
    
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Proposal Management System by{" "}
      <MKTypography
        component="a"
        href="#"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Team GLHF
      </MKTypography>
      .
    </MKTypography>
  ),
};
