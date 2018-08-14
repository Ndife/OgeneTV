import React, {Component} from 'react';
import './Search.css';
// import axios from 'axios';

const Api_key = 'd013a387b3c354c8c90a27a0d125b352';


class Search extends Component{
state = {
    movies: []
}

    searchMovies = async (e) => {
        // const movieName = e.target.elements.movieName.value;
        e.preventDefault();
        const api_call = await fetch(`https://cors-anywhere.herokuapp.com/food2fork.com/api/search?key=${Api_key}&
        q=shredded%20chicken&count=10`)
        
        const data = await api_call.json('')
        this.setState({
            movies: data
        });
        console.log(this.state.movies)
    }
    render(){

        return(
            <form onSubmit={this.searchMovies}>
            <input className="search-input" type="search" name='movieName' placeholder="search movies"/>
            </form>
        );
    }
}

export default Search