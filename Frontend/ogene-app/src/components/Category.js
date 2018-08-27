import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Navigation from './Navigation';
import {Link} from 'react-router-dom';
import './Homepage.css';
import axios from 'axios';
// import Homepage from './Homepage';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
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
    height: 220,
    width: 214,
    borderBottomRightRadius: "15PX",
    borderTopLeftRadius: "15px",
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const Api_key = 'd013a387b3c354c8c90a27a0d125b352';

class CategoryMovies extends React.Component {
  state = {
    spacing: '16',
    movies: []
  };

  componentDidMount(){
   
      axios.get(`https://cors-anywhere.herokuapp.com/food2fork.com/api/search?key=${Api_key}&
      q=shredded%20chicken&count=10`)
      .then(res => {
        console.log(res)
        this.setState({ movies: res.data.recipes})
        console.log(this.state.movies)
      })
      
  }

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
          <div className='container-nav'>
          <Link to="/" className='container-nav-recent'><p>Recent</p></Link> 
          <Link to="/categories"  className='container-nav-category'><p>Categories</p></Link>
        </div> 
        <div className='container-category'>

        <Grid container className={classes.root} spacing={40}>
          <Link to="/action" className='container-nav-recent'><p>Action</p></Link> 
          <Link to="/comedy"  className='container-nav-category'><p>Comedy</p></Link>
          <Link to="/crime" className='container-nav-recent'><p>Crime</p></Link> 
          <Link to="/drama"  className='container-nav-category'><p>Drama</p></Link>
          <Link to="/epic" className='container-nav-recent'><p>Epic</p></Link> 
          <Link to="/horror"  className='container-nav-category'><p>Horror</p></Link>
          <Link to="/romance" className='container-nav-recent'><p>Romance</p></Link> 
          </Grid>
        </div> 
      
       {/* <Homepage/> */}
        <Grid container className={classes.root} spacing={16}>
              <Grid item xs={6} sm={3} className={classes.cards}>
              <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                  {this.state.movies.map(movie => 
                  <Grid key={movie} item>
                      <Paper className={classes.paper}>{movie.title}</Paper>
                  </Grid>)}
              </Grid>
              </Grid>
        </Grid>
      </div>
    );
  }
}

CategoryMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryMovies);