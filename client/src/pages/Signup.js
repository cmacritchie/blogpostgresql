import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Credentials from '../components/Credentials'
import { registerUser, failAcknowledge } from '../actions/userActions'
import { useHistory } from "react-router-dom";

const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    

    useEffect(() => {
        return () => { 
            if(user.loginError) {
                dispatch(failAcknowledge()) 
            }
        }
    },[])

    const submit = (info) => {
        dispatch(registerUser(info, history))
    }

    return(
        <div className='login-wrapper'>
            <h1> Sign Up</h1>
            <Credentials onSubmit={submit} email={true} />
            {(user.loginError && !user.failAcknowledge) &&
                <h1>Failed to Login User</h1>
            }
        </div>
    )
}

export default Signup