/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: A page that shows at logout
 */
import MKTypography from 'components/MKTypography';
import BasicPageLayout from 'glhfComponents/BasicPageLayout';
import useLogout from 'hooks/useLogout';
import React from 'react';
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const logout = useLogout();
    const navigate = useNavigate();

    React.useEffect(() => {
        logout();
        setTimeout(() => navigate('/'), 1500);
    }, [])

    return (
        <BasicPageLayout title="You've been logged out">
            <MKTypography variant='subtitle1'>Redirecting to homepage...</MKTypography>    
        </BasicPageLayout>
    );
};

export default Logout;