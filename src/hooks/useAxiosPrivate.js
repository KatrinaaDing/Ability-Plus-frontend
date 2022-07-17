/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: axois interceptors
 */
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "auth/useAuth";
import useLogout from "./useLogout";

const useAxiosPrivate = () => {
    const { auth } = useAuth();             // get auth detail
    const navigate = useNavigate();
    const logout = useLogout();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(                     // interceptor are execute before .then and .catch
            config => {
                if (!config.headers['token']) {                                     // check the header, if there's no access token inside,
                    config.headers['token'] = auth.accessToken;        // setting auth header for request
                }
                console.log('request', config) // uncomment this to debug
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                const copiedRes = structuredClone(response.data)
                response.status = copiedRes.status;
                response.statusText = copiedRes.message;
                response.data = copiedRes.data
                console.log('response', response)           // uncomment it to debug
                if (response.status >= 400)
                    return Promise.reject(response)
                return response
            },                                                           // if the response is good, just return it
            async (error) => {                                           // if there's error in the response (e.g. token expired)
                if (error?.response?.status === 401) {                // status 401 (forbidden - token expired) 
                    alert("Login info expired, please login again.")
                    console.log('jwt not verified')
                    logout();
                    navigate('/authentication/sign-in')
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);                  // removing the interceptors and the end 
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])     // put auth and refresh in dependencies array so that if they change, the hook would be triggered

    return axiosPrivate;
}

export default useAxiosPrivate;