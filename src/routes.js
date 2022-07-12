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

/** 
  All of the routes for the Material Kit 2 React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/


// @mui icons
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import GradeIcon from '@mui/icons-material/Grade';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';;

// Pages
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import Following from "layouts/pages/landing-pages/following";
import CompanyInfo from "layouts/pages/landing-pages/company-info";
import StudentInfo from "layouts/pages/landing-pages/student-info";


// Sections
import CreateProposal from "pages/CreateProposal";
import CreateRequest from "pages/CreateRequest";
import ProfilePage from "layouts/pages/landing-pages/profile";
import PersonalPage from "pages/PersonalPage";
import MyProposals from "pages/MyProposals";
import AllProposals from "pages/AllProposals";
import MyProjectRequests from "pages/MyProjectRequests";
import ProposalRanks from "pages/ProposalRanks";
import Logout from "pages/Logout";


// routes in navbar (company view)
const companyRoutes = (username) => [
  {
    name: "Personal Page",
    route: "/company/personal-page",
    icon: <HomeIcon />,
    component: <PersonalPage />
  },
  {
    name: "My Project Requests",
    route: "/my-project-requests",
    icon: <DashboardIcon />,
    component: <MyProjectRequests />,
  },
  {
    name: username,
    route: '/company/profile',
    icon: <PersonIcon />,
    component: <ProfilePage />,
    collapse: [
      {
        name: "logout",
        route: "/logout",
        icon: <LogoutIcon />,
        component: <Logout />,
      },
    ],
  },
]

// routes in navbar (student view)
const studentRoutes = (username) => [
  {
    name: "Personal Page",
    route: "/student/personal-page",
    icon: <HomeIcon />,
    component: <PersonalPage />
  },
  {
    name: "My Proposals",
    route: "/my-proposals",
    icon: <DashboardIcon />,
    component: <MyProposals />
  },

  {
    name: "Followings",
    route: "/following",
    icon: <GradeIcon />,
    component: <Following />,
  },
  {
    name: username,
    route: '/student/profile',
    icon: <PersonIcon />,
    component: <ProfilePage />,
    collapse: [
      {
        name: "logout",
        route: "/logout",
        icon: <LogoutIcon />,
        component: <Logout />,
      },
    ],
  },
]

// routes in navbar (guest view)
const guestRoutes = [
  {
    name: "sign in",
    route: "/authentication/sign-in",
    icon: <LoginIcon />,
    component: <SignIn />,
  },
  {
    name: "sign up",
    route: "/authentication/sign-up",
    icon: <AppRegistrationIcon />,
    component: <SignUp />,
  },
 
]

// routes that not listed in navbar
const otherRoutes = {
  company: [
    {
      name: "All Proposals",
      route: "/all-proposals",
      component: <AllProposals />,
    },
    {
      name: "create request",
      route: "/create-request",
      component: <CreateRequest />,
    },
  ],
  student: [
    {
      name: "create proposal",
      route: "/create-proposal",
      component: <CreateProposal />,
    },
  ],
  common: [
    {
      name: "Company Information",
      route: "/company-info/:id",
      component: <CompanyInfo />,
    },
    {
      name: "Student Information",
      route: "/student-info/:id",
      component: <StudentInfo />
    },
    {
      name: "view proposal rank",
      route: "/view-request-ranks/:id",
      component: <ProposalRanks />,
    },
  ]
}

export {
  companyRoutes,
  studentRoutes,
  guestRoutes,
  otherRoutes,
};
