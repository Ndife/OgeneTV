import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from './components/Login';
import Signup from './components/Signup';
import RecentMovies from './components/Recent';

// import Navigation from "./Components/Navigation";
// import './App.css'; 

class App extends Component {
  state={
    isAuth: false
  }
componentDidMount(){
 
}

  render()  {
    return(
   
      <BrowserRouter>
       
        <div style={{backgroundColor: "#332d2d"}}>  
        
          <Switch>
            
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Homepage} exact/>
            <Route path="/recent" component={RecentMovies} exact/>
            <Route component={Error}/>
          </Switch>
        </div>
      
      </BrowserRouter>
      
    );
  }
}

export default App;
