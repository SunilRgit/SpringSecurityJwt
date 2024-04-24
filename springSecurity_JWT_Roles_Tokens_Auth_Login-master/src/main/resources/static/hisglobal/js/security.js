function checkURL(vURL) {
	var flg = true;
	$.ajax({
		url: vURL,
		async: false,
		success: function() {
			flg = true;
		},
		error: function(jqXHR, status, er) {
			// only set the error on 404
			if (jqXHR.status === 404) {
				flg = false;
			}
			else if (jqXHR.status === 500) {
				flg = false;
			}
		}
	});
	return flg;
}

var token_key = "fhttf";
var csrf_token_key = "x-auth-token";

var createFHash = function(frmId) {
	var datastring = $("#" + frmId).serializeArray();
	document.getElementsByName(token_key)[0].value = getHexaCode(datastring);
};

var getHexaCode = function(datastring) {

	datastring.sort(function(a, b) {
		var a1 = a.name.toLowerCase(),
			b1 = b.name.toLowerCase();
		if (a1 == b1) return 0;
		return a1 > b1 ? 1 : -1;
	});

	var myInput = "";

	$.each(datastring, function(index, val) {

		if (val.name != token_key) {
			var newVal = val.value;
			newVal = newVal.replace(/\%26/g, "&"); // replacing & with blanks
			newVal = newVal.replace(/ /gi, "_");
			newVal = newVal.replace(/\%2C/g, ","); // replacing + with blanks
			newVal = unescape(newVal);
			newVal = newVal.replace(/\n|\r\n|\r/g, '_');

			if (newVal == 'undefined')
				newVal = '';
			myInput = myInput + "" + newVal;
		}
	});
	console.log("str :: " + myInput);
	return hex_md5(myInput.replace(/\%7C/gi, "|"));
};

var submitForm = function() {
	document.forms[0].submit();
};

var getQueryParameters = function(str) {

	str = str.split('?')[1];
	var outputArray = new Array();
	var strVals = str.split("&");
	for (var i = 0; i < strVals.length; i++) {
		var newVals = strVals[i].split("=");
		var obj = { name: "" + newVals[0], value: "" + newVals[1] };
		outputArray[i] = obj;
	}

	return outputArray;
};

var getJsonParameters = function(obj) {

	var outputArray = new Array();

	var i = 0;
	for (var prop in obj) {
		if (obj[prop] != null && obj[prop] != "null") {
			var myobj = { name: "" + prop, value: "" + obj[prop] };
			outputArray[i] = myobj;
			i = i + 1;
		}

	}

	return outputArray;

}


var getQueryParametersAsArray = function(str) {
	var outputArray = new Array();
	var strVals = str.split("&");
	for (var i = 0; i < strVals.length; i++) {
		var newVals = strVals[i].split("=");
		var obj = {
			name: "" + newVals[0],
			value: "" + decodeURIComponent(newVals[1]).replace(/\+/g, ' ')
		}
		outputArray[i] = obj;
	}
	return outputArray;
}

var getFormDataParams = function(obj) {

	var outputArray = new Array();
	var fileI = 0;
	var i = 0;
	for (var key of obj.keys()) {
		var myobj = null;

		if (!key.includes("file")) {
			myobj = {
				name: "" + key,
				value: "" + obj.get(key)
			};

			outputArray[i] = myobj;
			i = i + 1;
		}
	}
	return outputArray;
}


function readSingleFile(f, id) {
	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			contents = contents.split(',')[1];
			var encodedFileContent = hex_md5(contents);
			$("#f_codes" + id).remove();
			$("<input type='hidden' name='f_codes' class='f_codes' id='f_codes" + id + "' value='" + encodedFileContent + "' />").insertAfter("#fhttf");

		}
		r.readAsDataURL(f);

	} else {
		alert("Failed to load file");
	}
}



var createFHashAjaxQuery = function(str) {
	var mystr = "";

	if (checkURL('/imcs/hislogin/initChangePassword')) {

		var qstring = getQueryParameters(str);
		console.log(qstring);
		var hcode = getHexaCode(qstring);
		mystr = str + "&" + token_key + "=" + hcode;

	} else {

		mystr = "/imcs/views/sso_error_login_appnotavail.jsp?a=0";

	}

	return mystr;
};


var getToken = function(selTabVal) {
	//alert(selTabVal);
	var strUrl = "/token/getToken",
		strReturn = "";

	$.ajax({
		url: strUrl,
		type: "POST",
		dataType: "text",
		data: {
			selTab: selTabVal
		},
		success: function(html) {
			strReturn = html;
		},
		error: function(err) {
			console.log("Token generation error");
		},
		async: false
	});
	//	alert(strReturn+"-0=======");

	return strReturn;
}


function getFormData($form) {
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value'];
	});


	return Base64.encode("1" + Base64.encode(JSON.stringify(indexed_array)) + "0");
}


$(document).ready(function() {

	if (window.frameElement == null) {
		if (window.parent == null) {
			document.getElementsByTagName("body")[0].innerHTML = "<center>Unauthorized Activity</center>";
			return false;
		}
	}

	var selectedTab = "";
	if (window.frameElement)
		selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
	else
		selectedTab = document.forms[0].id.split("_")[0].split(" ").join("_");

	//console.log("selectedTab" + selectedTab);

	var secSelTab = hex_md5(selectedTab);
	//console.log("secSelTab" + secSelTab);


	$('<input>').attr({
		type: 'hidden',
		id: csrf_token_key,
		name: csrf_token_key,
		value: getToken(secSelTab)
	}).appendTo('form');


	$('<input>').attr({
		type: 'hidden',
		id: token_key,
		name: token_key
	}).appendTo('form');


	(function() {
		//alert("test"+document.forms[0].id);
		var originalSubmit = document.forms[0].submit;
		document.forms[0].submit = function() {


			createFHashForSubmit(document.forms[0].id);
			//console.log("inside 13");
			$("div#ajaxSpinner").removeClass('hide').addClass('show');

			// Call the original submit() function to actually submit the form
			// Per Aria's suggestion below keeping the "this" binding consistent
			originalSubmit.apply(document.forms[0]);
			return false;
		};

	})();

});


var createFHashForSubmit = function(frmId) {

	if (window.frameElement)
		selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
	else
		selectedTab = document.forms[0].id.split("_")[0].split(" ").join("_");

	console.log("selectedTab" + selectedTab);

	var secSelTab = hex_md5(selectedTab);
	console.log("secSelTab" + secSelTab);

	document.getElementById(frmId).elements[csrf_token_key].value = getToken(secSelTab);
	var datastring = $("#" + frmId).serializeArray();

	var formdata = JSON.stringify(datastring);
	console.log("datastring" + formdata);

	document.getElementById(frmId).elements[token_key].value = getHexaCode(datastring);

	console.log(token_key + "  :: " + document.getElementById(frmId).elements[token_key].value);

};

