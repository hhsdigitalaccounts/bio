// This is the pathname manager who keeps track of where you are
// and writes the html for the path.
// Ex: home:unit1:chapter4:concept3 (or explore2, etc.)

function PathMan() {
	this.unit  			= 0;
	this.chap  			= 0;
	this.misc  			= 0;
	this.ie    			= false;
	this.mac   			= false;
	this.browserVersion	= 0;
	this.whereAreWe 	= "";
	this.linkRegEx 		= /\{\{!linkPath!\}\}/ig;
	this.imageRegEx 	= /\{\{!imagePath!\}\}/ig;
	this.rootURL		= "";

	// add the functions to the object
	this.writePath               = writePath;
	this.getPathHTML		     = getPathHTML;
	this.handlePathClick         = handlePathClick;
	this.reset			         = reset;
	this.register	             = register;
	this.refreshPathFrame		 = refreshPathFrame;
	this.getStepperHTML	         = getStepperHTML;
	this.setImageAndLinkPath     = setImageAndLinkPath;
	this.changeImages		     = changeImages;
	this.setSnifferVariables     = setSnifferVariables;
	this.mGetCurChap		     = mGetCurChap;
	this.mGetCurUnit		     = mGetCurUnit;
	this.mHandleNextConceptClick = mHandleNextConceptClick;
	this.mHandleArrowClick       = mHandleArrowClick;
	this.mGetCurConceptNum       = mGetCurConceptNum;
	this.mHandleStepNumClick     = mHandleStepNumClick;
	this.getBrowserVersion		 = getBrowserVersion;
	this.getAbsolutePath		 = getAbsolutePath;
	
	this.setSnifferVariables();
	this.rootURL = this.getAbsolutePath("index.html");  //Abs path to site's root
}

function setSnifferVariables() {
    var agt					= navigator.userAgent.toLowerCase();
	this.ie   				= (agt.indexOf("msie") != -1)
	this.mac  				= (agt.indexOf("mac")  != -1)
	this.browserVersion		= this.getBrowserVersion();
}


//Detect browser major version for both MSIE and Navigator.
//xsType = {'major', 'minor'}
function getBrowserVersion(xsType) {
	var version = 0;
	var searchString	= "msie";
	var versionStr = navigator.appVersion.toLowerCase();
	var index = versionStr.indexOf(searchString);
	if (index >= 0) {
		var str = versionStr.slice(index);
		str = str.slice(searchString.length);
		if (xsType == "major") {
			version = parseInt(str);
		} else {
			version = parseFloat(str);
		}
	} else {
		if (xsType == "major") {
			version = parseInt(versionStr);
		} else {
			version = parseFloat(versionStr);
		}
	}
	return version;			
}

// change the image xsImageName to the xsImageSrc
// THIS CAN ONLY BE USED IN THE SUBTOOLBAR FOR MISC PAGES BECAUSE OF THE PATH NAME
function changeImages(xsImageName, xsImageSrc) {
	top.subtoolbar.document.images[xsImageName].src = xsImageSrc;
}

// called from each content page to reload the subtoolbar.
// The path stuff is needed because of IE treats the path as where this object was created,
// while other browsers from the page calling this function.
// Each content page is ASSUMED to be "index.html"
function refreshPathFrame() {
	var vsSubtoolbarLoc = "toolbar/subtoolbars/subtoolbarpath.html";
	if(this.ie) {
		// for ie
		top.subtoolbar.document.location = vsSubtoolbarLoc;
	} else {
		var vsDocumentLoc = this.getAbsolutePath("index.html");
		
		vsDocumentLoc = vsDocumentLoc + vsSubtoolbarLoc;
		top.subtoolbar.document.location.href = vsDocumentLoc;
	}
}

function getAbsolutePath(xsFile) {
	var vsDocumentLoc           = new String(document.location);
	var viLastLetter            = vsDocumentLoc.indexOf(xsFile);
	// if the URL is missing the filename then you have the path already or the filename doesn't exist
	if(viLastLetter != -1) {
		vsDocumentLoc     = vsDocumentLoc.substring(0,viLastLetter);
	}
	return vsDocumentLoc;
}

function reset() {
	this.unit  = 0;
	this.chap  = 0;
	this.misc  = 0;
}

function register(xsWhich, xiArg1, xiArg2, xiArg3) {
	// reset all variables so that when going up heirarchy, all is clear
	this.unit = "";
	this.chap = "";
	this.misc = "";
	this.whereAreWe = xsWhich;
	
	switch (xsWhich) {
		case "unit":
			this.unit  = xiArg1;
			break;
		case "chap":
			this.unit  = xiArg1;		
			this.chap  = xiArg2;
			break;
		case "misc":
			this.unit  = xiArg1;		
			this.chap  = xiArg2;
			this.misc  = xiArg3;
			break;
	} 
}

////////////////////////////////////////////////////////////////////////////////
//
// 			PATHNAME FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

