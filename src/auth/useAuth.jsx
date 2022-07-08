/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: provide a hook that uses auth context
 */
import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;