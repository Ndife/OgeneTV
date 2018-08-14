import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Navigation from '../Navigation';
// import {Link} from 'react-router-dom';
import '../Homepage.css';
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

class ActionMovies extends React.Component {
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
            {/* <Homepage/> */}
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={6} sm={3} className={classes.cards}>
                  <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                      {this.state.movies.map(value => (
                      <Grid key={value} item>
                          <Paper className={classes.paper}>{value}</Paper>
                      </Grid>
                      ))}
                  </Grid>
                </Grid>
            </Grid>
      </div>
    );
  }
}

ActionMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionMovies);