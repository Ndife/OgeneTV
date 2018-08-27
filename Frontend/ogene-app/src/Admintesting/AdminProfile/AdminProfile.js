import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import './AdminProfile.css';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  btn:{
      color: '#FFFFFF',
      height: '35px',
      fontSize: '23px',
      minWidth: '40px',
      minHeight: '18px',
      backgroundImage: 'linear-gradient(to right, #049EE1, #312783 )',
      // borderTopLeftRadius: '11px',
      // borderBottomRightRadius: '10px',
      borderRadius: '15px',
      width: '30px',
      marginRight: '10px',
  }
});

class AdminProfile extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const Logout = () =>{
        sessionStorage.removeItem('user');
      }
    return (
      <div className={classes.root}>
        <div>
          <Button
           className={classes.btn}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <i className='fa fa-user'></i>
          </Button >
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}><Link to ='/library'><Button color="inherit">Profile</Button></Link></MenuItem>
                      <MenuItem onClick={this.handleClose}><Link to ='/'><Button color="inherit" onClick={ () => Logout()}>Logout</Button></Link></MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

AdminProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminProfile);