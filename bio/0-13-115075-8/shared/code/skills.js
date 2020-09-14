function writeLeftSkillsNavigation(){
	var vsSkillsSection = gsCurrentSkillsSection;
	var vaSkillsSections = new Array();


	// create array with the different sections
	vaSkillsSections[0] = new Array ("measurements" , "Making Measurements");
	vaSkillsSections[1] = new Array ("scientificinv" , "Conducting a Scientific Investigation");
	vaSkillsSections[2] = new Array ("microscope" , "Using a Microscope");
	vaSkillsSections[3] = new Array ("labsafety" , "Lab Safety Primer");
	vaSkillsSections[4] = new Array ("mathreview" , "Math Review");
	vaSkillsSections[5] = new Array ("graphing" , "Graphing");
	vaSkillsSections[6] = new Array ("organizeinfo" , "Organizing Information");
	vaSkillsSections[7] = new Array ("standardizedtests" , "Studying for Standardized Tests");
	vaSkillsSections[8] = new Array ("sciarticle" , "Reading a Scientific Article");
	vaSkillsSections[9] = new Array ("webresearch" , "Critical Thinking for Web Research");
	
		
	//write begining of table
	document.write("<table border='0' cellspacing='5' cellpadding='0' width='125'>");
	document.write("<tr>");
	document.write("<td><img src='../../../shared/images/spacer.gif' width='12' height='1'></td>");
	document.write("<td><img src='../../../shared/images/spacer.gif' width='100' height='1'></td>");
	document.write("</tr>");
	
	//write links
	for(i=0; i <vaSkillsSections.length; i++){
		var vsHtml	 = "<tr>"
		vsHtml		+= "	<td valign='top' align='center'><img src='../../images/dot.gif' vspace='4'></td>"
		vsHtml		+= "	<td><a href='../../" + vaSkillsSections[i][0] + "/page1/index.html' class='" +  WriteLinkState(vsSkillsSection, vaSkillsSections[i][0]) + "'>" + vaSkillsSections[i][1] + "</td>"
		vsHtml		+= "</tr>";
		document.write(vsHtml);
	}
	
	//write end of table
	//document.write ( "</tr></td>")
	document.write("</table>");
}
function WriteLinkState(xsCurSkillsSection, xsSection){
	if(xsCurSkillsSection == xsSection){
		return ("activeSkillsLink");
	}else {
		return ("inactiveSkillsLink")
	}
	
}
// write the page numbers and arrows
function writePageNavigation() {
	viTotalSkillsPages = giTotalSkillsPages;
	viCurSkillsPage 	 = giCurSkillsPage;
	vsHTML 			 = "";
	vsImagePath 	 = "../../../toolbar/subtoolbars/images/"	
	vsHTML = vsHTML + "<td><img src='" + vsImagePath + "onepixel.gif' width='100' height='20' alt=''></td>";
	
	//-----------------------------------------------------
	// write the prev arrow 
	if(viCurSkillsPage == 1) {
		vsPrevArrowState = "gray";
		vsOpenLinkTag = "";
		vsCloseLinkTag = "";
	} else {
		vsPrevArrowState = "";
		vsOpenLinkTag = "<a href='javascript:HandleSkillsArrowClick(-1);' onmouseover='changeSkillsImages(\"prevArrow\",\"" + vsImagePath + "arrowleftroll.gif\");' onmouseout='changeSkillsImages(\"prevArrow\",\"" + vsImagePath + "arrowleft.gif\");'>";
		vsCloseLinkTag = "</a>";
	}
	
	vsHTML = vsHTML + "<td>" + vsOpenLinkTag + "<img src='" + vsImagePath + "arrowleft" + vsPrevArrowState + ".gif' border='0' name='prevArrow' alt='Previous page'>" + vsCloseLinkTag + "</td>";


	//-----------------------------------------------------
	// start the cell for the numbers
	vsHTML = vsHTML + "<td nowrap>";
	
	// for as many pages as there are, write each icon 
	for(i=1;i<=viTotalSkillsPages;i++) {
		vsLinkNum = "page" + String(i) + "/index";
		
		// write the stepper numbers
		if(i == viCurSkillsPage) {
			// if this is the cur page, write the icon with no link
			vsHTML = vsHTML + "<img src='" + vsImagePath + i + "down.gif'" + " alt='Page " + i + " - Current page'>";
		} else {
			// if more or less than cur page write the link for the roll
			vsHTML = vsHTML + "<a href='javascript:HandleSkillsPageNumClick(" + i + ");' onmouseover='changeSkillsImages(\"page" + i + "\",\"" + vsImagePath + i  + "roll.gif\");' onmouseout='changeSkillsImages(\"page" + i + "\",\"" + vsImagePath + i + "up.gif\");'><img src='" + vsImagePath + i + "up.gif' name='page" + i + "' alt='Page " + i + "' border='0'></a>";
		}
		
		// close off the cell
		if(i==viTotalSkillsPages) { 
			vsHTML = vsHTML + "</td>";
		}
	}
	
	//-----------------------------------------------------
	// write the next arrow
	if(viCurSkillsPage < viTotalSkillsPages) {
		vsNextArrowState = "";
		vsOpenLinkTag    = "<a href='javascript:HandleSkillsArrowClick(1);' onmouseover='changeSkillsImages(\"nextArrow\",\"" + vsImagePath + "arrowrightroll.gif\");' onmouseout='changeSkillsImages(\"nextArrow\",\"" + vsImagePath + "arrowright.gif\");'>"
		vsCloseLinkTag   = "</a>"
	} else {
		vsNextArrowState = "gray";
		vsOpenLinkTag    = "";
		vsCloseLinkTag   = "";
	}
	
	// the next arrow
	vsHTML = vsHTML + "<td>" + vsOpenLinkTag + "<img src='" + vsImagePath + "arrowright" + vsNextArrowState + ".gif' border='0' name='nextArrow' alt='Next page'>" + vsCloseLinkTag + "</td>";
	
	document.write(vsHTML)
	//return vsHTML;
}
function changeSkillsImages(xsImageName, xsImageSrc) {
	document.images[xsImageName].src = xsImageSrc;
}
function HandleSkillsPageNumClick(xiWhichNum) {
	skillsPage = "";
	skillsPage = skillsPage+document.location;
	if(skillsPage.indexOf("microscope") != -1 && xiWhichNum == 3)  {
		webSkillsPage();
		} else {
		document.location = "../page" + xiWhichNum + "/index.html";
		}
}

function HandleSkillsArrowClick(xiDelta) {
	skillsPage = "";
	skillsPage = skillsPage+document.location;
	if(skillsPage.indexOf("microscope") != -1 && (viCurSkillsPage + xiDelta) == 3)  {
		webSkillsPage();
		} else {
		document.location = "../page" + (viCurSkillsPage + xiDelta) + "/index.html";
		}
}

function webSkillsPage() {
		vsURLPath = "../../../";
		var thisWindow = window.open(vsURLPath + "shared/cdwarning.html", "CDWarning", "height=240,width=325,screenX=300,screenY=200,left=300,top=200,toolbar=no,menubar=no,location=no,scrollbars=no,resizable=no");
		thisWindow.focus();

}
