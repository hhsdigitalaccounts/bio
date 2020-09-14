// 8/6/03 Ed Jung - JavaScript code to handle processing of HTML interactivities.

function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(0, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return "";	// return false;
	}
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	this.getLength = function() { return this.keyValuePairs.length; }	
}

var _pagedata = new PageQuery(pagedata);

function getElement(key){
	return unescape(_pagedata.getValue(key)); 
}

function validateSubmit(){
	if (role == "teacher") {
		alert("Sorry, Teachers cannot make changes.");
		return false;
	}
	return true;
}

function loadData(value) {
	document.wq.elements[value].value = getElement(value);
}


function loadCB(value)
{
	if (getElement(value) == "Y") {
		document.wq.elements[value].checked = true;
	}
}