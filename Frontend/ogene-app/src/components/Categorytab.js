import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ActionMovies from './SubCategories/Action';
import ComedyMovies from './SubCategories/Comedy';
import CrimeMovies from './SubCategories/Crime';
import DramaMovies from './SubCategories/Drama';
import EpicMovies from './SubCategories/Epic';
import HorrorMovies from './SubCategories/Horror';
import RomanaceMovies from './SubCategories/Romance'


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: '92%',
    margin: 'auto'
  },

  navBar:{
    backgroundColor: '#002f43',
  },

  typo: {
    color: 'white'
  }
});

class CategoryMoviesTab extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.navBar}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            // textColor="primary"
            className={classes.typo}
            fullWidth
          >
            <Tab label="Action" />
            <Tab label="Comedy" />
            <Tab label="Crime" />
            <Tab label="Drama" />
            <Tab label="Epic" />
            <Tab label="Horror" />
            <Tab label="Romance" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><ActionMovies /></TabContainer>
          <TabContainer dir={theme.direction}><ComedyMovies /></TabContainer>
          <TabContainer dir={theme.direction}><CrimeMovies /></TabContainer>
          <TabContainer dir={theme.direction}><DramaMovies /></TabContainer>
          <TabContainer dir={theme.direction}><EpicMovies /></TabContainer>
          <TabContainer dir={theme.direction}><HorrorMovies /></TabContainer>
          <TabContainer dir={theme.direction}><RomanaceMovies /></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

CategoryMoviesTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CategoryMoviesTab);
