const token = $("#jwtToken").val();
var headerString = `Bearer ${token}`;
jQuery(document).ready(function() {
	getAppellation();
	getSuffix();
	getGender();
	getNationality();
});



function getAppellation() {
	var inData = {
		gnumIsValid: 1,

	};

	ajaxGlobalFunction("GET", "/registrationRest/getAppellations", inData,
		"getAppellationsResponse", headerString);

}

// Response function for handling data returned from the server
var getAppellationsResponse = function(data) {
	//console.log("data" + data);
	// Assuming "data" contains the list of appellation names
	$("#gnumAppellationCode1").html(data);

};

function getSuffix() {
	var inData = {
		gnumIsValid: 1,

	};
	ajaxGlobalFunction("GET", "/registrationRest/getSuffix", inData,
		"getSuffixResponse", headerString);
}

// Response function for handling data returned from the server
var getSuffixResponse = function(data) {
	//console.log("data" + data);
	// Assuming "data" contains the list of appellation names
	$("#gnumSuffixCode").html(data);

};

function getGender() {
	var inData = {
		gnumIsValid: 1,

	};
	ajaxGlobalFunction("GET", "/registrationRest/getGender", inData,
		"getGenderResponse", headerString);
}

// Response function for handling data returned from the server
var getGenderResponse = function(data) {
	//console.log("data" + data);
	// Assuming "data" contains the list of appellation names
	$("#gstrGenderCode").html(data);

};


function getNationality() {
	var inData = {
		gnumIsValid: 1,

	};
	ajaxGlobalFunction("GET", "/registrationRest/getNationality", inData,
		"getNationalityResponse", headerString);
}

// Response function for handling data returned from the server
var getNationalityResponse = function(data) {
	//console.log("data" + data);
	// Assuming "data" contains the list of appellation names
	$("#gnumNationalityCode").html(data);

};