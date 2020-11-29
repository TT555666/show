/** @format */

import * as types from '../action-types'
interface Action {
    type: String
    token: String
    role: any
    avatar: String
    name:String
}
const initUserInfo = {
    name: 'TTTT',
    role: 'admin',
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606636338468&di=f4c868c3be4a6b5778a948f3a0ad8fb6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201207%2F24%2F20120724223045_LTEBZ.jpeg',
    // token: getToken(),
    token: 'sssdadasd',
}
export default function user(state = initUserInfo, action: Action) {
    switch (action.type) {
        case types.USER_SET_USER_TOKEN:
            return {
                ...state,
                token: action.token,
            }
        case types.USER_SET_USER_INFO:
            return {
                ...state,
                name: action.name,
                role: action.role,
                avatar: action.avatar,
            }
        case types.USER_RESET_USER:
            return {}
        default:
            return state
    }
}
