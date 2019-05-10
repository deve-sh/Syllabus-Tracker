function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var button=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{type:"submit",className:"btn btn-primary",label:"Submit"};return"<button type='".concat(t.type,"' class='").concat(t.className,"'>").concat(t.label,"</button>")},input=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{type:"text",id:"",className:"form-control",placeholder:"",required:!0};return"<input type='".concat(t.type,"' ").concat(t.id?"id='"+t.id+"'":""," class='").concat(t.className,"' placeholder='").concat(t.placeholder,"' ").concat(!0===t.required?"required":"","/>")},select=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{placeholder:"",selectedIndex:0,options:[],className:""},e="";for(var n in t.options)e+="<option value='".concat(t.options[n].toString(),"' ").concat(Number(n)===t.selectedIndex?"selected='selected'":"",">").concat(t.options[n],"</option>");return"<select class='".concat(t.className,"' placeholder='").concat(t.placeholder,"'>").concat(e,"</select>")},intro=function(){return"\n\t\t<div align='center'>\n\t\t\t<div class='col-md-5'>\n\t\t\t\t<img src='./files/screen.png' class='shadowed image'/>\n\t\t\t</div>\n\t\t</div>\n\t\t<h4 align='center'>\n\t\t\tTrack your progress!\n\t\t</h4>\n\t\tThis is a web app to keep track of all the Computer Science Stuff going on in the college.\n\t\t<br/>\n\t\tAnd to also give you multiple references to learn stuff (Which will obviously be better than what the college provides. 😛).\n\t"},round=function(t,e){return parseFloat(Math.round(t*Math.pow(10,e))/Math.pow(10,e)).toFixed(e)},userHeader=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{userName:"",year:"2019-20",course:"",progress:0,count:1};return"\n\t<div class='userHeader'>\n\t\t<div class='userName'>Hey ".concat(t.userName,"</div>\n\t\t<div class='useryear'>Year : <span class='year'>").concat(t.year,"</span></div>\n\t\t<div class='usercourse'>Course : <span class='course'>").concat(t.course,"</span></div>\n\t\t<div id='progressbar'></div>\n\t\t<div align='center'><button onclick=\"reset()\" class='btn btn-danger' style='background: red;'><i class=\"fas fa-door-open\"></i> Reset </button></div>\n\t\tYour Syllabus : \n\t</div>\n\t")},progressBar=function(t){if("object"!==_typeof(t)||Array.isArray(t))throw new Error("Invalid type for userdata.");var e=0,n=1;for(var r in t)if(-1!==r.indexOf("Semester")&&Object.keys(t[r]).length>0)for(var a in t[r].Units)if(t[r].Units[a].hasOwnProperty("Sub-Units")&&!1===t[r].Units[a].isPractical)for(var o=0;o<t[r].Units[a]["Sub-Units"].length;o++)!0===t[r].Units[a]["Sub-Units"][o].isComplete&&e++,n++;n>1&&(n-=1);var s="\n\t<br/>\n\t\tProgress : \n\t\t<div class='userprogress' style='background : linear-gradient(90deg, #0d78cc ".concat(e/n*100,"%, #2c96df ").concat(e/n*100,"%'>\n\t\t\t").concat(round(e/n*100,2),"%\n\t\t</div>\n\t<br/>");try{$("#progressbar").html(s)}catch(t){throw new Error(t)}},referenceModal=function(t){if(!localStorage.getItem("syllabusTracker")||!t.target.parentElement.classList.contains("subjectname"))throw new Error("Invalid Event.");var e=t.target.textContent,n=[],r=JSON.parse(localStorage.getItem("syllabusTracker"));for(var a in r)if(r.hasOwnProperty(a)&&-1!==a.indexOf("Semester")&&r[a].hasOwnProperty("Units"))for(var o in r[a].Units)r[a].Units[o].Name===e&&(n=r[a].Units[o].References);document.getElementById("modalBox")&&document.getElementById("modalBox").parentElement.removeChild(document.getElementById("modalBox"));var s=document.createElement("div"),i="";if(0===n.length)i="<span>No References Listed for this subject.</span>";else for(var c in i+="<div> References found : </div>",n)i+="<span><a href='".concat(n[c],"' target='_blank'>").concat(n[c],"</a></span>");s.classList.add("modalclass"),s.id="modalBox",s.innerHTML="\n\t<div class='modalContent'>\n\t\t<div class=\"modalHeader\">\n\t\t    <span class='heading'>References for the subject</span>\n\t\t    <span class=\"close\" onclick='closeModal()'>&times;</span>\n\t    </div>\n\t    <div class=\"modalBody\">\n\t\t    ".concat(i,"\n\t    </div>\n\t</div>\n\t"),document.getElementsByTagName("body")[0].appendChild(s),openModal()},options=Object.freeze(["SY BSc CS"]),courseFiles=Object.freeze({"SY BSc CS":"./syllabi/sybsccs.json"});function isLoggedin(){localStorage.getItem("syllabusTracker")?render():showLoginScreen()}function render(){if(localStorage.getItem("syllabusTracker")){var t=JSON.parse(localStorage.getItem("syllabusTracker")),e=t.userName,n=t.Year,r=t.Course,a="".concat(userHeader({userName:e,year:n,course:r})),o=0;for(var s in t)if(-1!==s.indexOf("Semester"))if(Object.keys(t[s]).length<=0)a+="<div class='semestername'>".concat(s,"</div>\n\t\t\t\t\t\t\t\t<br/><span class='nocontent'>No Content in The Semester Available.</span><br/>");else if(t.hasOwnProperty(s)){for(var i in a+="<div class='semestername'>".concat(s,"</div>\n\t\t\t\t\t\t<div class='semester'><br>"),t[s].Units)if(a+="<div class='subjectname'><span ".concat(!1===t[s].Units[i].isPractical?"onclick='referenceModal(event)'":"",">").concat(t[s].Units[i].Name,"</span></div>"),t[s].Units.hasOwnProperty(i)){var c=t[s].Units[i];for(var l in a+="<ul class='subunits'>",c["Sub-Units"])a+="\n\t\t\t\t\t\t\t\t\t<li class='subunit' unitid='".concat(o,"'>\n\t\t\t\t\t\t\t\t\t\t<div class='left'>\n\t\t\t\t\t\t\t\t\t\t\t").concat(!1===c.isPractical?c["Sub-Units"][l].Name:c["Sub-Units"][l],"\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class='right'>\n\t\t\t\t\t\t\t\t\t\t\t").concat(!0===c.isPractical?"":!1===c["Sub-Units"][l].isComplete?"<label><input type='checkbox' onclick='registerCompletion(event)'/><span></span></label>":"<label><input type='checkbox' checked='checked' onclick='registerCompletion(event)'/><span></span></label>","\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</li><br>\n\t\t\t\t\t\t\t\t\t"),o++;a+="</ul>"}a+="</div>"}try{$("#root").html(a),progressBar(t)}catch(t){throw new Error(t)}}else showLoginScreen()}function showLoginScreen(){var t="<div id='intro'>\n\t\t".concat(intro(),"\n\t</div>\n\t\n\t<div class='logincontainer row'>\n\t\t<div class='col-md-6' style='vertical-align:middle;'>\n\t\t\t<br/>\n\t\t\t<h5>\n\t\t\t\tJust Login and Start Tracking.\n\t\t\t</h5>\n\t\t\tIt's that simple.\n\t\t\t<br/>\n\t\t\t<br/>\n\t\t\t<i class=\"fas fa-clipboard-check fa-10x\"></i>\n\t\t</div>\n\t\t<div class='col-md-6'>\n\t\t\t<br/>\n\t\t\t<form class='loginform card' onSubmit=\"login(event)\">\n\t\t\t\t<h5>Login</h5>\n\t\t\t\t").concat(input({type:"text",placeholder:"Name",required:!0,className:"form-control",id:"nameinput"}),"\n\t\t\t\t<div align='left'>\n\t\t\t\t\t<label class='formlabel'>Select your course</label>\n\t\t\t\t</div>\n\t\t\t\t").concat(select({options:options,selectedIndex:0,placeholder:"Select a Course",className:"input-field"}),"\n\t\t\t\t<br>\n\t\t\t\t").concat(button({type:"submit",label:"login",className:"btn btn-primary fullwidthbutton"}),"\n\t\t\t</form>\n\t\t</div>\n\t\t<br/>\n\t</div>\n\t");$("#root").html(t)}function login(t){if(t.preventDefault(),localStorage.syllabusTracker)throw new Error("Already Logged In.");var e,n;try{if(e=$("#nameinput").val(),n=$(".input-field")[0].selectedOptions[0].value,!e||!n)throw new Error("Invalid Field Values.")}catch(t){throw new Error(t)}var r=courseFiles[n.toString()].toString(),a=new XMLHttpRequest;a.open("GET",r,!0),a.send(),a.onreadystatechange=function(){if(200!=a.status)throw new Error("Error in fetching syllabus.");4===a.readyState&&function(){var t=JSON.parse(a.responseText),n=0;for(var r in t)if(t.hasOwnProperty(r))for(var o in t[r].Units)!1===t[r].Units[o].isPractical&&(t[r].Units[o]["Sub-Units"]=t[r].Units[o]["Sub-Units"].map(function(t){return t.isComplete=!1,t.unitid=n++,t}));t.userName=e,t=JSON.stringify(t);try{localStorage.setItem("syllabusTracker",t)}catch(t){throw new Error(t)}render()}()}}function registerCompletion(t){if(!localStorage.getItem("syllabusTracker"))throw new Error("Not Logged In.");if("checkbox"===t.target.type){var e=t.target.parentElement.parentElement.parentElement.getAttribute("unitid"),n=!1;!0===t.target.checked&&(n=!0);var r=JSON.parse(localStorage.getItem("syllabusTracker"));for(var a in r)if(r.hasOwnProperty(a))for(var o in r[a].Units)if(!1===r[a].Units[o].isPractical)for(var s in r[a].Units[o]["Sub-Units"])r[a].Units[o]["Sub-Units"][s].unitid===Number(e)&&(r[a].Units[o]["Sub-Units"][s].isComplete=n);localStorage.setItem("syllabusTracker",JSON.stringify(r)),progressBar(r)}}function reset(){if(!localStorage.getItem("syllabusTracker"))throw new Error("Already Logged Out.");confirm("Are you sure you want to reset/logout?")&&(localStorage.clear(),showLoginScreen())}function openModal(){document.getElementById("modalBox")&&(document.getElementById("modalBox").style.display="block")}function closeModal(){document.getElementById("modalBox")&&(document.getElementById("modalBox").style.display="none")}window.onclick=function(t){t.target==document.getElementById("modalBox")&&(document.getElementById("modalBox").style.display="none")};