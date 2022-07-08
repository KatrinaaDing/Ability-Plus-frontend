import useAuth from "auth/useAuth"
import { guestRoutes } from "routes";
import { studentRoutes } from "routes";
import { companyRoutes } from "routes";

const getNavbarRoutes = () => {
    const { auth } = useAuth();

    if (auth) {
        if (auth.isCompany) 
            return companyRoutes
        if (!auth.isCompany)
            return studentRoutes
    } else {
        return guestRoutes
    }

}

export default getNavbarRoutes