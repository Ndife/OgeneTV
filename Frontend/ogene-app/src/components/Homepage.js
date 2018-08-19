import React from 'react';
import Navigation from './Navigation';
// import RecentMovies from './Recent';
// import {Link} from 'react-router-dom';
import './Homepage.css';
import '../App';
// import Trends from './Trends';
import MovieTab from './MovieTabs';
// import Category from './Category';
// import Recent from './Recent';

const Homepage = () =>{
  return(
    <div className='home'>
      <Navigation/>
      {/* <Category/> */}
      {/* <div className='container-nav'>
        <Link to="/" className='container-nav-recent'><p>Recent</p></Link> 
        <Link to="/categories"  className='container-nav-category'><p>Categories</p></Link>
      </div>  */}
      <MovieTab/>
      {/* <div className='container-body'>
        <Link to="/trends" className='container-nav-recent'><p>Trends</p></Link> 
      </div> */}
    </div>
  );
}

export default Homepage;