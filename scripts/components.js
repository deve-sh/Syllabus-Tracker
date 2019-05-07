// JavaScript file for rendering components.
// Sasta React. :P

// Button component. Props is an object.

const button = (props = {type:'submit',className:'btn btn-primary',label:'Submit'}) => {
	return `<button type='${props.type}' class='${props.className}'>${props.label}</button>`;
}

// Input Field Component.

const input = (props = {type:'text',className:'form-control',placeholder:'',required:true}) => {
	return (`<input type='${props.type}' class='${props.className}' placeholder='${props.placeholder}' ${(props.required===true)?"required":""}/>`);
}

// Select Field Component.

const select = (props = {placeholder:'',selectedIndex : 0 , options:[], className:''}) => {
	let ops = ``;

	for(let i in props.options){
		ops += `<option value='${props.options[i].toLowerCase()}' ${(Number(i) === props.selectedIndex)?"selected='selected'":""}>${props.options[i]}</option>`;
	}

	return `<select class='${props.className}' placeholder='${props.placeholder}'>${ops}</select>`;
}

// Intro Component

const intro = () => {
	return `
		<h3 align='center'>
			Track your progress!
		</h3>
		This is a web app to keep track of all the Computer Science Stuff going on in the college.
		<br/>
		And to also give you multiple references to learn stuff (Which will obviously be better than what the school provides. ;)).
	`;	
}