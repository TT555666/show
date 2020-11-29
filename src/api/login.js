/** @format */

import request from '../utils/request'

export function reqLogin(data) {
    // return request({
    //   url: '/login',
    //   method: 'post',
    //   data
    // })
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                token: 'dasdf1dasdas',
                status: 0,
                roles: 'admin',
            },
        })
    })
}

export function reqLogout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data,
    })
}
