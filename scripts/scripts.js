// Main JavaScript file to set up everything.
// The project uses local storage so no one can view someone else's progress.
// And a breach will never reveal anything else.
// One downside is that there won't be any progress saved once the user resets or clears Local Storage.

// ----------------
// Global Variables
// ----------------

const options = Object.freeze(["SY BSc CS"]);	// Change this array if you need to add more Courses.

// An Object to store the files related to each course.

const courseFiles = Object.freeze({
	"SY BSc CS" : "./syllabi/sybsccs.json"
});		// Change this Object if you need to add more course files.

// In the above variables the Object.freeze method has been used so that they can only be used for accessing and not start unauthorised HTTP requests to sources.

// ----------
// Functions
// ----------

function isLoggedin(){
	// Function to check if a user is already logged in.
	// Master Controller.
	
	if(localStorage.getItem('syllabusTracker')){
		// If syllabusTracker object has been initalized.
		render();	// Call the render function to render the progress of the user.
	}else{
		showLoginScreen();	// Call the showLoginScreen function to start a new session.
	}
}

function render(){
	// Function to render the progress of a user.
	
	if(localStorage.getItem('syllabusTracker')){
		let userdata = JSON.parse(localStorage.getItem('syllabusTracker'));

		// User Variables

		let userName = userdata.userName;
		let year = userdata.Year;
		let course = userdata.Course;
		let progress = 0;
		let count = 1;

		// Calculating the progress of the user.
		// Sorry this takes 3 for loops, but the execution is fast enough, no worries.

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
		
		// Creating a Render String. Starting with the Intro Tile.

		let toRender = `${userHeader({userName,year,course,progress,count})}`;	// String that will be displayed.

		let counter = 0;					// A counter variable to assign the ids to each list item.

		for(let semester in userdata){
			if(semester.indexOf('Semester')!==-1){
				if(Object.keys(userdata[semester]).length <= 0){
					// Don't waste time on another round of for loops if no units are specified.
					toRender += `<div class='semestername'>${semester}</div>
								<br/><span class='nocontent'>No Content in The Semester Available.</span><br/>`;
				}
				else{
					if(userdata.hasOwnProperty(semester)){
						toRender += `<div class='semestername'>${semester}</div>
						<div class='semester'>`;

						// If the word Semester is present.
						// Start a loop to print it.

						// Now this is gonna get messy as hell. But still, fun!

						for(let unit in userdata[semester]["Units"]){

							toRender += `<br><div class='subjectname'>${userdata[semester]["Units"][unit]['Name']}</div>`;

							if(userdata[semester]["Units"].hasOwnProperty(unit)){
								let unitvar = userdata[semester]["Units"][unit];

								toRender += `<ul class='subunits'>`;

								for(let subunit in unitvar["Sub-Units"]){
									toRender += `
									<li class='subunit' unitid='${counter}'>
										<div class='left'>
											${(unitvar['isPractical']===false)?unitvar["Sub-Units"][subunit]["Name"]:unitvar["Sub-Units"][subunit]}
										</div>
										<div class='right'>
											${(unitvar["isPractical"]===true)?"":(unitvar["Sub-Units"][subunit]["isComplete"]===false)?"Not Complete":"Complete"}
										</div>
									</li><br>
									`;

									counter++;
								}

								toRender += `</ul>`;
							}
						}

						toRender += `</div>`	// Close the unordered list.
					}
				}
			}
		}

		$("#root").html(toRender);	// Set the HTML of the Root Component to toRender string.
	}
	else{
		showLoginScreen();	// Show the login screen again if the user isn't logged in.
	}

	return;
}

function showLoginScreen(){
	// Function to show login screen.

	let loginHtml = 
	`<div id='intro'>
		${intro()}
	</div>
	
	<div class='logincontainer row'>
		<div class='col-md-6' style='vertical-align:middle;'>
			<br/>
			<h5>
				Just Login and Start Tracking.
			</h5>
			It's that simple.
			<br/>
			<br/>
			<i class="fas fa-clipboard-check fa-10x"></i>
		</div>
		<div class='col-md-6'>
			<br/>
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

			if(!name || !course){
				throw new Error('Invalid Field Values.');
			}
		}catch(err){
			throw new Error(err);
		}

		let file = courseFiles[course.toString()].toString();

		// Running an XML HTTP Request to get the CS Syllabus for the course provided.

		let xhr = new XMLHttpRequest();

		xhr.open('GET',file,true);

		xhr.send();

		xhr.onreadystatechange = () => {
			if(xhr.status!=200){
				throw new Error('Error in fetching syllabus.');
			}

			if(xhr.readyState === 4){
				// Now ready to log the user in.

				let syllabus = JSON.parse(xhr.responseText);

				// Adding an isComplete tag to each chapter.

				let counter = 0;	// Variable to later assign unit ids to the subunits.

				for(let i in syllabus){
				    if(syllabus.hasOwnProperty(i)){
				        for(let j in syllabus[i]["Units"]){
							if(syllabus[i]["Units"][j].isPractical===false){
				            	// Practicals are not tracked. Just listed.
								syllabus[i]["Units"][j]["Sub-Units"] = syllabus[i]["Units"][j]["Sub-Units"].map((subUnit) => {
									subUnit.isComplete = false;
									subUnit.unitid = (counter++);
									return subUnit;
								});
				            }
				        }
				    }
				}

				syllabus.userName = name;

				syllabus = JSON.stringify(syllabus);

				// Authentication Object complete.
				// Now Storing it in Local Storage.

				try{
					localStorage.setItem('syllabusTracker',syllabus);
				}
				catch(err){
					throw new Error(err);
				}

				// Everything successful till now. Show a logged in screen then.

				render();	// Call the render function to print the progress of the user.
			}
		}
	}else{
		throw new Error('Already Logged In.');
	}
}