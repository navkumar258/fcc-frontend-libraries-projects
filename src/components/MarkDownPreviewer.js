import React,{useState} from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  xhtml: true
});

const initialMarkup = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

const Editor = (props)=> {	
	return (
		<>
			<label htmlFor='editor'>Editor:</label>
			<textarea id='editor' rows='15' cols='75' 
			placeholder='Enter text/HTML markup to see changes below...' value={props.value} onChange={props.onChange} autoFocus>
			</textarea>
		</>
	)
}

const Preview = (props)=> {		
	const sanitizedHTML = DOMPurify.sanitize(marked(props.value));
	return (
		<div id='preview' dangerouslySetInnerHTML={{
			__html: sanitizedHTML
			}}
		/>	
	)
}

const MarkDownPreviewer = ()=> {	
	const [markup, setMarkup] = useState(initialMarkup);
	
	const handleChange = (event)=> {
		setMarkup(event.target.value);
	}
	
	return(
		<>
			<Editor value={markup} onChange={handleChange}/>
			<Preview value={markup} onChange={handleChange}/>
		</>
	)
}

export default MarkDownPreviewer