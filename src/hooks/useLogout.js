/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: logout hook
 */
import useAuth from "auth/useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = () => {
        localStorage.clear();
        setAuth(null);
    }

    return logout;
}

export default useLogout