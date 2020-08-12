import React,{useState} from 'react';

const TestComponent = () => {
	const [count, setCount] = useState(0);
	
	console.log(' inside test comp ', count);
	
	const handleClick = () => {
		setCount(1);
	}
	
	return(
		<div>
			<p>{count}</p>
			<button type='button' onClick={handleClick}>Click Me!</button>
		</div>
	);
}

export default TestComponent;