import React from 'react';
import Navigation from './Navigation';
import UserTab from './UserTab';
import './Homepage.css';
import '../App';
import MovieTab from './MovieTabs';



const Homepage = () =>{
  if (sessionStorage.getItem('user')){
    return(
      <div className='home'>
        <Navigation/>
       
        <UserTab/>
       
      </div>
    );
  }else{
  return(
    <div className='home'>
      <Navigation/>
     
      <MovieTab/>
     
    </div>
  );
}
}

export default Homepage;