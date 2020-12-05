/** @format */

import axios from 'axios'
import store from '../store'
import {Modal, notification} from 'antd'
import {getToken} from './auth'
import {logout} from '../store/actions'

//创建一个axios示例
const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API + process.env.VERSION, // api 的 base_url
    timeout: 5000, // request timeout
})
const err = error => {
    const token = store.getState().user.token
    if (error.response) {
        const data = error.response.data
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message,
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed',
            })
            // if (token) {
            //     store.dispatch('Logout').then(() => {
            //         setTimeout(() => {
            //             window.location.reload()
            //         }, 1500)
            //     })
            // }
        }
        if (error.response.status === 403) {
            Modal.confirm({
                title: '确定登出?',
                content: '由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录',
                okText: '重新登录',
                cancelText: '取消',
                onOk() {
                    const token = store.getState().user.token
                    store.dispatch(logout(token) as any)
                },
                onCancel() {
                    console.log('Cancel')
                },
            })
        }

        if (error.response.status.toString().startsWith('50')) {
            Modal.error({
                title: '错误',
                content: data.msg || data.message || error.response.message || '也不说为啥开小差',
            })
        }
        if (error.response.status === 404) {
            Modal.error({
                title: '服务器没这个功能!',
                content: `${error.response.config.method}: ${data.path}`,
            })
        }
    }
    return Promise.reject(error)
}
// 请求拦截器
service.interceptors.request.use(config => {
    // 设置token
    if (store.getState().user.token) {
        // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
        config.headers.Authorization = getToken()
    }

    return config
}, err)

// 响应拦截器
service.interceptors.response.use(response => {
    const res = response.data

    //这里根据后台返回来设置
    if (res.code === '0') {
        return response
    } else {
        Modal.error({
            title: '错误!',
            content: response.data.msg || response.data.message || '也不说为啥开小差',
        })
        return Promise.reject(response.data.msg || response.data.message || '也不说为啥开小差')
    }
}, err)

export default service
