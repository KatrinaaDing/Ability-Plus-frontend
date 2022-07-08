/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: api funcitons
 */
import axios from './axios';


const API_LOGIN = ''

const login = (username, password) => 
    axios.post(API_LOGIN,
        JSON.stringify({ username, password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

export {
    login,
}