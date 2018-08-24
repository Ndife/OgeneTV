import React from 'react';
import './Users.css'
import axios from 'axios'

class Users extends React.Component{
    state = {
        userDetails: []
    }

    componentDidMount(){
        axios.get(`https://ogenetv.herokuapp.com/admin/getUsers`)
    .then(res => {
      console.log(res)
      this.setState({ userDetails: res.data.message})
      console.log(this.state.userDetails)
    // 
    })
    }




        render(){
            return(
                <table id="customers">
                    <tr>
                        <th>User_Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                        {this.state.userDetails.map(details =>{
                return(
                    <tr key={details.id}>

                        <td >{details._id}</td>
                        <td >{details.username}</td>
                        <td >{details.email}</td>
                    </tr>)
                        })}
                        
                </table>
            )
        }
    }
    
    export default Users