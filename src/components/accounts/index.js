import React, { Component } from 'react'
import { List, ListItem, Button, CircularProgress } from 'react-md'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getKidWithAccounts } from '../../stores/accounts'
import './index.css'

class Accounts extends Component {
  constructor(props) {
    super(props)
    const { match } = props
    this.id = match.params.id
  }
  state = { kid: { accounts: [] }, loading: true }

  componentWillMount() {
    getKidWithAccounts(this.id).then(kid =>
      this.setState({ kid, loading: false })
    )
  }

  navigate(path) {
    this.props.history.push(path)
  }

  render() {
    const { kid, loading } = this.state
    const accounts = kid.accounts.sort((a, b) => {
      return a.accountTypeId - b.accountTypeId
    })
    return (
      <div className="main-kids">
        {loading && <CircularProgress id="loading" />}
        {!loading && (
          <div>
            <Button id="back" icon onClick={() => this.props.history.goBack()}>
              <i className="material-icons">arrow_back</i>
            </Button>
            <h1 className="center header">{kid.name}'s Accounts</h1>

            <List>
              {accounts.map(account => {
                return (
                  <ListItem
                    key={account.id}
                    onClick={() =>
                      this.navigate(`/kid/${kid.id}/account/${account.id}`)
                    }
                    primaryText={
                      <span>
                        <span className="account-type">
                          {account.accountType}
                        </span>
                        <span
                          className={`amount ${
                            account.balance[0] === '-' ? 'red' : ''
                          }`}
                        >
                          {account.balance}
                        </span>
                      </span>
                    }
                  />
                )
              })}
            </List>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Accounts)
