import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.css';
import './Signup.css';
import {Link} from 'react-router-dom';
import logo from './assets/logo.png';
// import Typography from '@material-ui/core/Typography';
// import Validator from "validator";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    boxShadow: '2px 0px 8px 3px #b7c3d3',
    width: '60%',
    margin: 'auto',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
    

  button: {
    margin: theme.spacing.unit,
    marginTop: "30px",
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    // backgroundColor: "#5858f3",
    backgroundImage: 'linear-gradient(to right, #049EE1, #312783 )'
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: 10,
    marginRight: 15,
    width: 260,
    marginTop: "40px",
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
        confirmPassword: "",
        loading: false,
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

        if(this.state.password !== this.state.confirmPassword){
          alert("password don't match")
        }

      axios.post("https://ogenetv.herokuapp.com/users/signUp", data)
      .then(res =>{
        console.log(res.data.message)
        
        if (res.status === 200){
          console.log(res)
          console.log(res.data.message);
          sessionStorage.setItem('user', res.data.token);
          this.props.history.push('/')
        }
        // if(res.status == 409){
        //   console.log(res)
        // }
      })
      // .catch(err =>{
      //   console.log(err.data.message)
      //   if(err.status === 409){
      //     console.log(err.data.message)
      //   }
      // })
    }  

    render() {
      const { classes } = this.props;
  
      return (
        <div>
          <div><Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link></div>
          <div className='form-container'>
        <form className={classes.container} row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className='facebook-signup'><p>Sign up with <i className='fa fa-facebook' id='icon'></i></p></div>
        <div className='signup-details'>
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
          type="email"
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
        <TextField
             id="confirmPassword"
             label="ConfirmPassword"
             className={classes.textField}
             type="password"
             autoComplete="confirm-password"
             onChange={this.handleChange}
             margin="auto"
             />
             </div>
             <div className='signup-btn'>
                <div className='signup-btn' >
                  <Button variant="contained" color="primary" className={classes.button}
                    type="submit">
                    Sign up
                </Button>
              </div>
              <div className='signup-alt'>
                <p>Already a member? <Link to ='login'>Login</Link></p>
              </div>
            </div>
        </form>
        </div>
        </div>
        );
    }
};


Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);