import React, {Component} from 'react';
import './RentMovies.css';
import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './Recent.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const styles = theme =>({
  button: {
    // margin: theme.spacing.unit,
    marginLeft: '123px',
    marginRight: '116px',
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundColor: "#5858f3",
    width: 18,
    backgroundImage: 'linear-gradient(to right, #049EE1, #312783 )',
    color: '#FFFFFF'
  },
});

// const Api_key = 'a7d7788c2a57044879237c810d135ba0';

class RentMovies extends Component{
  state ={
    activeMovie: [],
    rentMovies: [],
  }

  componentDidMount(){
    const title = this.props.location.state.movies
    // const { match: { params } } = this.props;
    axios.get(`https://ogenetv.herokuapp.com/movies/${title}?`)
    .then(res => {
      console.log(res.data.movies)
      // console.log(title)
      this.setState({ activeMovie: res.data.movies[0]})
      console.log(this.state.activeMovie)
    })

    axios.get(`https://ogenetv.herokuapp.com/movies/`)
    .then(res => {
      console.log(res.data.movies)
      this.setState({ rentMovies: res.data.movies})
      console.log(this.state.rentMovies)
    })

    
}

    render(){
      console.log(this.props)
      const { classes } = this.props;
      const film = this.state.activeMovie
    return(
      <div className='wrapper'>
        <Navigation/>
        <div className='container'>
            <div className='container-card'>
              <div className='container-card-xs1'>
                <div className='rent-image'>
                  <img src={film.image} alt="film" style={{width: '100%', borderRadius: '4px', height: '423px'}}/>
                </div>
                <div className='container-box'>
                  <div className='like-btn'>
                    {/* <img src={like} alt='like'style={{height: '30px'}}/> */}
                    <i className='fa fa-heart' style={{height: '30px'}}></i>
                  </div>
                  <div className='movie-title'>
                    <p>{film.title}</p>
                    <i className='fa fa-star rating-color'></i> <i className='fa fa-star rating-color'></i>
                    <i className='fa fa-star rating-color'></i><i className='fa fa-star rating-color'></i>
                    <i className='fa fa-star rating-color'></i> 
                  </div>
                  <div className='rent-btn'>
                  <Link to={{
                      pathname: `/movies/${film._id}`,
                      state: { movies: film.title}}}>
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                      Rent
                    </Button>
                    </Link>
                  </div>
                  <br/>
                </div>
                  <div className='rent-details'>
                    <p>
                      {film.description}
                    </p>
                  </div>
              </div>
            </div>
            <div className='container-card-col'>
            {this.state.rentMovies.map(val => (
              <div key={val} className='container-card-col1'>
               {/* <img src={val.image} alt="film" style={{width: '100%', borderRadius: '4px', height: '423px'}}/> */}
               <div className="image-api">
                          <img className="recent-image" src={val.image} alt=''/>
                        </div>
                          <div className="items">
                            <div className="sub-items">
                              <p>{val.title.length < 20 ? `${val.title}`: `${val.title.substring(0, 25)}...`}</p>
                            </div>
                            <div className='star-rating'>
                              <i className="fa fa-star"></i><i className="fa fa-star"></i>
                              <i className="fa fa-star"></i><i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                            <div className='rating'>
                              <div className='sub-item2'>
                              <i className="fa fa-heart"></i>
                              </div>
                              <div className="sub-item1">
                                <Link to={{
                                    pathname: `/rent/${val._id}`,
                                    state: { movies: val.title}
                                    }}><button className='view-btn'>More Details</button>
                                  </Link>
                              </div>
                            </div>
                          </div>
              </div>
            ))}
            </div>
          </div>  
      </div>
    )
  }

}

export default withStyles(styles) (RentMovies);