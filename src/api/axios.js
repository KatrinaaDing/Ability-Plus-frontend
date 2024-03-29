/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: axois instance initialization
 */
import axios from 'axios';
// export const BASE_URL = 'http://localhost:8080';  
export const BASE_URL = 'http://3.106.6.123:8080/';

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