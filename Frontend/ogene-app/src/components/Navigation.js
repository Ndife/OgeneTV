import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link } from 'react-router-dom';
import Search from './Search';
import MenuToggle from './Menutoggle';

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
    backgroundColor: 'transparent',
  },
 
};


function Navigation(props) {
  
  const { classes } = props;
  return (
    <div className={classes.root} >
      <AppBar className={classes.app} position="static">
        <Toolbar className={classes.app.menuButton}  >
          <Typography variant="title" color="inherit" className={classes.flex}>
          <Link to ='/'>Ogenetv</Link>
          </Typography>
          <Search/>
          <MenuToggle/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
