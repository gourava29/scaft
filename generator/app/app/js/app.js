"use strict"
var app = (function(){

	//private method
	function changeHtml(){
		var headingElement = document.getElementById("heading");
		var headingHtml = "Welcome to " + headingElement.innerHTML;
		headingElement.innerHTML = headingHtml;
	}

	return {
		//public methods
		init: function(){
			changeHtml();
		}
	}

}());