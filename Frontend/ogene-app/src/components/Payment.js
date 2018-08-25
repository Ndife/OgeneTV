import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';
import './Payment.css';
// import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Link} from 'react-router-dom';
import logo from './assets/logo.png';


const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'white',
    // height: '365px',
    boxShadow: '0px 4px 8px 0px #7a6a6a',
    width: '60%',
    margin: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: "30px",
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
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

  formControl: {
    margin: 0,
  },
  group: {
    display: 'block',
  },
  formText: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',    
    marginLeft: '0',
    marginRight: '16px',
    verticalAlign: 'middle'
  }
});

class Payment extends React.Component {
   constructor(props){
       super(props)
       this.state = {

           cardNumber: "",
           expDate: "",
           cvv:"",
           pin: "",
           loading: false,
           value: 'Mastercard',
       };
   }
//    handleChange = event => {
//     this.setState({ selectedValue: event.target.value });
//   };

   handleChange = event =>{
       event.preventDefault()
     this.setState({

    //    [event.target.id]: event.target.value
       value: event.target.value,
       [event.target.id]: event.target.value
     });
    };

    handleSubmit = e =>{
        e.preventDefault()
        console.log(this.state)
    }
  

    render() {
      const { classes } = this.props;
  
      return (
        <div>
          <div><Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link></div>
        <div className='form-container'>
        <FormControl component="fieldset" className={classes.formControl}>
            <form className={classes.container} row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <div>
                <RadioGroup
                    aria-label="payment"
                    name="payment"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <FormControlLabel value="Mastercard" control={<Radio />} label="Mastercard" className={classes.formText} />
                    <FormControlLabel value="visa" control={<Radio />} label="Visa" />
                    <FormControlLabel value="verve" control={<Radio />} label="Verve" />
                </RadioGroup>
                </div>
                <div className="payment-details">
                <TextField
                    id="cardNumber"
                    label="Card Number"
                    className={classes.textField}
                    // value={this.state.cardnumber}
                    onChange={this.handleChange}
                    margin="auto"
                    />
                <TextField
                    id="expDate"
                    label="Exp: date"
                    className={classes.textField}
                    type="number"
                    onChange={this.handleChange}
                    margin="auto"
                    />
                    <TextField
                    id="cvv"
                    label="CVV"
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChange}
                    margin="auto"
                    />
                <TextField
                    id="pin"
                    label="Pin"
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChange}
                    margin="auto"
                    />
                </div>
                <Button variant="contained" color="primary" className={classes.button}
                type="submit">
                Pay
                </Button>
            </form>
    </FormControl>
        </div>
        </div>
        );
    }
};


Payment.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Payment);
