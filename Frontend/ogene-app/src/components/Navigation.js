import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link } from 'react-router-dom';
import Search from './Search';
import MenuToggle from './Menutoggle';
import logo from './assets/logo.png';
import './Navigation.css';
// import Validator from "validator";
// import {connect} from 'react-redux'

const styles = {
  root: {
    flexGrow: 1,
  },
  nav:{
    backgroundColor: 'black',
  },
  flex: {
    flexGrow: 1,
    color: "blue"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  app: {
    backgroundColor: '#002f43',
  },
 
};


const Navigation = (props, isAuthenticated) =>{
  const Logout = () =>{
    sessionStorage.removeItem('user');
  }
  const { classes } = props;
  if (sessionStorage.getItem('user')){
  return (
    <div className={classes.root} >
      <AppBar className={classes.app} position="static">
        <Toolbar className={classes.app.menuButton}  >
          <Typography variant="title" color="inherit" className={classes.flex}>
          <Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link>
          </Typography>
          <Search/>
         <Link to="/"><button onClick={ () => Logout()}>logout</button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );} else{
    return (
      <div className={classes.root} >
        <AppBar className={classes.app} position="static">
          <Toolbar className={classes.app.menuButton}  >
            <Typography variant="title" color="inherit" className={classes.flex}>
            <Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link>
            </Typography>
            <Search/>
            <MenuToggle/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.bool.isRequired
};

// function mapStateToProps (state){
//   return{
//     isAuthenticated: !!state.user.token
//   };
// }

export default withStyles(styles)(Navigation);
