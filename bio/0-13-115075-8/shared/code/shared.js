/////////////////////////////////////////////
// CD version Stuff
/////////////////////////////////////////////

var gbIsCD =  true;// set to false if site

// check if the window should go up
function putUpCDWarningWindowP(xsWhere) {
	var vbPutUpWindow = false;
	
	if(gbIsCD) {
		if(xsWhere.indexOf("webquest") 		!= -1 ||
			xsWhere.indexOf("assessment") 	!= -1 ||
			xsWhere.indexOf("explore") 		!= -1 ||				
			xsWhere.indexOf("grlab")	 	!= -1 ||	
			xsWhere.indexOf("skills")	 	!= -1 ||					
			xsWhere.indexOf("units")	 	!= -1 ||					
			xsWhere.indexOf("ocs")	 		!= -1) {
			vbPutUpWindow = true;
		}
	}
	
	return vbPutUpWindow;
}

// put up the window
function openCDWarningWindow(xsWhereFrom) {
	var vsURL;
	
	switch(xsWhereFrom) {
		case "chapmap":
			vsURLPath = "../../../";
			break;
		case "mininav":
			vsURLPath = "../../../../";
			break;
		case "content":
			vsURLPath = "../../../../../";
			break;
		case "unithome":
			vsURLPath = "../../";
			break;
		case "toolbar":
			vsURLPath = "../";
			break;
		case "chAssessment":
			vsURLPath = "../../../";
			break;
	}
	
	var thisWindow = window.open(vsURLPath + "shared/cdwarning.html", "CDWarning", "height=240,width=325,screenX=300,screenY=200,left=300,top=200,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no");

	thisWindow.focus();
}

// Go to the homepage
function takeMeHome(xsWhichFile, xsPath) {
	if (xsPath == null || xsPath == "") { 
		xsPath = "./"; 
	}
	top.maincontent.location = xsPath + xsWhichFile;
}

function goToFromChapmap(xsWhere) {
	if(putUpCDWarningWindowP(xsWhere)) {
		openCDWarningWindow("chapmap");
	} else {
		//alert("Chapmap: " + xsWhere);
		top.gsCurMiniNavLoc = xsWhere;
		top.maincontent.document.location = "../../../shared/mininav/index.html";
	}
}

function goToFromContentPage(xsWhere) {
	if(putUpCDWarningWindowP(xsWhere)) {
		openCDWarningWindow("content");
	} else {
		top.gsCurMiniNavLoc = xsWhere;
		top.maincontent.document.location = "../../../../../shared/mininav/index.html";
	}
}

function goToUnitAssessment() {
	if(putUpCDWarningWindowP("assessment") ) {
		openCDWarningWindow("unithome");
	} else {
		openSmallerWindowunitAssessment("assessment/index.html");
	}
}

function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

/////////////////////////////////////////////////////////////////
// TOOLBAR FUNCTIONS
/////////////////////////////////////////////////////////////////
function ContentsViewbyClick(xsWhich){
	var vsPageName;
	
	if(xsWhich=="contents") {
		vsPageName = "index.html";
		document['viewby'].src = "images/viewby.gif";
		parent.gbIsViewBy = false;	
	} else {
		vsPageName = "viewby.html"
		document['contents'].src = "images/contents.gif";
		parent.gbIsViewBy = true;	
	}
	
	document[xsWhich].src = "images/" + xsWhich  + "hi.gif";	
	parent.maincontent.location = "../../home/" + vsPageName;
}

// writes the link to the teachers guide if true, student if false
function writeTeachersGuideLink(xbIsTeacher){
	if(gbIsCD){
		document.write('<img src="../shared/images/onepixel.gif" width="160" height="10" alt="">');
	} else if (xbIsTeacher) {
		document.write('<a class="toolbartext" href="../teachers/BELTG.pdf" target="_blank" title="Launches Teaching Guide pdf in a pop-up window"><nobr>Teaching Guide<nobr></a></td><td><img src="../shared/images/onepixel.gif" width="7" height="1" alt=""></td><td><img src="images/rule.gif" width="1" height="17"><img src="../shared/images/onepixel.gif" width="7" height="1" alt="">');
	} else {
		document.write('<img src="../shared/images/onepixel.gif" width="60" height="10" alt="">');
	}
}

// writes the link to the teachers guide if true, student if false
function writePHSuccessNetLink(xbIsTeacher){
	if(gbIsCD){
		document.write('<img src="../shared/images/onepixel.gif" width="10" height="10" alt="">');
	} else if (xbIsTeacher) {
		document.write('<a class="toolbartext" href="/access/ShowTeacherHomePage" target="_top" title="Return to PH SuccessNet homepage"><nobr>Return to<nobr><br>PH SuccessNet</a>');
	} else {
		document.write('<a class="toolbartext" href="/iText/ShowStudentHomePage" target="_top" title="Return to PHSuccessNet homepage"><nobr>Return to<nobr><br>PHSuccessNet</a>');
	}
}



//////////////////////////////////////////////////////////////
// Argument pairs are (imageName1, imageSource1, ...)
// Requires gbPreloadFlag var.
function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			document[changeImages.arguments[i]].src = changeImages.arguments[i+1];
		}
	}
}

