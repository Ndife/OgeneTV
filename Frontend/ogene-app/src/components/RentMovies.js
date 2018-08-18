import React, {Component} from 'react';
import './RentMovies.css';
import Navigation from './Navigation';
// import rejected from './assets/rejected.jpg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import like from './assets/like.png';
import axios from 'axios';

const styles = theme =>({
  button: {
    // margin: theme.spacing.unit,
    marginLeft: '123px',
    marginRight: '116px',
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundColor: "#5858f3",
    width: 18,
  },
});

const Api_key = 'd013a387b3c354c8c90a27a0d125b352';

class RentMovies extends Component{
  state ={
    activeMovie: [],
    rentMovies: [1, 2, 3, 4, 5, 6],
  }

  componentDidMount(){
    const title = this.props.location.state.movies
    axios.get(`https://cors-anywhere.herokuapp.com/food2fork.com/api/search?key=${Api_key}&
    q=${title}`)
    .then(res => {
      console.log(res.data.recipes[0])
      this.setState({ activeMovie: res.data.recipes[0]})
      console.log(this.state.activeMovie)
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
              <img src={film.image_url} alt="film" style={{width: '100%', borderRadius: '4px'}}/>
              <div className='container-box'>
                <div className='like-btn'>
                  <img src={like} alt='like'style={{height: '30px'}}/>
                </div>
                <div className='movie-title'>
                  <p>{film.title}</p>
                </div>
                <div className='rent-btn'>
                  <Button variant="contained" color="primary" className={classes.button} type="submit">
                    Rent
                  </Button>
                </div>
              </div>
              </div>
            </div>
            <div className='container-card-col'>
            {this.state.rentMovies.map(val => (
              <div key={val} className='container-card-col1'>
               <p> {val} </p>
              </div>
            ))}
            </div>
          </div>  
      </div>
    )
  }

}

export default withStyles(styles) (RentMovies);