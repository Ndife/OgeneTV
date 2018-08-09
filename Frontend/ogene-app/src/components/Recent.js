import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class RecentMovies extends React.Component {
  state = {
    spacing: '16',
    movies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
       
      <Grid container className={classes.root} spacing={40}>
            <Grid item xs={6} sm={3} className={classes.cards}>
            <Grid container className={classes.paperCards} justify="center" spacing={Number(spacing)}>
                {this.state.movies.map(value => (
                <Grid key={value} item>
                    <Paper className={classes.paper} />
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