import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      posts: []
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

  getPosts =() => {
    axios.get('https://lee-tann-node-blog.herokuapp.com/api/posts')
    .then(res => {
      console.log(res)
      this.setState(() => ({ posts: res.data }))
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getUsers()
    this.getPosts()
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <p>Lee's Node Blog</p>
        <div>
          <p>POSTS:</p>
          {this.state.posts.map(post => {
            return(
              <p key={post.id}>Post: {post.text}</p>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
