/** @format */

import {setUserToken, resetUser} from './user'
import {reqLogin, reqLogout} from '../../api/login'
import {setToken, removeToken} from '../../utils/auth'
import {Dispatch} from 'react'
export const login = (username, password) => async dispatch => {
    await reqLogin({username: username.trim(), password: password}).then(response => {
        console.log('response', response)
        const {data} = response
        if (data.status === 0) {
            const token = data.token
            dispatch(setUserToken(token))
            setToken(token)
            return data
        }
    })
    // return new Promise((resolve, reject) => {

    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
}

export const logout = (token: any) => (dispatch: Dispatch<any>) => {
    return new Promise((resolve, reject) => {
        reqLogout(token)
            .then((response: any) => {
                const {data} = response
                if (data.status === 0) {
                    dispatch(resetUser())
                    removeToken()
                    resolve(data)
                } else {
                    const msg = data.message
                    reject(msg)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}
