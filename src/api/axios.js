/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: axois instance creation
 */
import axios from 'axios';
export const BASE_URL = 'http://localhost:8081';
// export const BASE_URL = 'http://ec2-3-26-215-49.ap-southeast-2.compute.amazonaws.com:8080/';

const axiosBasic = axios.create({
    baseURL: BASE_URL,
});


// this axios instance will send all request with authentication header
export const axiosPrivate = axios.create({      
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    
});

export default axiosBasic;