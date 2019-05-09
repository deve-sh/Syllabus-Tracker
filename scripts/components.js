// JavaScript file for rendering components.
// Sasta React. :P

// Button component. Props is an object.

const button = (props = {type:'submit',className:'btn btn-primary',label:'Submit'}) => {
	return `<button type='${props.type}' class='${props.className}'>${props.label}</button>`;
}

// Input Field Component.

const input = (props = {type:'text',id:'',className:'form-control',placeholder:'',required:true}) => {
	return (`<input type='${props.type}' ${(props.id)?"id='"+props.id+"'":""} class='${props.className}' placeholder='${props.placeholder}' ${(props.required===true)?"required":""}/>`);
}

// Select Field Component.

const select = (props = {placeholder:'',selectedIndex : 0 , options:[], className:''}) => {
	let ops = ``;

	for(let i in props.options){
		ops += `<option value='${props.options[i].toString()}' ${(Number(i) === props.selectedIndex)?"selected='selected'":""}>${props.options[i]}</option>`;
	}

	return `<select class='${props.className}' placeholder='${props.placeholder}'>${ops}</select>`;
}

// Intro Component

const intro = () => {
	return `
		<div align='center'>
			<div class='col-md-5'>
				<img src='./files/screen.png' class='shadowed image'/>
			</div>
		</div>
		<h4 align='center'>
			Track your progress!
		</h4>
		This is a web app to keep track of all the Computer Science Stuff going on in the college.
		<br/>
		And to also give you multiple references to learn stuff (Which will obviously be better than what the college provides. 😛).
	`;	
}

// User Header Component

const userHeader = (props = {userName:'',year:'2019-20',course:'',progress:0,count:1}) => {
	return `
	<div class='userHeader'>
		<div class='userName'>Hey ${props.userName}</div>
		<div class='useryear'>Year : <span class='year'>${props.year}</span></div>
		<div class='usercourse'>Course : <span class='course'>${props.course}</span></div>
		<br/>
		Progress : 
		<div class='userprogress' style='background : linear-gradient(90deg, #0d78cc ${(props.progress/props.count)*100}%, #2c96df ${(props.progress/props.count)*100}%'>
			${(props.progress/props.count)*100}%
		</div>
		<br/>
		<div align='center'><button onclick="reset()" class='btn btn-danger' style='background: red;'>Reset/Logout</button></div>
		Your Syllabus : 
	</div>
	`;
}