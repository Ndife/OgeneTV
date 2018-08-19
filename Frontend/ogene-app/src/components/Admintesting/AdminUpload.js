import React, {Component} from 'react';
import axios from 'axios';

class AdminTester extends Component{
    state = {
        authur: '',
        description: '',
        releaseYear: '',
        producer: '',
        category: '',
        price: '',
        selectedFile: ''
    }
    onChange=(event)=>{
        switch (event.target.name) {
           case 'selectedFile':
           this.setState({selectedFile: event.target.files[0]})
           break;
           default:
             this.setState({ [event.target.name]: event.target.value })
        }

    }
    fileUpload = ()=>{
        const {authur, description, releaseYear, price, selectedFile} = this.state
        const files = new FormData()
        files.append('authur', authur);
        files.append('description', description);
        files.append('releaseYear', releaseYear);
        files.append('price', price);
        files.append('selectedFile', selectedFile);
        files.append('selectedFile', selectedFile);
        console.log(files)

        axios({
            method: 'post',
            url: 'https://affiammuta.herokuapp.com/books/addbook',
            data: files,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            
        })
         .then(res =>{
            console.log(res)
        })

        // axios.post('https://affiammuta.herokuapp.com/books/addbook', files, {onDownloadProgress: ProgressEvent =>{
        //     console.log("upload progress: " + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
        // }})
        // method=post
    }
    render(){
        const {name, description, releaseYear, price} = this.state
            return(
                <div>
                    <form action='https://affiammuta.herokuapp.com/books/addbook' method="post" enctype='mulTipart/form-data' onSubmit = {this.fileUpload}>
                        <input 
                        type="file" 
                        name='selectedFile'
                        onChange={this.onChange}
                        />

                        <input 
                        type="file" 
                        name='selectedFile'
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='authur'
                        placeholder="authur"
                        value={name}
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='description'
                        placeholder="description"
                        value={description}
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='releaseYear'
                        placeholder="releaseYear"
                        value={releaseYear}
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='price'
                        placeholder="price"
                        value={price}
                        onChange={this.onChange}
                        />
                        
                        <button>Upload</button>
                    </form>
                </div>
            );
    }
}

export default AdminTester;
