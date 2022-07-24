/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: auth identification
 */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ roles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('auth', auth)

    // check if the user is in the 'can access' role list
    const canAccess = (auth) => {
        let roleCode;
        if (auth.isCompany) roleCode = 'c';
        else if (!auth.isCompany) roleCode = 's'
        
        return roles.includes(roleCode)
    }

    return (
        auth
            ? canAccess(auth)  
                ? <Outlet />
                : <Navigate to="/unauthorized" />   // if user is not in the role list, show unauthorize page
            : <Navigate to="/authentication/sign-in" state={{ from: location }} replace />  // if there's no auth info, redirect to login
    );
}

export default RequireAuth;