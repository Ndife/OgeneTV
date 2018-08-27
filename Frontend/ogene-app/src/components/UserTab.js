import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import RecentMovies from './Recent';
import CategoryMoviesTab from './Categorytab';
import Trends from './Trends';
import RentedMovies from './RentedMovies'

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
    margin: 'auto',
    marginTop: "100px",
    backgroundColor: 'transparent',
  },

  navBar:{
    // backgroundColor: '#002f43',
    backgroundColor: 'transparent'
  },

  typo: {
    color: 'white'
  }
});

class UserTab extends React.Component {
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
            <Tab label="Rented Movies" />
            <Tab label="Recent" />
            <Tab label="Category" />
            <Tab label="Trends" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
        <TabContainer dir={theme.direction}><RentedMovies/></TabContainer>
          <TabContainer dir={theme.direction}><RecentMovies/></TabContainer>
          <TabContainer dir={theme.direction}><CategoryMoviesTab/></TabContainer>
          <TabContainer dir={theme.direction}><Trends/></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

UserTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserTab);