// called from all of the pages that need the pathman
// if the parameter is anything at all, it writes to activities
// otherwise to maincontent
// xsWhere = "unit", "chap", "misc"
function writePath() {
	var vsHTML	= this.getPathHTML();
	vsHTML		= this.setImageAndLinkPath(vsHTML); // replace the {{!imagePath!}} and {{!linkPath!}}
	top.subtoolbar.document.open();
	top.subtoolbar.document.write(vsHTML);
	top.subtoolbar.document.close();
}

// write out the path
function getPathHTML() {
	var vsSeparator = "<b> > </b>";
	var vsHTML      = "";
	
	// written no matter what
	vsHTML = vsHTML + "<table border='0' align='top'><tr><td width='5'><img src='" + "{{!imagePath!}}" + "spacer.gif' height='18' width='130'></td><td valign='middle' nowrap><a href='javascript:top.goPathMan.handlePathClick(\"contents\");' target='maincontent' class=\"pathnameactive\">Contents</a>";
	vsHTML = vsHTML + vsSeparator;
	
	// if chap, then write the unit link, otherwise, we are at a unit home page
	if(this.chap) {
		vsHTML = vsHTML + "<a href='javascript:top.goPathMan.handlePathClick(\"unit\");' target='maincontent' class=\"pathnameactive\">Unit " + this.unit + "</a>";

		// now check for misc to see if we are on a chapter home page
		if(this.misc) {
			// not on chapter home page, cuz there is a misc.
			vsHTML = vsHTML + vsSeparator;
			vsHTML = vsHTML + "<a href='javascript:top.goPathMan.handlePathClick(\"chap\");' target='maincontent' class=\"pathnameactive\">Chapter " + this.chap + "</a>";
			vsHTML = vsHTML + vsSeparator;
			vsHTML = vsHTML + "<span class=\"pathnameinactive\">" + this.misc + "</span></td>";
			vsHTML = vsHTML + this.getStepperHTML();
			vsHTML = vsHTML + "</tr></table>";
		} else {
			// we are on a chapter home page
			vsHTML = vsHTML + vsSeparator;
			vsHTML = vsHTML + "<span class=\"pathnameinactive\">Chapter " + this.chap + "</span></td></tr></table>";	
		}
	} else {
		// unit home page
		vsHTML = vsHTML + "<span class=\"pathnameinactive\">Unit " + this.unit + "</span></td></tr></table>";
	}
	
	return vsHTML;
}

// Handler for click on breadcrumb (path portion only)
function handlePathClick(xsWhich) {
	var vsPath;
	
	// if not home, we load just the stage
	if(xsWhich != "home") {
		if(xsWhich == "unit") {
			vsPath = this.rootURL + "units/unit" + this.unit + "/index.html";
			this.chap = 0;
			this.misc = 0;
		} else if(xsWhich == "chap") { 
			vsPath = this.rootURL + "units/unit" + this.unit + "/" + this.chap + "/index.html"
			this.misc = 0;
		} else if(xsWhich == "contents") { 
			vsPath = this.rootURL + "home/index.html";
			this.misc = 0;
			this.chap = 0; // db added 4/23
		}

		top.maincontent.document.location = vsPath;
	} else if(xsWhich == "home") { 
		// if home, we load the top
		vsPath = this.rootURL + "index.html";
		this.chap = 0; // db added 4/23
		this.misc = 0;
		top.document.location = vsPath;
	} 
}

// Replaces search strings (regex) for link and image paths
function setImageAndLinkPath(xsHTML) {
	var vsHTML	= xsHTML;	
	vsHTML		= vsHTML.replace(this.linkRegEx, this.rootURL);
	vsHTML		= vsHTML.replace(this.imageRegEx, (this.rootURL + "toolbar/subtoolbars/images/") );
	return vsHTML;
}


////////////////////////////////////////////////////////////////////////////////
//
// 			STEPPER FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////


