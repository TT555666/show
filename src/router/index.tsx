/** @format */

import React, {Component} from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from '../views/login'
import Layout from '../components/layout'
import {getUserInfo} from '../store/actions/user'
import {connect} from 'react-redux'
import {State} from '../store/reducers/index'
// interface Props {
//     token:String,
//     role:Number,
//     getUserInfo:Function
// }
class Router extends Component<any, any> {
    render() {
        const {token, role, getUserInfo} = this.props
        console.log('token', token, role)
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route
                        path="/"
                        render={() => {
                            if (!token) {
                                return <Redirect to="/login" />
                            } else {
                                if (role) {
                                    return <Layout />
                                } else {
                                    return <Layout />
                                    getUserInfo(token).then(() => <Layout />)
                                }
                            }
                        }}
                    />
                </Switch>
            </HashRouter>
        )
    }
}

export default connect((state: State) => state.user, {getUserInfo})(Router)
