// Write your code here
import React from 'react'

const MoneyDetails = ({balance, income, expenses}) => {
  return (
    <>
      <li className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          className="img"
          alt="balance"
        />
        <div className="con">
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {balance}</p>
        </div>
      </li>
      <li className="bg1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          className="img"
          alt="income"
        />
        <div className="con">
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {income}</p>
        </div>
      </li>
      <li className="bg2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          className="img"
          alt="expenses"
        />
        <div className="con">
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {expenses}</p>
        </div>
      </li>
    </>
  )
}

export default MoneyDetails
