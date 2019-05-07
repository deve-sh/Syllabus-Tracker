// Main JavaScript file to set up everything.
// The project uses local storage so no one can view someone else's progress.
// And a breach will never reveal anything else.

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
		<form class='loginform' onSubmit="login()">
			<h4>Login</h4>
			
			${// Creating an input for the name.
				input({
				type:'text',
				placeholder:'Name',
				required:true,
				className:'form-control'
			})}

			<br>
			${// Creating a Select Field.
				select({
					options,
					selectedIndex:0,
					placeholder:'Select a Course',
					className:'input-field col-md-6'
				})		
			}
			<br>
			${ // Creating a Button
				button({
					type:'submit',
					label:'login',
					className:'btn btn-primary'
				})
			}
		</form>
	</div>
	`;

	$("#root").html(loginHtml);	// Set the innerHTML of the root node to the html string above.
}

function login(){
	// Function to login.
}