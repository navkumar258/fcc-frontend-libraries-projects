import React,{useState} from 'react';

const controls = [
	{
		id: 'break-label',
		label: 'Break Length',
		increment: 'break-increment',
		decrement: 'break-decrement',
		valueLabel: 'break-length'
	},
	{
		id: 'session-label',
		label: 'Session Length',
		increment: 'session-increment',
		decrement: 'session-decrement',
		valueLabel: 'session-length'
	}
]

const Control = (props) => {
	const details = props.controlItem;
	
	return(
		<div className='length-control'>
			<h2 id={details.id}>{details.label}</h2>
			<button id={details.decrement} type='button' onClick={props.decrement} value={details.id}>DEC</button>
			<h3 id={details.valueLabel}>{props.currValue.minutes}</h3>
			<button id={details.increment} type='button' onClick={props.increment} value={details.id}>INC</button>
		</div>
	);
}

const Timer = (props) => {
		return(
		<div className='timer'>
			<h2 id='timer-label'>Session</h2>
			<h2 id='time-left'>{props.currValue.minutes < 10 ? 
				'0'+props.currValue.minutes : props.currValue.minutes}:
				{props.currValue.seconds < 10 ? 
				'0'+props.currValue.seconds : props.currValue.seconds}
			</h2>
		</div>
	);
}

const PomodoroClock = () => {
	const [breakValue, setBreakValue] = useState({minutes: 5,seconds: 0});
	const [sessionValue, setSessionValue] = useState({minutes: 25,seconds: 0});
	const [isPlaying, setIsPlaying] = useState(false);
	let interval = null;
	
	const decrement = (e) => {
		const id = e.target.value;
		id === 'break-label' ? setBreakValue(breakValue.minutes <= 2 ? {minutes:1, seconds:breakValue.seconds}: {minutes:breakValue.minutes-1, seconds:breakValue.seconds})
		: setSessionValue(sessionValue.minutes <= 2 ? {minutes:1, seconds:sessionValue.seconds}: {minutes:sessionValue.minutes-1, seconds:sessionValue.seconds});
	}
	
	const increment = (e) => {
		const id = e.target.value;
		id === 'break-label' ? setBreakValue(breakValue.minutes >= 60 ? {minutes:60, seconds:breakValue.seconds}: {minutes:breakValue.minutes+1, seconds:breakValue.seconds})
		: setSessionValue(sessionValue.minutes >= 60 ? {minutes:60, seconds:sessionValue.seconds}: {minutes:sessionValue.minutes+1, seconds:sessionValue.seconds});
	}
	
	const handleReset = () => {
		setBreakValue({minutes: 5,seconds: 0});
		setSessionValue({minutes: 25,seconds: 0});
		setIsPlaying(false);
	}
	
	const setTimer = () => {
		setSessionValue({minutes: sessionValue.minutes-1,seconds: sessionValue.seconds-1});
	}
	
	const handleTimer = () => {
		if(sessionValue.minutes > 0){
			console.log('inside interval');
			interval = setInterval(setTimer, 1000);
		}else{
			clearInterval(interval);
		}
	}
	
	return(
		<div id='clock-container'>
			<h1>Pomodoro Clock</h1>
			<div className="line-break"></div>
			{controls.map((item) => 
				<Control key={item.id} controlItem={item} currValue= {item.id === 'break-label' ? breakValue : sessionValue}
					increment={increment} decrement={decrement}/>
				)
			}
			<div className="line-break"></div>
			<Timer breakValue={breakValue} currValue= {sessionValue.minutes === 0 && sessionValue.seconds === 0 ? breakValue : sessionValue}/>
			<div className="line-break"></div>
			<button id='start_stop' type='button' onClick={handleTimer}>{isPlaying ? 'Pause' : 'Play'}</button>
			<button id='reset' type='button' onClick={handleReset}>Reset</button>
		</div>
	);
}

export default PomodoroClock