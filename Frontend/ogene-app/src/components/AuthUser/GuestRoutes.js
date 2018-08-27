import React from 'react'
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom'

const GuestRoutes = ({component: Component, ...rest}) => (
<Route
    {...rest}
    render ={props =>
    !sessionStorage.getItem('user') ? <Component {...props}/> : <Redirect to="/"/>}
/>
);

GuestRoutes.PropTypes = {
    component: PropTypes.func.isRequired,
}

export default GuestRoutes;