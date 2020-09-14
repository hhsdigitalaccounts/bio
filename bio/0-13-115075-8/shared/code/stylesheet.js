/* This script is intended to identify the Browser Application (ie. Netscape/IE) and set the
stylesheet file accordingly.  It will set one of two files named "microsoftstyle.css" or "netscapestyle.css".  
*/

// Make the sniffer object
var is = new sniffer();

// Platform and browser sniffer
function sniffer() {
	// convert all characters to lowercase to simplify testing
    var agt=navigator.userAgent.toLowerCase();
    //alert(agt);									//for curiosity
    // *** BROWSER VERSION NUMBERS***
    this.major = parseInt(navigator.appVersion)
    this.minor = parseFloat(navigator.appVersion)
	// *** BROWSER TYPE ***
    this.nav  = ((agt.indexOf('mozilla')!=-1) && ((agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1)))
	this.ie   = (agt.indexOf("msie") != -1)
	// *** OS PLATFORM ***
	this.mac    = (agt.indexOf("mac")!=-1)
}


function setBrowserStyle(xsPath) {
	if (is.nav && is.mac){
		vsFileName = "netscape.css";
	}else{
		vsFileName = "microsoft.css";
	}
	vsHREF = xsPath + vsFileName;

	document.write("<LINK REL='Stylesheet' HREF='" + vsHREF + "'>");
}

/* old version
function setBrowserStyle(xsPath) {
	if (is.ie || !is.mac) {
		vsFileName = "microsoft.css";
	} else {
		vsFileName = "netscape.css";
	}
	vsHREF = xsPath + vsFileName;

	document.write("<LINK REL='Stylesheet' HREF='" + vsHREF + "'>");
}
*/
