import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../Homepage.css';
import '../Recent.css';
import {Link} from 'react-router-dom';
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
    height: 230,
    width: 193,
    borderBottomRightRadius: "15PX",
    borderTopLeftRadius: "15px",
    backgroundColor: '#000',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class DramaMovies extends React.Component {
  state = {
    spacing: '16',
    movies: ['Action', 'gun', 'shoot', 'Action', 'gun', 'shoot', 1, 2, 3, 4]
  };

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
      <Grid container className={classes.root} spacing={16}>
            <Grid item xs={6} sm={3} className={classes.cards}>
            <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                {this.state.movies.map(movie => (
                <Grid key={movie} item>
                    <Paper className={classes.paper} >
                        <div className="image-api">
                          <img className="recent-image" src={movie} alt=''/>
                        </div>
                          <div className="items">
                            <div className="sub-items">
                              {/* <p>{movie.title.length < 20 ? `${movie.title}`: `${movie.title.substring(0, 25)}...`}</p> */}
                            </div>
                            <div>
                              <p>producer </p>
                            </div>
                            <div className='rating'>
                              <div className='sub-item2'>
                                <p>price </p>
                              </div>
                              <div className="sub-item1">
                                <Link to={{
                                    pathname: `/rent/${movie.recipe_id}`,
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
  }
}

DramaMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DramaMovies);