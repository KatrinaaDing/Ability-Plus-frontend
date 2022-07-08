/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: axois instance creation
 */
import axios from 'axios';
const BASE_URL = 'http://localhost:8081';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({      // this axios instance only goes inside the system, which is not "visible" to user
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});