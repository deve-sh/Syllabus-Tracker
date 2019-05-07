// Main JavaScript file to set up everything.
// The project uses local storage so no one can view someone else's progress.
// And a breach will never reveal anything else.
// One downside is that there won't be any progress saved once the user resets or clears Local Storage.

function isLoggedin(){
	// Function to check if a user is already logged in.

	if(localStorage.syllabusTracker){
		// If syllabusTracker object has been initalized.
		render();	// Call the render function to render the progress of the user.
	}else{
		showLoginScreen();	// Call the showLoginScreen function to start a new session.
	}
}

function render(){
	// Function to render the progress of a user.
	return;
}

function showLoginScreen(){
	// Function to show login screen.

	let options = ["SY BSc CS"];

	let loginHtml = 
	`<div id='intro'>
		${intro()}
	</div>
	
	<div class='logincontainer row'>
		<div class='col-md-6' style='vertical-align:middle;'>
			<br/>
			<h5>
				Just Login and Start Tacking.
			</h5>
			Its that simple.
			<br/><br/>
			<div align='center'>
				<i class="fas fa-clipboard-check fa-10x"></i>
			</div>
		</div>
		<div class='col-md-6'>
			<form class='loginform card' onSubmit="login(event)">
				<h5>Login</h5>
				${// Creating an input for the name.
					input({
					type:'text',
					placeholder:'Name',
					required:true,
					className:'form-control',
					id:'nameinput'
				})}
				<div align='left'>
					<label class='formlabel'>Select your course</label>
				</div>
				${// Creating a Select Field.
					select({
						options,
						selectedIndex:0,
						placeholder:'Select a Course',
						className:'input-field'
					})		
				}
				<br>
				${ // Creating a Button
					button({
						type:'submit',
						label:'login',
						className:'btn btn-primary fullwidthbutton'
					})
				}
			</form>
		</div>
		<br/>
	</div>
	`;

	$("#root").html(loginHtml);	// Set the innerHTML of the root node to the html string above.
}

function login(event){
	// Function to login.

	event.preventDefault();	// Prevent a page refresh.

	// Rechecking if the user is logged in or not.

	if(!localStorage.syllabusTracker){
		// If the user is verified to not be logged in.

		// Getting the field values.

		let name,course;

		try{
			name = $("#nameinput").val();
			course = $(".input-field")[0].selectedOptions[0].value;
		}catch(err){
			throw new Error(err);
		}

		let file = courseFiles[course.toString()].toString();

		console.log(file);

		// Running an XML HTTP Request to get the CS Syllabus for the course provided.

		let xhr = new XMLHttpRequest();

		xhr.open('GET',file,true);

		xhr.onload = () => {
			console.log(JSON.parse(xhr.responseText));
		}

		xhr.send();

	}else{
		throw new Error('Already Logged In.');
	}
}

// An Object to store the files related to each course.

var courseFiles = {
	"SY BSc CS" : "./syllabi/sybsccs.json"
};