import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
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

class Login extends React.Component {
   constructor(props){
       super(props)
       this.state = {
        username: "",
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

    handleSubmit = (e) => {
      e.preventDefault();

      const {username, email, password } = this.state;

      fetch('https://affiammuta.herokuapp.com/users')
      .then(res => res.json())
      .then(data => {
        data.filter(user => {
          if(user.username === username && user.email === email && user.password === password){
            this.setState({
              username: "",
              email: "",
              password: "",
              user
            });
            return true
          }
        })

        this.handleLogin(this.state.user)
      }).catch(err => {
        console.log(err)
      })
    }

    handleLogin = (user) => {
      if(user.email !== undefined){
        console.log('welcome ', this.state.user)
      }else{
        console.log('invalid', this.state.user)
      }
    }
    
    // onSubmit =() =>{
        //     const errors = {}
        //     if (Object.keys(errors).length === 0){
            //         console.log(errors)
            //     } else {
                //         alert('Email address is ' + this.state.email + ' Password is ' + this.state.password)
                
                //     }
                
                // }

            // submit = () => {
            //     axios.post('/signin', {
            //         email: this.state.email,
            //         password: this.state.password
            //       })
            //       .then(function (response) {
            //         console.log('route me');
            //       })
            //       .catch(function (error) {
            //         console.log(error);
            //       });
            // }
            

    // onSubmit = (event) => { 
    //     const errors = this.validate(this.state.data);
    //     this.setState({ errors });
    //     event.preventDefault();
    //     if (Object.keys(errors).length === 0){
    //         this.submit(this.state.data)
    //     } else {
    //         alert('wrong details');
    //     }
    // };

    // validate = (data) => {
    //     const errors = {}
    //     if(!Validator.isEmail(data.email)) errors.email = "Invalid email"
    //     if(!data.password) errors.password = "Can't be blank"
    //     return errors
    // }
  
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
          value={this.state.password}
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


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);