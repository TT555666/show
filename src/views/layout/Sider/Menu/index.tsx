/** @format */

import React, {Component} from 'react'
import {Menu} from 'antd'
import Icon from '@ant-design/icons'
import {Link, withRouter} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars'
import {getMenuItemInMenuListByProperty} from '../../../../utils'
import {connect} from 'react-redux'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {addTag} from '../../../../store/actions'
import menuList from '../../../../config/menuConfig'
import './index.less'
import {State} from '../../../../store/reducers'

import {RouteComponentProps} from "react-router"
const SubMenu = Menu.SubMenu
// 重新记录数组顺序
const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

interface MeunProps extends RouteComponentProps{
  role?: any
  // location?: Location
  addTag?: Function
}
 

interface OpenKey {
    key: String
}
interface MeunState {
    menuTreeNode?: any
    openKey?: any
    // openKey: OpenKey | Array<OpenKey>
}

class Meun extends Component<MeunProps> {
    state: MeunState = {
        menuTreeNode: null,
        openKey: [],
    }

    // filterMenuItem用来根据配置信息筛选可以显示的菜单项
    filterMenuItem = (item: any) => {
        const {roles} = item
        const {role} = this.props
        if (role === 'admin' || !roles || roles.includes(role)) {
            return true
        } else if (item.children) {
            // 如果当前用户有此item的某个子item的权限
            return !!item.children.find((child: any) => roles.includes(child.role))
        }
        return false
    }
    // 菜单渲染
    getMenuNodes = (menuList: any) => {
        // 得到当前请求的路由路径
        const path = this.props.location?.pathname
        return menuList.reduce((pre: any, item: any) => {
            if (this.filterMenuItem(item)) {
                if (!item.children) {
                    pre.push(
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>,
                    )
                } else {
                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find((cItem: any) => path?.indexOf(cItem.path) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.setState((state: any) => ({
                            openKey: [...state.openKey, item.path],
                        }))
                    }

                    // 向pre添加<SubMenu>
                    pre.push(
                        <SubMenu
                            key={item.path}
                            title={
                                <span>
                                    {item.icon ? <Icon type={item.icon} /> : null}
                                    <span>{item.title}</span>
                                </span>
                            }>
                            {this.getMenuNodes(item.children)}
                        </SubMenu>,
                    )
                }
            }

            return pre
        }, [])
    }

    onDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }
        const _items = reorder(this.state.menuTreeNode, result.source.index, result.destination.index)
        this.setState({
            menuTreeNode: _items,
        })
    }

    handleMenuSelect = ({key = '/dashboard'}: OpenKey) => {
        const menuItem = getMenuItemInMenuListByProperty(menuList, 'path', key)
        this.props.addTag(menuItem)
    }

    componentWillMount() {
        const menuTreeNode = this.getMenuNodes(menuList)
        this.setState({
            menuTreeNode,
        })
        this.handleMenuSelect(this.state.openKey)
    }
    render() {
        const path = this.props.location?.pathname
        const openKey = this.state.openKey
        return (
            <div className="sidebar-menu-container">
                <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.menuTreeNode.map((item, index) => (
                                        <Draggable key={item.key} draggableId={item.key} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {/* 不会解决的bug */}
                                                    {/* onSelect={this.handleMenuSelect} */}
                                                    <Menu
                                                        mode="inline"
                                                        theme="dark"
                                                        selectedKeys={[path]}
                                                        defaultOpenKeys={openKey}>
                                                        {item}
                                                    </Menu>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Scrollbars>
            </div>
        )
    }
}

export default connect((state: State) => state.user, {addTag})(withRouter(Meun))
