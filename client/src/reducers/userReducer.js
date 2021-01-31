import { UserActionTypes } from '../actions/userActions'


const initialState = {
    loginError: false,
    isAuthenticated: false,
    userInfo:null,
    failAcknowledge:true
}

export default function(state = initialState, action) {
    const { type, payload} = action;
    switch(type) {
        case UserActionTypes.LOGIN_SUCCESS:
        case UserActionTypes.REGISETER_USER:
            return { ...state, loginError: false, isAuthenticated: true, userInfo: { ...payload }}
        case UserActionTypes.LOGIN_FAIL:
            return { ...state, loginError: true, failAcknowledge:false }
        case UserActionTypes.LOGOUT:
            return { ...state, ...initialState }
        case UserActionTypes.FAIL_ACKNOWLEDGE:
            return { ...state, failAcknowledge: true }
        default:
            return state
    }
}