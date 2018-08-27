import React from 'react'
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom'

const UserRoutes = ({component: Component, ...rest}) => (
<Route
    {...rest}
    render ={props =>
    sessionStorage.getItem('user') ? <Component {...props}/> : <Redirect to="/login"/>}
/>
);

UserRoutes.PropTypes = {
    component: PropTypes.func.isRequired,
}

export default UserRoutes;