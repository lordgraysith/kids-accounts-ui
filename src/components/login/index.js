import React, { Component } from 'react'
import { TextField, Button, CircularProgress } from 'react-md'
import { withRouter } from 'react-router'
import { authenticate } from '../../stores/auth'
import './index.css'

class Login extends Component {
  state = { loading: false, passcode: '' }

  async login () {
    try {
      this.setState({ loading: true })
      await authenticate(this.state.passcode)
      this.props.history.push('/')
    } catch (ex) {
      this.setState({ error: ex.message, loading: false })
    }
  }

  render () {
    const { loading, passcode, error } = this.state
    return (
      <div className='main-login'>
        <h1 className='center'>Enter Passcode</h1>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <div className='passcode-entry'>
            <TextField
              value={passcode}
              onChange={val => this.setState({ passcode: val })}
              error={!!error}
              errorText={error}
              type='password'
            />
            <Button
              className='center-button'
              label='Login'
              raised
              onClick={() => this.login()}
            />
          </div>}
      </div>
    )
  }
}

export default withRouter(Login)
