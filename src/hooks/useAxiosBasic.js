/**
 * Author: Ziqi Ding
 * Created At: 10 Jul 2022
 * Discription: axois interceptors
 */
import axiosBasic from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "auth/useAuth";

const useAxiosBasic = () => {
    const { auth } = useAuth();             // get auth detail
    const { navigate } = useNavigate();

    useEffect(() => {

        const requestIntercept = axiosBasic.interceptors.request.use(        // interceptor are execute before .then and .catch
            config => {
                // console.log(config)    // uncomment it to debug
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosBasic.interceptors.response.use(
            response => {
                response.status = response.data.status  
                response.statusText = response.data.message
                const resData = response.data.data;
                response.data = resData;
                console.log(response)           // uncomment it to debug
                if (response.status >= 400) 
                    return Promise.reject(response)
                return response
            },                                                           // if the response is good, just return it
            async (error) => {                                           // if there's error in the response (e.g. token expired)
                console.error(error)
                return Promise.reject(error);
            }
        );

        return () => {
            axiosBasic.interceptors.request.eject(requestIntercept);                  // removing the interceptors and the end 
            axiosBasic.interceptors.response.eject(responseIntercept);
        }
    }, [])     // put auth and refresh in dependencies array so that if they change, the hook would be triggered

    return axiosBasic;
}

export default useAxiosBasic;