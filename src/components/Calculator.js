import React,{useState} from 'react';

const calcKeys = [
	{
		id: 'zero',
		value: 0,
		type: 'operand'
	},
	{
		id: 'one',
		value: 1,
		type: 'operand'
	},
	{
		id: 'two',
		value: 2,
		type: 'operand'
	},
	{
		id: 'three',
		value: 3,
		type: 'operand'
	},
	{
		id: 'four',
		value: 4,
		type: 'operand'
	},
	{
		id: 'five',
		value: 5,
		type: 'operand'
	},
	{
		id: 'six',
		value: 6,
		type: 'operand'
	},
	{
		id: 'seven',
		value: 7,
		type: 'operand'
	},
	{
		id: 'eight',
		value: 8,
		type: 'operand'
	},
	{
		id: 'nine',
		value: 9,
		type: 'operand'
	},
	{
		id: 'add',
		value: '+',
		type: 'operator'
	},
	{
		id: 'subtract',
		value: '-',
		type: 'operator'
	},
	{
		id: 'multiply',
		value: '*',
		type: 'operator'
	},
	{
		id: 'divide',
		value: '/',
		type: 'operator'
	},
	{
		id: 'decimal',
		value: '.',
		type: 'other'
	},
	{
		id: 'equals',
		value: '=',
		type: 'result'
	},
	{
		id: 'clear',
		value: 'AC',
		type: 'reset'
	}
]

const isOperator = (val) => {
	return val === '+' || val === '-' || val === '/' || val === '*' || val === 'X';
}

const Display = (props) => {
	return(
		<div>
			<p id='display-container'>{props.allText}</p>
			<p id='display'>{props.currentText}</p>
		</div>
	);
}

const Calculator = () => {
	const [currentText, setCurrentText] = useState('0');
	const [allText, setAllText] = useState('');
	
	const handleClick = (item) => (e) => {
		const {value, type} = item;
		switch(type){
			case 'reset': {
				setAllText('');
				setCurrentText('0');
				break;
			}
			case 'operator': {
				setAllText(allText === '' ? ''+value : isOperator(allText) ? ''+value : isOperator(currentText) ? ''+allText : ''+allText+value);
				setCurrentText(value === '*' ? 'X':''+value);
				break;
			}
			case 'result': {
				// sanitize string before eval()
				/* eslint no-eval: 0 */
				const res = eval(allText.replace(/[^-()\d/*+.]/g, ''));
				setAllText(allText === '' ?  '' : ''+allText+'='+res);
				setCurrentText(currentText === '0' ?  '0' : ''+res);
				break;
			}
			case 'operand': {
				setAllText(allText === '' ?  (value === 0 ?  '': ''+value) : ''+allText+value);
				setCurrentText(currentText === '0' ? value === 0 ? '0' : ''+value : isOperator(currentText) ? ''+(value) : ''+currentText+value);
				break;
			}
			default:{
				if(value === '.'){
					setAllText(allText.includes(value) ? allText : allText === '' ? '0.' : isOperator(currentText) ? allText+'0.' : ''+allText+value);
					setCurrentText(currentText.includes(value) ? ''+currentText+'0' : isOperator(currentText) ? '0.' : ''+currentText+value);
				}
			}
		}
				
	}
	
	return(
		<div id='calculator'>
			<Display currentText={currentText} allText={allText}/>
				<div className='calculator-keys'>
					{calcKeys.map((item)=>
							<button key={item.id} id={item.id} type='button' onClick={handleClick(item)} value={item}>{item.value === '*' ? 'X':item.value}</button>
						)
					}
				</div>
		</div>
	);
}

export default Calculator