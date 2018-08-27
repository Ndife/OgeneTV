import React, {Component} from 'react';
import './Search.css';
import { withRouter } from 'react-router-dom';
import spinner from './assets/spinner.gif';


// const Api_key = 'd013a387b3c354c8c90a27a0d125b352';


class Search extends Component{
    constructor(){
		super();

		this.state = {
			searchResults: [],
			searchQuery: '',
			loading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
		this.handleRender = this.handleRender.bind(this);
	}


    handleChange = (e) => {
        const searchQuery = e.target.value;

		this.setState({ 
			searchQuery, 
			// loading: true 
		});

		if(!searchQuery){
			this.setState({
				loading: false
			})
			return '';
		}

        fetch(`https://ogenetv.herokuapp.com/movies/search/${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    searchResults: data
                })
                console.log(data[0].title)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleRender(title){
		this.setState({
			searchQuery: '',
			searchResults: []
		})

		this.props.history.push(`/rent/${title}`);
    }
    
    renderSearch(){
		const { searchResults, searchQuery, loading } = this.state;

		if(!searchQuery) {
			return '';
		}

		if(searchResults.length > 0){
			return (
				<div className='Search-result-container'>
					{searchResults.map((result) => {
						return (
							<div key={result._id} className='Search-result' onClick={() => { this.handleRender(result._id)}}>
								{result.title}
							</div>
						)
					})}
				</div>
			);
		}

		if(!loading){
			return (
				<div className='Search-result-container'>
					<div className='Search-no-result'>
						No results found.
					</div>
				</div>
			);
		}
	}





    render(){
        let { loading, searchQuery } = this.state;
        return(
            <form onSubmit={(e) => e.preventDefault()}>
                <input value={searchQuery} onChange={this.handleChange} className="search-input" type="search" placeholder="search movies" />

                {this.renderSearch()}

                {loading && <div style={{
                     width: '10%',
                     position: 'relative',
                     marginTop: '7%',
                     marginLeft: '45%',
                     alignItems: 'center',
                     right: '750px',
                     top: '423px',
                }}><img alt="spinner" src={spinner}/></div>}
            </form>
        );
    }
}

export default withRouter(Search);