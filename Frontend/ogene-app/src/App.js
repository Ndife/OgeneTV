import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from './components/Login';
import Signup from './components/Signup';
import RecentMovies from './components/Recent';
import CategoryMovies from './components/Category';
import Error from './Error/Error';
import './App.css';
import Trends from './components/Trends';
import AdminTester from './Admintesting/AdminUpload/AdminUpload';
import RentMovies from './components/RentMovies';
import WatchMovies from './components/WatchMovies';
import Payment from './components/Payment';
// import GuestRoutes from './components/AuthUser/GuestRoutes';
import UserRoutes from './components/AuthUser/UserRoutes';
import Dashboard from './Admintesting/AdminDashboard/Dashboard';
import AdminLogin from './Admintesting/AdminLogin/AdminLogin';
import AdminRoutes from './Admintesting/AdminAuth/AdminRoutes'


class App extends Component {
  state = {
    isAuth: false
  }
  componentDidMount() {

  }

  render() {
    return (

      <BrowserRouter>

        <div >

          <Switch>

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Homepage} exact />
            <Route exact path="/" component={RecentMovies} exact />
            <Route exact path="/categories" component={CategoryMovies} exact />
            <Route exact path="/trends" component={Trends} exact />
            <Route exact path="/upload" component={AdminTester} exact />
            <AdminRoutes exact path="/admin" component={Dashboard} />
            <Route exact path="/adminlogin" component={AdminLogin} />
            <UserRoutes path="/movies/:id" component={WatchMovies} exact />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/rent/:id" component={RentMovies} />
            <Route component={Error} />

          </Switch>
        </div>

      </BrowserRouter>

    );
  }
}

export default App;
