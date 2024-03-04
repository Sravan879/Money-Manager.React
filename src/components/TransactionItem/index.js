// Write your code here
import React from 'react'

const TransactionItem = ({transaction, onDelete}) => {
  const {id, title, amount, type} = transaction

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className="dis">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button onClick={onClickDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="but"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
