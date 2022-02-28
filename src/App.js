import '../src/App.css';
import DigitButton from './components/digitButton';
import OperationButton from './components/operationButton';
import { useReducer } from 'react';

export const ACTIONS = {
	ADD_DIGIT: 'ADD_DIGIT',
	DEL_DIGIT: 'DEL_DIGIT',
	SELECT_OPERATION: 'SELECT_OPERATION',
	CLEAR_ALL: 'CLEAR_ALL',
	EQUAL: 'EQUAL',
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOutput: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === '0' && state.currentOutput === '0') {
				return state;
			}
			if (payload.digit === '.' && state.currentOutput.includes('.')) {
				return state;
			}
			return {
				...state,
				currentOutput: `${state.currentOutput || ''}${payload.digit}`,
			};
		case ACTIONS.SELECT_OPERATION:
			if (state.currentOutput == null && state.previousOutput == null) {
				return state;
			}

			if (state.currentOutput == null) {
				return {
					...state,
					operation: payload.operation,
				};
			}

			if (state.previousOutput == null) {
				return {
					...state,
					operation: payload.operation,
					previousOutput: state.currentOutput,
					currentOutput: null,
				};
			}

			return {
				...state,
				previousOutput: evaluate(state),
				operation: payload.operation,
				currentOutput: null,
			};
		case ACTIONS.CLEAR_ALL:
			return {};
		case ACTIONS.DEL_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentOutput: null,
				};
			}
			if (state.currentOutput == null) return state;
			if (state.currentOutput.length === 1) {
				return { ...state, currentOutput: null };
			}

			return {
				...state,
				currentOutput: state.currentOutput.slice(0, -1),
			};
		case ACTIONS.EQUAL:
			if (
				state.currentOutput == null ||
				state.currentOutput == null ||
				state.previousOutput == null
			) {
				return state;
			}
			return {
				...state,
				overwrite: true,
				previousOutput: null,
				operation: null,
				currentOutput: evaluate(state),
			};
		default:
			return state;
	}
}

function evaluate({ currentOutput, previousOutput, operation }) {
	const prev = parseFloat(previousOutput);
	const curr = parseFloat(currentOutput);
	if (isNaN(prev) || isNaN(curr)) return '';
	let computation = '';
	switch (operation) {
		case '+':
			computation = prev + curr;
			break;
		case '-':
			computation = prev - curr;
			break;
		case '*':
			computation = prev * curr;
			break;
		case '÷':
			computation = prev / curr;
			break;
		default:
	}
	return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});

function formatOperand(operand) {
	if (operand == null) return;
	const [integer, decimal] = operand.split('.');
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
	const [{ currentOutput, previousOutput, operation }, dispatch] = useReducer(reducer, {});

	return (
		<div className="calculator-grid">
			<div className="output">
				<div className="previous-output">
					{formatOperand(previousOutput)}
					{operation}
				</div>
				<div className="current-output">{formatOperand(currentOutput)}</div>
			</div>
			<button onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}>AC</button>
			<button className="span-two" onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}>
				DEL
			</button>
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
			<button className="span-two" onClick={() => dispatch({ type: ACTIONS.EQUAL })}>
				=
			</button>
		</div>
	);
}

export default App;
