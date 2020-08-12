import React,{useState,useRef,useEffect} from 'react';

const soundURL = '/media/Kalimba.mp3';
const initialDisplay = 'Click or Press Key';

const drumKeys = [
	{
		key:'Q',
		id:'first key',
		url:soundURL
	},
	{
		key:'W',
		id:'second key',
		url:soundURL
	},
	{
		key:'E',
		id:'third key',
		url:soundURL
	},
	{
		key:'A',
		id:'fourth key',
		url:soundURL
	},
	{
		key:'S',
		id:'fifth key',
		url:soundURL
	},
	{
		key:'D',
		id:'sixth key',
		url:soundURL
	},
	{
		key:'Z',
		id:'seventh key',
		url:soundURL
	},
	{
		key:'X',
		id:'eighth key',
		url:soundURL
	},
	{
		key:'C',
		id:'ninth key',
		url:soundURL
	}
]

const DrumPad = (props)=> {
	const [isPlaying, setPlaying] = useState(false);
	const audio = useRef(null);
	
	const playSong = ()=> {
		audio.current.play();
		audio.current.currentTime = 0;
		props.handleDisplay(props.value.id);
		setPlaying(true);
	}
	
	const pauseSong = ()=> {
		audio.current.pause();
		props.handleDisplay(initialDisplay);
		setPlaying(false);
	}
	
	useEffect(() => {
		const handlekeydownEvent = (event)=> {
			const { keyCode } = event;
			if(keyCode === props.value.key.charCodeAt()) {
					audio.current.play();
					audio.current.currentTime = 0;
					props.handleDisplay(props.value.id);
					setPlaying(true);
				}else{
					audio.current.pause();
					props.handleDisplay(initialDisplay);
					setPlaying(false);
			}									
		}
  document.addEventListener('keydown', handlekeydownEvent)
  return () => {
    document.removeEventListener('keydown', handlekeydownEvent)
  }
}, [props])
	
	return(
			<div className="drum-pad" id={props.value.id} onClick={isPlaying ? pauseSong : playSong}>
				<p>{props.value.key}</p>
				<audio id={props.value.key} className="clip" src={props.value.url} ref={audio}>
					Your browser does not support the
					<code>audio</code> element
				</audio>
			</div>
	);
}

const DrumMachine = ()=> {
	const [display, setDisplay] = useState(initialDisplay);
	
	const handleDisplay = (display)=> {
		setDisplay(display);
	}
	
	return(
		<div id="drum-machine">
			{drumKeys.map((item)=>
						<DrumPad key={item.key} value={item} handleDisplay={handleDisplay} />
				)
			}
			<p id='display'>{display}</p>
		</div>
	);
}

export default DrumMachine;