import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
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


class App extends Component {
  state={
    isAuth: false
  }
componentDidMount(){
 
}

  render()  {
    return(
   
      <BrowserRouter>
       
        <div >  
        
          <Switch>
            
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Homepage} exact/>
            <Route path="/" component={RecentMovies} exact/>
            <Route path="/categories" component={CategoryMovies} exact/>
            <Route path="/trends" component={Trends}exact/>
            <Route path="/upload" component={AdminTester} exact/>
            <Route path="/admin" component={Dashboard}/>
            <UserRoutes path="/movies/:id" component={WatchMovies} exact/>
            <Route path="/payment" component={Payment}/>
            <Route path="/rent/:id" component={RentMovies} />
            <Route component={Error}/>
            
          </Switch>
        </div>
      
      </BrowserRouter>
      
    );
  }
}

export default App;
