import React, { Component } from 'react'
import { connect } from "react-redux"; 
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


const mapStateToProps = ({ user }) => { 
    return { user };
};

const protectedRoute = (ChildComponent) =>
    class Composed extends Component {
        
        render () { 
            if(this.props.user.isAuthenticated) {
                return <ChildComponent {...this.props} />
            }
            return <Redirect to="/" />
        }
    }

export default compose(connect(mapStateToProps), protectedRoute);