import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { useHistory } from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return(
    <div className="nav-bar-wrapper">
        <ul className="nav-bar">
            <li><NavLink to='/'>Home</NavLink></li>
            {!user.isAuthenticated &&
            <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/sign-up'>Signup</NavLink></li>
            </>
            }
            {user.isAuthenticated &&
            <>
                <li><NavLink to='/post-article'>New Article</NavLink></li>
                <li><a onClick={()=> dispatch(logout(history))}>Logout</a></li>
                <li><span>Welcome {user.userInfo.name}</span></li>
            </>
            }
        </ul>
    </div>
    )
}

export default NavBar