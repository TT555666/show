/** @format */

import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Form, Input, Button, message} from 'antd'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import './index.less'
import {login, getUserInfo} from '../../store/actions'
import Icon from '@ant-design/icons'
import {State} from '../../store/reducers/index'
const Login = props => {
    const {login, getUserInfo, token} = props
    // const { getFieldDecorator } = form;
    // const [form] = Form.useForm()
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
                // message.error(error)
                console.log('登陆失败拉')
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
        console.log('idnaj', event)
        // 对所有表单字段进行检验
        // const {username, password} = values
        // handleLogin(username, password)
        const {username, password} = event
        handleLogin(username, password)
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }
    if (token) {
        return <Redirect to="/dashboard" />
    }
    return (
        <DocumentTitle title={'用户登录'}>
            <div className="login-container">
                {/* onSubmit={handleSubmit} form上没有定义这个方法 */}
                <Form
                    className="content"
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </DocumentTitle>
    )
}
// void不能赋值
// const WrapLogin = Form.create()(Login);

export default connect((state: State) => state.user, {login, getUserInfo})(Login)
