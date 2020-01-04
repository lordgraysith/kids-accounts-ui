import React, { Component } from 'react'
import { Grid, Cell, Button, CircularProgress } from 'react-md'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getAllKids } from '../../stores/kids'
import './index.css'

class Kids extends Component {
  state = { kids: [], loading: true }

  componentWillMount () {
    getAllKids().then(kids => this.setState({ kids, loading: false }))
  }

  navigate (path) {
    this.props.history.push(path)
  }

  render () {
    const { kids, loading } = this.state
    return (
      <div className='main-kids'>
        <h1 className='center'>Kids Accounts</h1>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <Grid>
            {kids.map(kid => {
              return (
                <Cell key={kid.id} size={2} desktopSize={4}>
                  <Button
                    className='kid-cell'
                    raised
                    onClick={() => this.navigate(`/kid/${kid.id}`)}
                  >
                    <div>{kid.name}</div>
                    <div>${kid.mainAccount.balance}</div>
                  </Button>
                </Cell>
              )
            })}
          </Grid>}
      </div>
    )
  }
}

export default withRouter(Kids)
