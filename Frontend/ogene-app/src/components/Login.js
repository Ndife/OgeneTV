import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './Login.css';
// import Validator from "validator";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '-moz-fit-content',
    margin: 'auto',
    height: '365px',
    boxShadow: '0px 4px 8px 0px #7a6a6a',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: "30px",
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundColor: "#5858f3",
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginTop: "30px",
  },
  menu: {
    width: 200,
  },
});

class Login extends React.Component {
   constructor(props){
       super(props)
       this.state = {
        email: "",
        password:"",
        user: {}
       };
   }
  
   handleChange = event =>{
     this.setState({

       [event.target.id]: event.target.value
     });
  
    };

  
    render() {
      const { classes } = this.props;
  
      return (
          <div className='form-container'>
        <form className={classes.container}  row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange}
            margin="auto"
          />
           <TextField
          id="password"
          label="P0assword"
          className={classes.textField}
          type="password"
          value={this.state.password}
          autoComplete="current-password"
          onChange={this.handleChange}
          margin="auto"
        />
        <Button variant="contained" color="primary" className={classes.button}
        type="submit">
        Login
      </Button>
      <p className='message'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </form>
        
        </div>
        );
    }
};


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);