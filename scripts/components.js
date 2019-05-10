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

// A Rounding Off Function.

const round = (x, n) => parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);

// User Header Component

const userHeader = (props = {userName:'',year:'2019-20',course:'',progress:0,count:1}) => {
	return `
	<div class='userHeader'>
		<div class='userName'>Hey ${props.userName}</div>
		<div class='useryear'>Year : <span class='year'>${props.year}</span></div>
		<div class='usercourse'>Course : <span class='course'>${props.course}</span></div>
		<div id='progressbar'></div>
		<div align='center'><button onclick="reset()" class='btn btn-danger' style='background: red;'>Reset / Logout</button></div>
		Your Syllabus : 
	</div>
	`;
}

// Progress Bar Component.

const progressBar = (userdata) => {

	if(typeof userdata !== 'object' || Array.isArray(userdata)){
		// Invalid Types for userdata.

		throw new Error('Invalid type for userdata.');
	}

	// Calculating the progress of the user.

	let progress = 0;
	let count = 1;

	// Calculating the progress of the user.
	// Sorry this takes 3 for loops, but the execution is fast enough, no worries.
	// Takes around 0.31 ms on average for 100 runs.

	for(let semester in userdata){
		if(semester.indexOf('Semester')!==-1){
			if(Object.keys(userdata[semester]).length > 0){
				for(let unit in userdata[semester]["Units"]){
					if(userdata[semester]["Units"][unit].hasOwnProperty("Sub-Units") && userdata[semester]["Units"][unit].isPractical === false){
						for(let i = 0;i<userdata[semester]["Units"][unit]["Sub-Units"].length;i++){
							if(userdata[semester]["Units"][unit]["Sub-Units"][i].isComplete === true)
								progress++;
							count++;
						}
					}
				}
			}
		}
	}

	if(count>1){
		count -= 1;
	}


	let progressHTML = `
	<br/>
		Progress : 
		<div class='userprogress' style='background : linear-gradient(90deg, #0d78cc ${(progress/count)*100}%, #2c96df ${(progress/count)*100}%'>
			${round((progress/count)*100,2)}%
		</div>
	<br/>`;

	try{
		$("#progressbar").html(progressHTML);
	}
	catch(err){
		throw new Error(err);
	}

	// This will render the progress bar.
}