// return the HTML for the stepper breadcrumbs
function getStepperHTML() {
	viTotalMiscPages = top.giTotalMiscPages;
	viCurMiscPage 	 = top.giCurMiscPage;
	vsCurMiniNavLoc  = top.gsCurMiniNavLoc;
	vsHTML 			 = "";
	
	vsHTML = vsHTML + "<td><img src='" + "{{!imagePath!}}" + "onepixel.gif' width='200' height='20' alt=''></td>";
	
	//-----------------------------------------------------
	// write the prev arrow 
	if(viCurMiscPage == 1) {
		vsPrevArrowState = "gray";
		vsOpenLinkTag = "";
		vsCloseLinkTag = "";
	} else {
		vsPrevArrowState = "";
		vsOpenLinkTag = "<a href='javascript:top.goPathMan.mHandleArrowClick(-1);' onmouseover='top.goPathMan.changeImages(\"prevArrow\",\"" + "{{!imagePath!}}" + "arrowleftroll.gif\");' onmouseout='top.goPathMan.changeImages(\"prevArrow\",\"" + "{{!imagePath!}}" + "arrowleft.gif\");'>";
		vsCloseLinkTag = "</a>";
	}
	
	vsHTML = vsHTML + "<td>" + vsOpenLinkTag + "<img src='" + "{{!imagePath!}}" + "arrowleft" + vsPrevArrowState + ".gif' border='0' name='prevArrow' alt='Previous page'>" + vsCloseLinkTag + "</td>";


	//-----------------------------------------------------
	// start the cell for the numbers
	vsHTML = vsHTML + "<td nowrap>";
	
	// for as many pages as there are, write each icon 
	for(i=1;i<=viTotalMiscPages;i++) {
		vsLinkNum = "page" + String(i) + "/index";
		
		// write the stepper numbers
		if(i == viCurMiscPage) {
			// if this is the cur page, write the icon with no link
			vsHTML = vsHTML + "<img src='" + "{{!imagePath!}}" + i + "down.gif'" + " alt='Page " + i + " - Current page'>";
		} else {
			// if more or less than cur page write the link for the roll
			vsHTML = vsHTML + "<a href='javascript:top.goPathMan.mHandleStepNumClick(" + i + ");' onmouseover='top.goPathMan.changeImages(\"page" + i + "\",\"" + "{{!imagePath!}}" + i  + "roll.gif\");' onmouseout='top.goPathMan.changeImages(\"page" + i + "\",\"" + "{{!imagePath!}}" + i + "up.gif\");' target='activities'><img src='" + "{{!imagePath!}}" + i + "up.gif' name='page" + i + "' alt='Page " + i + "' border='0'></a>";
		}
		
		// close off the cell
		if(i==viTotalMiscPages) { 
			vsHTML = vsHTML + "</td>";
		}
	}
	
	//-----------------------------------------------------
	// write the next arrow
	if(viCurMiscPage < viTotalMiscPages) {
		vsNextArrowState = "";
		vsOpenLinkTag    = "<a href='javascript:top.goPathMan.mHandleArrowClick(1);' onmouseover='top.goPathMan.changeImages(\"nextArrow\",\"" + "{{!imagePath!}}" + "arrowrightroll.gif\");' onmouseout='top.goPathMan.changeImages(\"nextArrow\",\"" + "{{!imagePath!}}" + "arrowright.gif\");'>"
		vsCloseLinkTag   = "</a>"
	} else {
		vsNextArrowState = "gray";
		vsOpenLinkTag    = "";
		vsCloseLinkTag   = "";
	}
	
	// the next arrow
	vsHTML = vsHTML + "<td>" + vsOpenLinkTag + "<img src='" + "{{!imagePath!}}" + "arrowright" + vsNextArrowState + ".gif' border='0' name='nextArrow' alt='Next page'>" + vsCloseLinkTag + "</td>";
	
	// if this is a concept area and we are on the last page, write the next concept link
	if(viCurMiscPage == viTotalMiscPages && vsCurMiniNavLoc.indexOf("concept") != -1) {
		// if the cur concept is not the last concept
	   if(this.mGetCurConceptNum() < top.giNumConceptsInCurChap) {		
		vsHTML = vsHTML + "<td nowrap><a href='javascript:top.goPathMan.mHandleNextConceptClick();' class=\"pathnameactive\">Next Activity</span></a></td>";	
	 	}
	}
	return vsHTML;
}

// return an integer of the current concept number
function mGetCurConceptNum() {
	vsWhereNow          = top.gsCurMiniNavLoc;
	viCurConceptNum     = parseInt(vsWhereNow.split("concept")[1]);
	return viCurConceptNum;
}

// Go to a specific page in the activities frame, has to be in same chapter
// Only called from a "misc" page
function mGoToSpecificAreaAndPageInContentFrame(xsWhichArea, xiWhichPage) {
	top.maincontent.activities.document.location = this.rootURL + "units/unit" + this.unit + "/" + this.chap + "/" + xsWhichArea + "/page" + xiWhichPage + "/index.html";
}

//Only called from a "misc" page
function mHandleStepNumClick(xiWhichNum) {
	top.maincontent.activities.document.location = this.rootURL + "units/unit" + this.unit + "/" + this.chap + "/" + top.gsCurMiniNavLoc + "/page" + xiWhichNum + "/index.html";
}

// handles both the previous and next arrows on the stepper
// get the current page number and increment by 1
function mHandleArrowClick(xiDelta) {
	top.maincontent.activities.document.location = this.rootURL + "units/unit" + this.unit + "/" + this.chap + "/" + top.gsCurMiniNavLoc + "/page" + (top.giCurMiscPage + xiDelta) + "/index.html";
}

function mHandleNextConceptClick() {
	// get the current concept number and increment by 1
	var viCurConceptNum     = this.mGetCurConceptNum();
	top.gsCurMiniNavLoc 	= "concept" + String(viCurConceptNum + 1);
	top.maincontent.document.location = this.rootURL + "shared/mininav/index.html";
}


///////////////////////////////////////////////////////////////////////////////////////////
//
// 			PUBLIC FUNCTIONS
//
///////////////////////////////////////////////////////////////////////////////////////////

function mGetCurUnit() {
	return String(this.unit);
}

function mGetCurChap() {
	return String(this.chap);
}
