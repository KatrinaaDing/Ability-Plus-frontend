/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: axois interceptors
 */
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();             // get auth detail

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(                     // interceptor are execute before .then and .catch
            config => {
                if (!config.headers['Authorization']) {                                     // check the header, if there's no access token inside,
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;        // setting auth header for request
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                console.log(response)
                return response
            },                                                           // if the response is good, just return it
            async (error) => {                                                              // if there's error in the response (e.g. token expired)
                const prevRequest = error?.config;                                          
                if (error?.response?.status === 403 && !prevRequest?.sent) {                // status 403 (forbidden - token expired) occured and .sent is not exist or not true
                    prevRequest.sent = true;                                                // set .sent = true so that this block of code only run once
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;     
                    return axiosPrivate(prevRequest);                                       // making request again: return the request (the one sent just sent) with a new access token
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);                  // removing the interceptors and the end 
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])     // put auth and refresh in dependencies array so that if they change, the hook would be triggered

    return axiosPrivate;
}

export default useAxiosPrivate;