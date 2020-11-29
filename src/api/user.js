/** @format */

import request from '../utils/request'

export function reqUserInfo(data) {
    // return request({
    //   url: '/userInfo',
    //   method: 'post',
    //   data
    // })
    return new Promise((resolve, reject) => {
        resolve({
            data: {
                userInfo: {
                    avatar:
                        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606636338468&di=f4c868c3be4a6b5778a948f3a0ad8fb6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201207%2F24%2F20120724223045_LTEBZ.jpeg',
                    role: 'admin',
                    name:'TT'
                },
                status: 0,
            },
        })
    })
}

export function getUsers() {
    return request({
        url: '/user/list',
        method: 'get',
    })
}

export function deleteUser(data) {
    return request({
        url: '/user/delete',
        method: 'post',
        data,
    })
}

export function editUser(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data,
    })
}

export function reqValidatUserID(data) {
    return request({
        url: '/user/validatUserID',
        method: 'post',
        data,
    })
}

export function addUser(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data,
    })
}
