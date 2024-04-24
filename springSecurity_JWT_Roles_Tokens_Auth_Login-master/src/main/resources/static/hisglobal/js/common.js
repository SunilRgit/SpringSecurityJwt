function initSecurityParameterFromajaxjson(datajson) {
	var json = convertDataToStandardFormat(datajson)
	sortandEncodebase64(json);
	datajson[token_key] = $('#' + token_key).val();
	//alert(JSON.stringify(datajson));
	return datajson;
}

function convertDataToStandardFormat(datajson) {
	var resultJson = new Array();
	var json =
		$.each(datajson, function(k, v) {
			if (v == undefined)
				v = "";
			var json = {
				"name": k,
				"value": v.toString()
			};
			resultJson.push(json);
		});
	//alert("resultJson--" + JSON.stringify(resultJson));

	return resultJson;
}

function sortandEncodebase64(datastring) {
	if ($('[name=' + token_key + ']').length <= 0) {
		try {
			$('<input>').attr({
				type: 'hidden',
				id: token_key,
				name: token_key
			}).appendTo('form');
		} catch (e) {
			$('form').append("<input type='hidden' id='" + token_key + "' name='" + token_key + "' />")
			//alert("Error Message -> "+e.message);
			//console.log("in validation .js Error Message -> "+e.message);
		}
	}
	$('#' + token_key).val("");
	datastring.sort(function(a, b) {
		var a1 = a.name.toLowerCase(), b1 = b.name.toLowerCase();
		if (a1 == b1) return 0;
		return a1 > b1 ? 1 : -1;
	});

	datastring = "1" + encryptBase64(JSON.stringify(datastring)) + "0";

	//alert($('[name='+token_key+']').length);
	//alert(JSON.stringify(datastring));
	$('#' + token_key).val(encryptBase64(JSON.stringify(datastring)));
	//console.log("dbfhttf :: "+document.getElementsByName(token_key)[0].value);
	//return JSON.stringify(datastring);
}


var token_key = "fhttf";
var csrf_token_key = "x-auth-token";

var ajaxGlobalFunction = function(method, url, data, funcName, headerString) {
	if (Object.keys(data).length > 0) {
		if (method == "POST") {
			data[csrf_token_key] = $('#' + csrf_token_key).val();
		}
		//console.log("JSON.stringify(data)" + JSON.stringify(data));
		var qstring;
		if (typeof data === 'object') {
			qstring = getJsonParameters(data);
			var hcode = getHexaCode(qstring);
			data[token_key] = hcode;
		} else {
			var isFoundFhttf = false, isFoundCsrfToken = false;
			qstring = getQueryParametersAsArray(data);
			for (var i = 0; i < qstring.length && !isFoundCsrfToken; ++i) {

				if (!isFoundCsrfToken && qstring[i].name === csrf_token_key) {
					//console.log("token name in if ", isFoundCsrfToken && qstring[i].name);
					qstring[i].value = $('#' + csrf_token_key).val();
					isFoundCsrfToken = true;
				}
			}

			if (!isFoundCsrfToken) {
				qstring[qstring.length] = {
					"name": csrf_token_key,
					"value": $('#' + csrf_token_key).val()
				}
			}
			var hcode = getHexaCode(qstring);

			for (var i = 0; i < qstring.length && !isFoundFhttf; ++i) {
				if (!isFoundFhttf && qstring[i].name === token_key) {
					qstring[i].value = hcode;
					isFoundFhttf = true;
				}

			}
			if (!isFoundFhttf) {
				qstring[qstring.length] = {
					"name": token_key,
					"value": hcode
				}
			}

			data = qstring;
		}
		//console.log(qstring);
		var hcode = getHexaCode(qstring);
		//console.log("hcode"+hcode);
		data[token_key] = hcode;
		//console.log("data");
		//console.log("data", data);
	}

	$.ajax({
		type: method,
		url: url,
		data: data,
		headers: {
			Authorization: headerString
		},
		async: true,
		dataType: "text",
		success: function(res) {
			//console.log(res);
			try {
				if (res.includes('[ Error Id :') || res.includes('Form Data Tampered')) {
					//console.log("if");
					document.getElementsByTagName("html")[0].innerHTML = res;
				} else if (res.includes('Session is Expired or Not a Authenticated User1')) {
					//console.log("else if");
					document.getElementsByTagName("html")[0].innerHTML = res;
				} else {
					//console.log("else");
					window[funcName](res);
				}
			} catch (e) {
			}
		},
		beforeSend: function() {
			//console.log("inside 11");
			$("div#ajaxSpinner").removeClass('hide').addClass('show');
		},
		complete: function() {
			//console.log("inside 12");
				$("div#ajaxSpinner").removeClass('show').addClass('hide');
		}
	});
}


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
	//console.log("str :: " + myInput);
	return hex_md5(myInput.replace(/\%7C/gi, "|"));
};


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

function encryptBase64(val){
	var encodedString  = Base64.encode(val);
	return encodedString ;
}


function checkSequence(s) {
	// Check for sequential numerical characters
	for (var i in s)
		if (+s[+i + 1] == +s[i] + 1 &&
			+s[+i + 2] == +s[i] + 2) return false;
	// Check for sequential alphabetical characters
	for (var i in s)
		if (String.fromCharCode(s.charCodeAt(i) + 1) == s[+i + 1] &&
			String.fromCharCode(s.charCodeAt(i) + 2) == s[+i + 2]) return false;
	return true;
}