/////////////////////////////////////////////////////////////////
// Mininav functions
/////////////////////////////////////////////////////////////////
function setMiniNavToCurLoc() {
	vsDummyCurLoc = gsCurLoc;
	gsCurLoc = "";
	changeImagesMininav(vsDummyCurLoc, "images/" + vsDummyCurLoc + "over.jpg");
	gsCurLoc = vsDummyCurLoc;
}

// used both for setting onload as well as onclick
function turnOffCurMiniNavLoc() {
	vsDummyCurLoc = gsCurLoc;
	gsCurLoc = "";
	changeImagesMininav(vsDummyCurLoc, "images/" + vsDummyCurLoc + ".jpg");
	gsCurLoc = vsDummyCurLoc;
}

function goToFromMiniNav(xsWhere) {		
	if(putUpCDWarningWindowP(xsWhere)) {
		openCDWarningWindow("mininav");
	} else if(xsWhere == "chapmap") {
		top.maincontent.document.location = "../index.html";
	} else {
		vsNextLocPath = "../" + xsWhere + "/page1/index.html";
		// turn off old
		turnOffCurMiniNavLoc();
		
		// set the top variable
		top.gsCurMiniNavLoc = xsWhere;
		gsCurLoc = xsWhere;
		
		// set the stage right
		parent.activities.document.location = vsNextLocPath;
		
		// set the mininav
		setMiniNavToCurLoc();
	}
}

// was for the mininav, but now no rollover.
// maybe change name to simpleChangeImages since no mention of preload flag
function changeImagesMininav(xsImageName, xsImageSrc) {
	if (document.images) {
		// don't do the rollover if current loc
		if(xsImageName != gsCurLoc){
			document[xsImageName].src = xsImageSrc;
		}
	}
}

/////////////////////////////////////////////////////////////////
// Window opening functions
/////////////////////////////////////////////////////////////////
function openSmallerWindoweltext(xsURL){
	if (navigator.appname == "Netscape") {
		var vsSize = "screenX=0,screenY=60,height=475,width=625,";
	} else {
		var vsSize =  "left=0,top=60,height=475,width=625,";
	}
	
	var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes";
	
	openThirdWindow(xsURL, "eltext", vsSize + vsAttributes);
}

function openSmallerWindowunitAssessment(xsURL){
	if(!gbIsCD) {
	if (navigator.appname == "Netscape") {
		var vsSize = "screenX=0,screenY=60,height=475,width=625,";
	} else {
		var vsSize =  "left=0,top=60,height=475,width=625,";
	}
	
	var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes";
	
	openThirdWindow(xsURL, "unitassessment", vsSize + vsAttributes);
	} else {
		openCDWarningWindow("unithome");
	}

}

function openSmallerWindowglossterm(xsURL){
	if (navigator.appname == "Netscape") {
		var vsSize = "screenX=100,screenY=75,height=250,width=320,";
	} else {
		var vsSize = "left=100,top=75,height=250,width=320,";
	}
	
	var vsAttributes = "toolbar=no,menubar=yes,location=no,scrollbars=yes,resizable=no";
	openThirdWindow(xsURL, "glossterm", vsSize + vsAttributes);
}


function openSmallerWindowgloss(xsURL){
	if (navigator.appname == "Netscape"){ 
		var vsSize = "screenX=0,screenY=75,height=380,width=320,";
	} else {
		var vsSize = "left=0,top=75,height=380,width=320,";
	}
	
	var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=no,resizable=no";
	
	openThirdWindow(xsURL, "glossary", vsSize + vsAttributes);
}

function openSmallerWindowskills(xsURL){
		if (navigator.appname == "Netscape") {
			var vsSize = "screenX=0,screenY=50,height=475,width=710,";
		} else {
			var vsSize =  "left=0,top=50,height=475,width=710,";
		}
		
		var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes";
		
		openThirdWindow(xsURL, "skills", vsSize + vsAttributes);
}

//
function openSmallerWindow(xsURL){
	if (navigator.appname == "Netscape") {
		var vsSize = "screenX=0,screenY=75,height=600,width=475,";
	} else {
		var vsSize =  "left=0,top=75,height=600,width=475,";
	}
	
	var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes";

	openThirdWindow(xsURL, "standard", vsSize + vsAttributes);

}
// added to remove servlet call function from CH assessment pages
function openSmallerWindowCA(){
		openCDWarningWindow("chAssessment");
}
// added to remove servlet call function from CH assessment pages miniav
function openSmallerWindowCA2(){
		openCDWarningWindow("mininav");
}

function openSmallerWindowsave(xsURL){
	if (navigator.appname == "Netscape") {
		var vsSize = "screenX=0,screenY=60,height=475,width=625,";
	} else {
		var vsSize =  "left=0,top=60,height=475,width=625,";
	}
	
	var vsAttributes = "toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes";
	
	openThirdWindow(xsURL, "save", vsSize + vsAttributes);
}

// master window function
function openThirdWindow(xsURL, xsName, xsAttributes){		
	var thisWindow = window.open(xsURL, xsName, xsAttributes);
	// removed line below to resolve IE freezing on Mac OS-X - Sanjay
	//	thisWindow.focus();
}

function writeCopyright() {
	document.write("<span class='copyright'>Copyright &copy; 2004 by Pearson Education, Inc., publishing as Pearson Prentice Hall. All rights reserved.</span>");
}
