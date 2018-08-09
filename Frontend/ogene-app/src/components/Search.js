// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import './Search.css';
// // import Validator from "validator";

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',

//   },
//   button: {
//     margin: theme.spacing.unit,
//     marginTop: "30px",
//   },
//   input: {
//     display: 'none',
//   },

//   textField: {
//     // marginLeft: theme.spacing.unit,
//     // marginRight: theme.spacing.unit,
//     marginLeft: -8,
//     marginRight: 10,
//     width: 100,
//   },
//   menu: {
//     width: 50,
//   },
// });

// class Search extends React.Component {
//    constructor(props){
//        super(props)
//        this.state = {
//        };
//    }
  
  
  
//     render() {
//       const { classes } = this.props;
  
//       return (
//         <form   row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
//         <TextField
//         className=".search-input"
//           id="search"
//           label="Search field"
//           type="search"
//           className={classes.textField}
//           margin="normal"
//         />
//         </form>
//         );
//     }
// };


// Search.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Search);





import React, {Component} from 'react';
import './Search.css';

class Search extends Component{
    render(){

        return(
            <form>
            <input className="search-input" type="search" placeholder="search movies"/>
            </form>
        );
    }
}

export default Search