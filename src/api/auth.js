/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: api funcitons
 */
import axios from './axios';

import api from './api_urls';

const login = (username, password) => 
    axios.post(api.login,
        JSON.stringify({ username, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

export {
    login,
}