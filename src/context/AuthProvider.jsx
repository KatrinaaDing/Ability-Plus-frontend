/**
 * Author: Ziqi Ding
 * Created At: 08 Jul 2022
 * Discription: Auth context
 */

import React from 'react';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    // global auth information
    const [auth, setAuth] = React.useState(JSON.parse(localStorage.getItem("user")));

    // TOFIX: will be set to true if "remember me", but might be deleted in the future 
    const [persist, setPersist] = React.useState(JSON.parse(localStorage.getItem("persist")) || false);

    /* auth data = 
        {
            username: string,   // username string
            isCompany: bool // indicate if user is a company
            accessToken: string   // access token string
        }
    */
    React.useEffect(() => {
        console.log('auth:',auth)
        localStorage.setItem('user', JSON.stringify(auth))
    },[auth])

    return (
        // provide the auth info to all children component
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            { children }
        </AuthContext.Provider>

    )
}

export default AuthContext;