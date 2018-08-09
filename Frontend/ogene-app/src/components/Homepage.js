import React from 'react';
import Navigation from './Navigation';
import RecentMovies from './Recent';
import {Link} from 'react-router-dom';
import './Homepage.css';

const Homepage = () =>{
  return(
    <div>
      <Navigation/>
      <div>
        <Link to="/"><p>Recent</p></Link> 
        <Link to="/"><p>Categories</p></Link>
      </div> 
      <RecentMovies/>
    </div>
  );
}

export default Homepage;