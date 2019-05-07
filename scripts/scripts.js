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
	`
	<div id='intro'>
		${intro()}
	</div>
	
	<br/>
	
	<div class='logincontainer'>
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
	`;

	$("#root").html(loginHtml);	// Set the innerHTML of the root node to the html string above.
}

function login(event){
	// Function to login.

	event.preventDefault();	// Prevent a page refresh.

	// Rechecking if the user is logged in or not.

	if(!localStorage.syllabusTracker){
		// If the user is verified to not be logged in.


	}else{
		throw new Error('Already Logged In.');
	}
}