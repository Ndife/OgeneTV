import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './Recent.css';
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

class RecentMovies extends React.Component {
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
      <Grid container className={classes.root} spacing={40}>
            <Grid item xs={6} sm={3} className={classes.cards}>
            <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                {this.state.movies.map(movie => (
                <Grid key={movie} item>
                    <Paper className={classes.paper} >
                          <img className="recent-image" src={movie.image_url} alt=''/>
                          <p>{movie.title}</p>
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

RecentMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentMovies);