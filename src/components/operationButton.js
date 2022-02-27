import React from 'react'
import { ACTIONS } from '../App'

export default function OperationButton({ dispatch, operation }) {
  return <button onClick={() => dispatch ({ type: ACTIONS.SELECT_OPERATION, payload: {operation} })}>{operation}</button>
}