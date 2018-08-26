import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import axios from 'axios';
import './MovieLibrary.css';



const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    margin: 0,
  },
  cards: {
    flexGrow: 0,
    maxWidth: '100%',
    padding: '20px',
    flexBasis: 'auto!important',
  },
  paper: {
    height: 260,
    width: 214,
    borderBottomRightRadius: "15PX",
    borderTopLeftRadius: "15px",
    cursor: 'pointer',
    backgroundColor: '#0e0d0d',
    zIndex: 10,
    marginRight: '13px',
    boxShadow: '2px 1px 5px #474141',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class MovieLibrary extends React.Component {
  state = {
    spacing: '16',
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]
  };
  
//   componentDidMount(){
    
//     axios.get(`https://ogenetv.herokuapp.com/movies/recent`)
//     .then(res => {
//       console.log(res)
//       this.setState({ movies: res.data.movies})
//       console.log(this.state.movies)
//     })
    
//   }
  
  
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  
  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
        <div>
      <Grid container className={classes.root} spacing={40}>
            <Grid item xs={6} sm={3} className={classes.cards}>
            <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                {this.state.movies.map(movie => (
                <Grid key={movie} item>
                    <Paper className={classes.paper} >
                        <div className="image-api">
                          <img className="recent-image" src={movie.image} alt=''/>
                        </div>
                          <div className="items">
                            <div className="sub-items">
                              {/* <p>{movie.title.length < 20 ? `${movie.title}`: `${movie.title.substring(0, 25)}...`}</p> */}
                            </div>
                            <div className='star-rating'>
                              <i className="fa fa-star"></i><i className="fa fa-star"></i>
                              <i className="fa fa-star"></i><i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className='rating'>
                              <div className='sub-item2'>
                              <i className="fa fa-heart"></i>
                              </div>
                              <div className="sub-item1">
                                
                                <button className='view-btn'>More Details</button>
                            
                              </div>
                            </div>
                          </div>
                    </Paper>
                </Grid>
                ))}
            </Grid>
            </Grid>
      </Grid>
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieLibrary);