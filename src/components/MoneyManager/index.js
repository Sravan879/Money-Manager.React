import React, { Component } from 'react';
import MoneyDetails from '../MoneyDetails';
import TransactionItem from '../TransactionItem';
import { v4 as uuidv4 } from 'uuid';

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
];

class MoneyManager extends Component {
  state = {
    transactions: [],
    balance: 0,
    income: 0,
    expenses: 0,
    titleInput: '',
    amountInput: '',
    selectedType: transactionTypeOptions[0].optionId,
  };

  onChangeTitle = event => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeAmount = event => {
    this.setState({ amountInput: event.target.value });
  };

  onChangeType = event => {
    this.setState({ selectedType: event.target.value });
  };

  handleAddTransaction = () => {
    const { transactions, amountInput, selectedType } = this.state;

    const newTransaction = {
      id: uuidv4(),
      title: this.state.titleInput,
      amount: parseFloat(amountInput),
      type: selectedType,
    };

    const updatedTransactions = [...transactions, newTransaction];

    const balance = this.calculateBalance(updatedTransactions);
    const income = this.calculateIncome(updatedTransactions);
    const expenses = this.calculateExpenses(updatedTransactions);

    this.setState({
      transactions: updatedTransactions,
      balance,
      income,
      expenses,
      titleInput: '',
      amountInput: '',
    });
  };

  handleDeleteTransaction = id => {
    const { transactions } = this.state;
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);

    const balance = this.calculateBalance(updatedTransactions);
    const income = this.calculateIncome(updatedTransactions);
    const expenses = this.calculateExpenses(updatedTransactions);

    this.setState({
      transactions: updatedTransactions,
      balance,
      income,
      expenses,
    });
  };

  calculateBalance = transactions => {
    const totalIncome = this.calculateIncome(transactions);
    const totalExpenses = this.calculateExpenses(transactions);
    return totalIncome - totalExpenses;
  };

  calculateIncome = transactions => {
    return transactions
      .filter(transaction => transaction.type === 'INCOME')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  calculateExpenses = transactions => {
    return transactions
      .filter(transaction => transaction.type === 'EXPENSES')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  render() {
    const { balance, income, expenses, titleInput, amountInput, selectedType, transactions } = this.state;

    return (
      <div className="bg-container">
        <div className="first-section">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span className="money">Money Manager</span>
          </p>
        </div>
        <ul className="money-list">
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </ul>
        <div className="last-section">
          <div className="last-f">
            <h1>Add Transaction</h1>
            <div className="label">
              <label htmlFor="tit">TITLE</label>
              <input
                type="text"
                className="input"
                id="tit"
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitle}
              />
            </div>
            <div className="label">
              <label htmlFor="amo">AMOUNT</label>
              <input
                type="text"
                className="input"
                id="amo"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmount}
              />
            </div>
            <div className="label">
              <label htmlFor="type">TYPE</label>
              <select className="input" onChange={this.onChangeType} value={selectedType}>
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <button className="button" onClick={this.handleAddTransaction}>
                Add
              </button>
            </div>
          </div>
          <ul className="last-f1">
            <h1>History</h1>
            <div className="main1">
              <li className="main">
                <p className="mar1">Title</p>
                <p className="mar">Amount</p>
                <p className="mar">Type</p>
              </li>
                {transactions.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={this.handleDeleteTransaction}
                  />
                ))}
            </div>
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
