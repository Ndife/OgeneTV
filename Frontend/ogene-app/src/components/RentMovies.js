import React, { Component } from 'react';
import './RentMovies.css';
import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './Recent.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


const styles = theme => ({
  // button: {
  //   // margin: theme.spacing.unit,
  //   marginLeft: '123px',
  //   marginRight: '116px',
  //   borderBottomRightRadius: "10PX",
  //   borderTopLeftRadius: "10px",
  //   backgroundColor: "#5858f3",
  //   width: 18,
  //   backgroundImage: 'linear-gradient(to right, #049EE1, #312783 )',
  //   color: '#FFFFFF'
  // },
});

// const Api_key = 'a7d7788c2a57044879237c810d135ba0';

class RentMovies extends Component {
  state = {
    activeMovie: [],
    rentMovies: [],
    userEmail: sessionStorage.getItem('user'),
    price: ''
  }
  
  componentDidMount() {
    const title = this.props.match.params.id
    axios.get(`https://ogenetv.herokuapp.com/movies/${title}`)
    .then(res => {
      console.log(res)
      this.setState({ activeMovie: res.data.message })
      this.setState({price: res.data.message.price})
    })

    
    axios.get(`https://ogenetv.herokuapp.com/movies/`)
    .then(res => {
      this.setState({ rentMovies: res.data.movies })
    })
    
      // axios.get("https://ogenetv.herokuapp.com/users/login")
      // .then(res => {
      //   this.setState({userEmail: res.data.currentUser.email})
      // })
      // console.log(this.state.userEmail)
    }
    
    componentDidUpdate() {
      const title = this.props.match.params.id;
      axios.get(`https://ogenetv.herokuapp.com/movies/${title}`)
      .then(res => {
        this.setState({ activeMovie: res.data.message })
      })
    
    }
    
    
   
    payWithPaystack=(title)=> {
        if (sessionStorage.getItem('user')){    
    const PaystackPop = window.PaystackPop;
    var handler = PaystackPop.setup({
        key: 'pk_test_643b16d2cc562281510d64a3afc5a76fbb8dfaa7',
        email: this.state.userEmail,
        amount: this.state.price,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
            custom_fields: [{
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }]
        },
        callback: function (response) {
          console.log(response)
            alert('success. transaction ref is ' + response.reference);  
            
            // <Redirect to ={`/movies/${title}`}/>
                           
            // this.state.props.history.push(`/movies/${title}`)
        },
        onClose: function () {
            alert('window closed');
        }
    });
    handler.openIframe();

  }else{
  this.props.history.push('/login')
  }
}

 
  render() {
    // console.log(this.props)
    const { classes } = this.props;
    const film = this.state.activeMovie
    return (
      <div className='wrapper'>
        <Navigation />
        <div className='container'>
          <div className='container-card'>
            <div className='container-card-xs1'>
              <div className='rent-image'>
                <img src={film.image} alt="film" className='rent-image'  />
              </div>
              <div className='container-box'>
                <div className='like-btn'>
                  {/* <img src={like} alt='like'style={{height: '30px'}}/> */}
                  <i className='fa fa-heart' style={{ height: '30px' }}></i>
                </div>
                <div className='movie-title'>
                  <p>{film.title}</p>
                  <i className='fa fa-star rating-color'></i> <i className='fa fa-star rating-color'></i>
                  <i className='fa fa-star rating-color'></i><i className='fa fa-star rating-color'></i>
                  <i className='fa fa-star rating-color'></i>
                </div>
                <div className='rent-btn'>
                  {/* <Link to={{
                    pathname: `/movies/${film._id}`,
                    state: { movies: film.title }
                  }}> */}
                    <Button variant="contained" color="primary" className='RentMovies-button-1' type="submit" onClick={this.payWithPaystack}>
                      Rent
                    </Button>
                  {/* </Link> */}
                </div>
                <br />
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
                  <img className="recent-image" src={val.image} alt='' />
                </div>
                <div className="items">
                  <div className="sub-items">
                    <p>{val.title.length < 20 ? `${val.title}` : `${val.title.substring(0, 25)}...`}</p>
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
                        state: { movies: val.title }
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

export default withStyles(styles)(RentMovies);