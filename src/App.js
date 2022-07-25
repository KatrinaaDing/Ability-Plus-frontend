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

import { useEffect } from "react";

// react-router components
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import PresentationPage from "layouts/pages/presentation";
import PopularProposals from "pages/PopularProposals";
import NotFound from "pages/NotFound";
import Unauthorized from "pages/Unauthorized";
import RequireAuth from "auth/RequireAuth";

// routes
import { companyRoutes, studentRoutes, guestRoutes, otherRoutes } from "routes";
import Logout from "pages/Logout";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route,idx) => {
      if (route.collapse) {
        return (
          <>
            <Route exact path = { route.route } element = { route.component } key = { idx } />
            {getRoutes(route.collapse)}
          </>
        )
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={idx} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* public access */}
        <Route path="" element={<PresentationPage />} />
        <Route path="/popular-proposals" element={<PopularProposals />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/logout" element={<Logout />} />
        {getRoutes(guestRoutes)}

        {/* Company access only */}
        <Route element={<RequireAuth roles={['c']}/>} >
          {getRoutes(companyRoutes(""))}
          {getRoutes(otherRoutes.company)}
        </Route>

        {/* Student access only */}
        <Route element={<RequireAuth roles={['s']} />} >
          {getRoutes(studentRoutes(""))}
          {getRoutes(otherRoutes.student)}
        </Route>

        {/* Both student and comapny can access */}
        <Route element={<RequireAuth roles={['c', 's']} />} >
          {getRoutes(studentRoutes(""))}
          {getRoutes(companyRoutes(""))}
          {getRoutes(otherRoutes.common)}
        </Route>


        {/* Other goes to not found */}
        <Route path='*' element={<NotFound />} />

      </Routes>
    </ThemeProvider>
  );
}
