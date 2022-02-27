import '../src/App.css';
import DigitButton from './components/digitButton';
import OperationButton from './components/operationButton';
import { useReducer } from 'react'

export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  DEL_DIGIT: 'DEL_DIGIT',
  SELECT_OPERATION: 'SELECT_OPERATION',
  CLEAR_ALL: 'CLEAR_ALL',
  EQUAL: 'EQUAL'
}

function reducer(state, { type, payload }) {
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOutput === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOutput.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOutput:`${state.currentOutput || ""}${payload.digit}`
      }
      case ACTIONS.SELECT_OPERATION:
      if(state.currentOutput == null && state.previousOutput == null) {
        return state
      }
      if (state.previousOutput == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOutput: state.currentOutput,
          currentOutput: null,
        }
      }
      break;
      case ACTIONS.CLEAR_ALL:
        return {}
    default:
      return state
}
  }

function App() {

  const [{ currentOutput, previousOutput, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className='calculator-grid'>
        <div className='output'>
            <div className='previous-output'>{previousOutput}{operation}</div>
            <div className='current-output'>{currentOutput}</div>
        </div>
        <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL})}>AC</button>
        <button>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch} />     
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />  
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />  
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />  
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button className='span-two'>=</button>
    </div>
  )
}

export default App;
