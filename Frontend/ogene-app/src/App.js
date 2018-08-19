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
import ActionMovies from './components/SubCategories/Action';
import ComedyMovies from './components/SubCategories/Comedy';
import CrimeMovies from './components/SubCategories/Crime';
import DramaMovies from './components/SubCategories/Drama';
import EpicMovies from './components/SubCategories/Epic';
import HorrorMovies from './components/SubCategories/Horror';
import RomanceMovies from './components/SubCategories/Romance';
import AdminTester from './components/Admintesting/AdminUpload';
import RentMovies from './components/RentMovies';
// import GuestRoutes from './components/AuthUser/GuestRoutes';
import UserRoutes from './components/AuthUser/UserRoutes';


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
            <Route path="/action" component={ActionMovies} exact/>
            <Route path="/comedy" component={ComedyMovies}/>
            <Route path="/crime" component={CrimeMovies}/>
            <Route path="/drama" component={DramaMovies}/>
            <Route path="/epic" component={EpicMovies}/>
            <Route path="/horror" component={HorrorMovies}/>
            <Route path="/romance" component={RomanceMovies}/>
            <Route path="/admin" component={AdminTester} exact/>
            <UserRoutes path="/rent/:id" component={RentMovies} exact/>
            <Route component={Error}/>
            
          </Switch>
        </div>
      
      </BrowserRouter>
      
    );
  }
}

export default App;
