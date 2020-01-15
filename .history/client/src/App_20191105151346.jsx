import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';

class App extends React.Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',

  }

  checkForLocalToken = () => {
    // Look in local storage for token
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // if no token remove all evidence of mernToken from local storage
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      axios.post('/auth/me/from/token', {token})
      .then( response => {
        // if token is found, verify it on the back end
        if (response.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        } else {
          // if verified store it in local storage and state
          localStorage.setItem('mernToken', response.data.token)
          this.setState({
            token: response.data.token,
            user: response.data.user
          })
        }
      })
    }
  }


  render () {
    return (

    )
  }
}

export default App;
