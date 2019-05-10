# <div align='center'>Syllabus Tracker</div>

A Web App to track progress of a student for a set of semesters in one year.

[See it working.](https://deve-sh.github.io/Syllabus-Tracker)

## Installation

Just clone the repository to your system using your terminal, or download the repo as a zip.
I tailored it to my own college (Fergusson College) but it can be used with the syllabus of any other college. [See notes on how to add your own syllabus](#Customization-and-Contribution).

```bash
git clone https://github.com/deve-sh/Syllabus-Tracker.git
cd Syllabus-Tracker
```

## Usage and Info

Run the downloaded Repo on a Web Server. (Like Python's Simple Server using the command : ```python -m http.server``` for Python 3) as the web app requires to run a XML HTTP Request to a syllabus JSON file.

The Syllabus files are present in the **/syllabi** directory are in the form of **JSON**.

The Web App utilises **Local Storage** to store User Data that has a max size of around 5-20 KB. Thus, there is no need for anyone to logout or remember sessions as the storage is in place and updated in real time. All the data regarding the user is stored on their own computers and hence makes the whole experience much faster.

To view the data stored in Local Storage, run the following command in the console.

```js
JSON.parse(localStorage.getItem('syllabusTracker'))
```

## Structure

- The app utilizes : 
	- Components present in **/scripts/components.js** 
	- The core functionality is present in **/scripts/scripts.js**.
	- A minified pre-ES6 version of both has been transpiled to **/scripts/scripts-min.js**. Which is the **<u>recommended</u>** version to use as its half the length and cross - broswer compatible.
- The styles are present in **/styles** directory.
- Any Additional files that need to be added should be added to the **/files** directory.
- The Syllabus files are present in **/syllabi** directory.

## Customization and Contribution

The Web App requires addition of syllabus files to it. By default, only the Syllabus of the Second Year Computer Science course of Fergusson College has been added to the project.

In order to add your own course syllabus, have a look at the structure of **sybsccs.json** file.
That is the core structure expected for any JSON File consisting of a syllabus.

```json
{
	"Year":"2019-20",
	"Course":"SY BSc CS",
	"Subject":"Computer Science",
	"Semester III":{
		"Units" : [
			{
				"Name":"Data Structures using C",
				"Lectures":48,
				"isPractical":false,
				"Credits":3,
				"Code":"CSC2301",
				"Sub-Units" : [
					{"Name":"Introduction to Data Structure and Algorithm Analysis"},
					{"Name":"Linear Data Structures"},
					{"Name":"Non-Linear Data Structures"}
				],
				"References" : [
					
				]
			}
		]
	}
}
```

The file consists of a master object that contains all the details. Year, Course and Subject fields are necessary to create a proper user header.
