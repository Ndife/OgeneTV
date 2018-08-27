import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './Recent.css';
import {Link} from 'react-router-dom';
// import Homepage from './Homepage';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    margin: 0,
  },
//   paperCards:{
//     flexBasis: 'auto!important',
//     maxWidth: '100%',
//   },
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
    backgroundColor: '#000',
    boxShadow: '4px 4px 8px 0 rgba(20, 13, 13, 0.2)',
    cursor: 'pointer',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

// const Api_key = 'd013a387b3c354c8c90a27a0d125b352';
class RentedMovies extends React.Component {
  state = {
    spacing: '16',
    movies: []
  };
  
  componentDidMount(){
    
    // axios.get(`https://ogenetv.herokuapp.com/movies/`)
    // .then(res => {
    //   console.log(res)
    //   this.setState({ movies: res.data.movies})
    //   console.log(this.state.movies)
    // })
    
  }
  
  
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  
  render() {
    const { classes } = this.props;
    const { spacing, movies } = this.state;
    if(movies.length > 0){

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
                              <p>{movie.title.length < 20 ? `${movie.title}`: `${movie.title.substring(0, 25)}...`}</p>
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
                                <Link to={{
                                    pathname: `/rent/${movie._id}`,
                                    state: { movies: movie.title}
                                    }}><button className='view-btn'>More Details</button>
                                  </Link>
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
  }else{
    return(
    <div>
      <h1>No movies in your Library</h1>
    </div>
    )
  }
  }
}

RentedMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RentedMovies);