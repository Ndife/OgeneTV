import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import axios from 'axios';
// import Validator from "validator";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  button: {
    margin: theme.spacing.unit,
    marginTop: "30px",
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
    marginTop: "30px",
  },
  menu: {
    width: 200,
  },
});

class Signup extends React.Component {
   constructor(props){
       super(props)
       this.state = {
        username: "",
        email: "",
        password:"",
       };
   }
  
   handleChange = event =>{
     this.setState({

       [event.target.id]: event.target.value
     });
  
    };

    handleSubmit = (e) => {
      e.preventDefault();

        let data = {...this.state}
        console.log(data)

      axios.post("https://affiammuta.herokuapp.com/users/create", data)
      .then(res =>{
          if (res.status == 200){
            console.log(res)
            console.log(res.data);
            this.props.history.push('/')
          }
         
      })
      
    }  

    render() {
      const { classes } = this.props;
  
      return (
          <div>
          <Navigation/>
        <form className={classes.container} row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange}
            margin="auto"
          />
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
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          onChange={this.handleChange}
          margin="auto"
        />
        <Button variant="contained" color="primary" className={classes.button}
        type="submit">
        Login
      </Button>
        </form>
        </div>
        );
    }
};


Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);