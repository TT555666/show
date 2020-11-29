
import * as types from '../action-types'
const initState = {
    bugList: [],
}
export default function monitor(state = initState, action) {
    switch (action.type) {
        case types.BUG_ADD_BUG:
            return {
                bugList: [...state.bugList, action.bug],
            }
        default:
            return state
    }
}
