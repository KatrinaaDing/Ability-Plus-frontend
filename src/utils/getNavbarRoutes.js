/**
 * Author: Ziqi Ding
 * Created At: 10 Jul 2022
 * Discription: A helper function to get routes that correspond to user role
 */
import useAuth from "auth/useAuth"
import PopularProposals from "pages/PopularProposals";
import { guestRoutes } from "routes";
import { studentRoutes } from "routes";
import { companyRoutes } from "routes";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import HomeIcon from '@mui/icons-material/Home';
import BrowseRequests from "pages/BrowseRequests";


/**
 * return routes depends on login user role
 * @param {boolean} mobileView if the routes are for mobile view
 * @returns a list of routes
 */
const getNavbarRoutes = (mobileView) => {
    const { auth } = useAuth();
    let routes = [];

    if (mobileView)
        routes = routes.concat([
            {
                name: "Popular Proposals",
                route: "/popular-proposals",
                icon: <TipsAndUpdatesIcon />,
                component: <PopularProposals />,
            }, {
                name: "Browse All Challenges",
                route: "/browse-requests",
                icon: <HomeIcon />,
                component: <BrowseRequests />,
            },

        ])
        
    if (auth) {
        if (auth.isCompany)
            routes = routes.concat(companyRoutes(auth.username))
        else
            routes = routes.concat(studentRoutes(auth.username))
    
    } else {
        routes = routes.concat(guestRoutes)
    }
    
    return routes
}

export default getNavbarRoutes