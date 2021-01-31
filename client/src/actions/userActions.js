import axios from 'axios'


export const UserActionTypes = { 
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISETER_USER: 'REGISTER_USER',
    LOGOUT: 'LOGOUT',
    FAIL_ACKNOWLEDGE: 'FAIL_ACKNOWLEDGE'
}

export const getMe = () => async dispatch => {

    try{
        const res = await axios.get('/api/me')
        dispatch({
            type: UserActionTypes.LOGIN_SUCCESS,
            payload: res.data
        })
    
    } catch (e) {
        console.log(e)
    }
}

export const registerUser = (newUser, history) => async dispatch => {
    try{
        const res = await axios.post('/api/user', newUser);
        dispatch({
            type: UserActionTypes.REGISETER_USER,
            payload: res.data
        })
        history.push('/')
    } catch (e) {
        dispatch({ type: UserActionTypes.LOGIN_FAIL })
    }
}

export const loginUser = (credentials, history) => async dispatch => {
    try{
        const res = await axios.post('/api/login', credentials)
        dispatch({
            type: UserActionTypes.LOGIN_SUCCESS,
            payload: res.data
        })
        history.push('/')
    } catch (e) {
        dispatch({ type: UserActionTypes.LOGIN_FAIL })
    }
}

export const logout = (history) => async dispatch => {
    try {
        const res = await axios.post('/api/logout')
        dispatch({ type: UserActionTypes.LOGOUT })
        history.push('/')
    } catch (e) {
        console.log(e)
    }
}

export const failAcknowledge = () => async dispatch => {
    dispatch({
        type: UserActionTypes.FAIL_ACKNOWLEDGE
    })
}