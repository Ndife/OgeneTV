import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link } from 'react-router-dom';

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
    backgroundColor: 'transparent'
  }
};


function Navigation(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {/* <AppBar className={classes.app} position="static"> */}
        <Toolbar className={classes.app}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            News
          </Typography>
          <Link to ='/login'><Button color="inherit">Login</Button></Link>
          <Link to ='/signup'><Button color="inherit">Signup</Button></Link>
          <Link to ='/'><Typography variant="title" color="inherit">Home</Typography></Link>
        </Toolbar>
      {/* </AppBar> */}
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
