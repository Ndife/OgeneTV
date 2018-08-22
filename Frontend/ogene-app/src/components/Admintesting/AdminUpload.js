import React, {Component} from 'react';
import axios from 'axios';

class AdminTester extends Component{
    state = {
        title: '',
        description: '',
        releaseYear: '',
        producer: '',
        category: '',
        price: '',
        image: '',
        video: ''
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
        const {title, description, releaseYear, producer, price, image, video} = this.state
        const files = new FormData()
        files.append('authur', title);
        files.append('description', description);
        files.append('releaseYear', releaseYear);
        files.append('producer', producer);
        files.append('price', price);
        files.append('image', image);
        files.append('video', video);
        console.log(files)

        axios({
            method: 'post',
            url: 'https://ogenetv.herokuapp.com/movies/',
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
        const {name, description, releaseYear, producer, price, category} = this.state
            return(
                <div>
                    <form action='https://ogenetv.herokuapp.com/movies/' method="post" enctype='mulTipart/form-data' onSubmit = {this.fileUpload}>
                        <input 
                        type="file" 
                        name='image'
                        onChange={this.onChange}
                        />

                        <input 
                        type="file" 
                        name='video'
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='title'
                        placeholder="title"
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
                        name='producer'
                        placeholder="producer"
                        value={producer}
                        onChange={this.onChange}
                        />

                        <input
                        type='text'
                        name='category'
                        placeholder="category"
                        value={category}
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
