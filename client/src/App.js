import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  getUsers = () => {
    axios.get('https://lee-tann-node-blog.herokuapp.com/api/users')
    .then(res => {
      console.log(res)
      this.setState(() => ({ users: res.data }))
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <p>Lee's Node Blog</p>
        <p>USERS:</p>
        {this.state.users.map(user => {
          return(
            <p key={user.id}>NAME: {user.name}</p>
          )
        })}
      </div>
    );
  }
}

export default App;
