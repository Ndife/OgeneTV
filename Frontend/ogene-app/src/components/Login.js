import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Validator from "validator";
import InlineError from './Messages/InlineErrors';
import spinner from './assets/spinner.gif';
import logo from './assets/logo.png';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '365px',
    width: 374,
    marginTop: "30px",
    margin: 'auto',
    boxShadow: '2px 0px 8px 3px #b7c3d3',
    // boxShadow: '2px 2px 5px 2px #616060',
    border: '1px solid #b7c3d3',
    borderRadius: '5px',
    paddingTop: '30px',
    fontFamily: 'roboto',
    fontSize: '20px',
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: '123px',
    marginRight: '116px',
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundImage: 'linear-gradient(to right, #049EE1, #312783 )'
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
         user: {
           email: "",
           password: "",
         },
        loading: false,
        errors: {},
        showing: false
       };
   }
  
   handleChange = event =>{
     this.setState({
      user: {...this.state.user, [event.target.id]: event.target.value }
     });
    };
    submit = user =>{
      axios.post("https://ogenetv.herokuapp.com/users/login", user, {headers: { }})
      .then(res =>{
        console.log(res)
        if(res.data.message === 'email or password invalid'|| res.data.message === 'email does not exist'){
          console.log(res.data.message);
          this.setState({
            errors: res.data.message,
            showing: true
          })
          window.location.reload();
      }else{
        this.setState({
          loading: false
        })
        sessionStorage.setItem('user', res.data.currentUser.email,res.data.token);
        this.props.history.push('/')
        // window.location.reload();
      }
        this.setState({
          loading: false
        })
      })
  
      // this.props.history.push('/');
    }

    handleSubmit = (e) =>{
      e.preventDefault();
      const errors = this.validate(this.state.user);
      this.setState({ loading: true})
      this.setState({errors});
      if(Object.keys(errors).length ===0){
        this.submit(this.state.user)
      }
    };

    validate = user => {
     const errors = {};
     if (!Validator.isEmail(user.email)) errors.email = "Invalid Email";
    if (!user.password) errors.password = "cant be blank";
    return errors;
    
    }

  
      render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        // let output = { errors ? <div>{errors}</div> : ('')}
  
        return (
          <div>
            <div><Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link></div>
            <div className='form-container'>
              {loading && <div style={{
                      width: '10%',
                      position: 'absolute',
                      marginTop: '7%',
                      marginLeft: '45%',
                      alignItems: "center"
                }}><img alt="spinner" src={spinner}/></div>}


              <form className={classes.container}  row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                
                <div>
                  { this.state.showing && <div>{errors}</div>}
                </div>

                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  margin="auto"
                  />
                {errors.email && <InlineError text={errors.email}/>}
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
                {errors.password && <InlineError text={errors.password}/>}
                <br/>
                <Button variant="contained" color="primary" className={classes.button} type="submit">
                  Login
                </Button>
                <p className='message'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
              </form>
            </div>
          </div>  
        );
    }
};


Login.propTypes = {
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default withStyles(styles)(Login);