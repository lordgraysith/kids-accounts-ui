import React, { Component } from 'react'
import {
  List,
  ListItem,
  Button,
  CircularProgress,
  TextField,
  Grid,
  Cell,
  Paper
} from 'react-md'
import { withRouter } from 'react-router'
import { map } from 'lodash'
import moment from 'moment'
import { getKidAndAccount } from '../../stores/accounts'
import {
  createTransaction
  // deleteTransaction
} from '../../stores/transactions'
import './index.css'

class Account extends Component {
  constructor(props) {
    super(props)
    const { match } = props
    this.kidId = match.params.kidId
    this.accountId = match.params.accountId
  }
  state = { kid: {}, loading: true }

  componentWillMount() {
    getKidAndAccount(this.kidId, this.accountId).then(kid => {
      this.setState({ kid, loading: false })
    })
  }

  formatNumber(num) {
    if (typeof num === 'number') {
      return num.toFixed(2)
    } else return num
  }

  async paymentClick(amount) {
    this.setState({
      amount,
      makingPayment: true,
      paymentDescription: '',
      depositAmount: undefined,
      withdrawAmount: undefined
    })
  }

  async confirmPayment(kidId, amount, description) {
    this.setState({ loading: true, makingPayment: false })
    let paymentAmount = amount
    if (amount === 'deposit') {
      paymentAmount = this.state.depositAmount
    }
    if (amount === 'withdraw') {
      paymentAmount = this.state.withdrawAmount * -1
    }
    const { account } = await createTransaction(
      kidId,
      paymentAmount,
      description
    )
    this.setState({
      kid: Object.assign({}, this.state.kid, { account }),
      loading: false,
      amount: undefined
    })
  }

  unconfirm() {
    this.setState({ makingPayment: false, amount: undefined })
  }

  descriptionChange(value) {
    this.setState({
      paymentDescription: value
    })
  }

  depositAmountChange(value) {
    this.setState({
      depositAmount: value
    })
  }

  withdrawAmountChange(value) {
    this.setState({
      withdrawAmount: value
    })
  }

  render() {
    const {
      kid,
      loading,
      amount,
      makingPayment,
      paymentDescription
    } = this.state
    const name = (kid && kid.account && kid.account.name) || ''
    const balance = (kid && kid.account && kid.account.balance) || 0
    const transactions = (kid && kid.account && kid.account.transactions) || []
    return (
      <div className="main-kid">
        {loading && <CircularProgress id="loading" />}
        {!loading && (
          <div>
            <Button id="back" icon onClick={() => this.props.history.goBack()}>
              <i className="material-icons">arrow_back</i>
            </Button>
            <h1 className="center header">
              {kid.name}'s {name}
            </h1>
            <h2 className="center">{`${this.formatNumber(balance)}`}</h2>
            <List>
              {map(transactions, t => {
                return (
                  <ListItem
                    key={t.createdDate}
                    primaryText={
                      <span>
                        <span className="date">
                          {moment(t.createdDate).format('MMM D, YYYY')}
                        </span>
                        <span className="description">{t.description}</span>
                        <span
                          className={`amount ${
                            t.amount[0] === '-' ? 'red' : ''
                          }`}
                        >
                          {t.amount}
                        </span>
                      </span>
                    }
                  />
                )
              })}
            </List>
            <Grid>
              <Cell size={1} desktopSize={3}>
                <Button
                  raised
                  secondary={amount === 'deposit'}
                  onClick={() => this.paymentClick('deposit')}
                >
                  Deposit
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button
                  raised
                  secondary={amount === 'withdraw'}
                  onClick={() => this.paymentClick('withdraw')}
                >
                  Withdraw
                </Button>
              </Cell>
            </Grid>
            {makingPayment && (
              <Paper className="payment-paper">
                {amount === 'deposit' && (
                  <TextField
                    id="deposit-amount"
                    type="number"
                    placeholder="Amount"
                    label="How much?"
                    onChange={value => this.depositAmountChange(value)}
                  />
                )}
                {amount === 'withdraw' && (
                  <TextField
                    id="withdraw-amount"
                    type="number"
                    placeholder="Amount"
                    label="How much?"
                    onChange={value => this.withdrawAmountChange(value)}
                  />
                )}
                <TextField
                  id="payment-description"
                  rows={1}
                  placeholder="Enter a description"
                  label="What is the purpose of this transaction?"
                  onChange={value => this.descriptionChange(value)}
                />
                <Grid>
                  <Cell size={2}>
                    <Button
                      raised
                      onClick={() =>
                        this.confirmPayment(
                          this.accountId,
                          amount,
                          paymentDescription
                        )
                      }
                    >
                      Confirm
                    </Button>
                  </Cell>
                  <Cell size={2}>
                    <Button raised onClick={() => this.unconfirm()}>
                      Cancel
                    </Button>
                  </Cell>
                </Grid>
              </Paper>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Account)
