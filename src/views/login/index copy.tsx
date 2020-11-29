/** @format */

import React, {useState} from 'react'
// import {Redirect} from 'react-router-dom'
import {Form, Input, Button, message, Spin} from 'antd'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import './index.less'
import {login, getUserInfo} from '../../store/actions'
import Icon from '@ant-design/icons'
import {State} from '../../store/reducers/index'
const Login = props => {
    const {form,  login, getUserInfo} = props
    // const { getFieldDecorator } = form;

    const [loading, setLoading] = useState(false)

    const handleLogin = (username, password) => {
        // 登录完成后 发送请求 调用接口获取用户信息
        setLoading(true)
        login(username, password)
            .then(data => {
                message.success('登录成功')
                handleUserInfo(data.token)
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }

    // 获取用户信息
    const handleUserInfo = token => {
        getUserInfo(token)
            .then(data => {})
            .catch(error => {
                message.error(error)
            })
    }

    const handleSubmit = event => {
        // 阻止事件的默认行为
        // event.preventDefault()
        console.log('idnaj',form)
        // 对所有表单字段进行检验
        form.validateFields((err, values) => {
            // 检验成功
            if (!err) {
                const {username, password} = values
                handleLogin(username, password)
            } else {
                console.log('检验失败!')
            }
        })
    }

    // if (token) {
    //     return <Redirect to="/dashboard" />
    // }
    return (
        <DocumentTitle title={'用户登录'}>
            <div className="login-container">
                {/* onSubmit={handleSubmit} form上没有定义这个方法 */}
                <Form onFinish={handleSubmit} className="content">
                    <div className="title">
                        <h2>用户登录</h2>
                    </div>
                    <Spin spinning={loading} tip="登录中...">
                        <Form.Item>
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <span>账号 : admin 密码 : 随便填</span>
                            <br />
                            <span>账号 : editor 密码 : 随便填</span>
                            <br />
                            <span>账号 : guest 密码 : 随便填</span>
                        </Form.Item>
                    </Spin>
                </Form>
            </div>
        </DocumentTitle>
    )
}
// void不能赋值
// const WrapLogin = Form.create()(Login);

export default connect((state: State) => state.user, {login, getUserInfo})(Login)
