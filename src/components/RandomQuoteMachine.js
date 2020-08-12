import React,{useState} from 'react';

const Quote = () => {	
	const quotes = [
		{
			'text': '1st quote',
			'author': '1st author'
		},
		{
			'text': '2nd quote',
			'author': '2nd author'
		},
		{
			'text': '3rd quote',
			'author': '3rd author'
		},
		{
			'text': '4th quote',
			'author': '4th author'
		},
		{
			'text': '5th quote',
			'author': '5th author'
		}
	];
	
	const [quote, setQuote] = useState(quotes[Math.floor(Math.random()*quotes.length)]);
	
	const loadNewQuote = () => {
		setQuote(quotes[Math.floor(Math.random()*quotes.length)])
	}
	
return(
			<div id='quote'>  
				<p id='text'>{quote.text}</p>
				<p id='author'>{quote.author}</p>
				<button id='new-quote' onClick={loadNewQuote}>Get New Quote</button>
				<a id='tweet-quote' href='https://twitter.com/intent/tweet'>Tweet</a> 
			</div>
	)
}

const RandomQuoteMachine = () => {
	return(
		<div id='quote-box'>
			<Quote />
		</div>
	)
}

export default RandomQuoteMachine