/*
File Name 		: util.js
Version	  		: 2.0
*/

/*
List of functions in this file

 1>	Showlayer(id,mode)
 2> roundValue(original_number, decimals) 
 3> manipulateValue(value1,value2,mode)
 4> trimAll(strValue)
 5> openPopUp(url,width,height,top_pos,left_pos,mode)
 6>	selectAll(chkName,mode)
 7> shiftToright(left_list_name,right_list_name,left_list_remove)
 8> shiftToleft(left_list_name,right_list_name,left_list_insert)
 9> shiftAllToRight(left_list_name,right_list_name,left_list_remove)
 10> shiftAllToLeft(left_list_name,right_list_name,left_list_insert)
 11> selectListRecords(list_name)
 12> searchInListBox(list_name,value)		 						
*/


/*
	This function displays/hides the layer's contents. 
	It accepts
		id --> layer ID
		mode --> 1  >> Display
				 0	>> Hide
*/
function Showlayer(id, mode) {
	var objValue = document.getElementById(id);

	if (objValue != null) {
		if (mode == 1)	// display
			layerObj.style.display = "BLOCK";
		else
			layerObj.style.display = "NONE";
	}
} // end Showlayer()

/*
 * This function is used to round a value upto given decimal point e.g. 10.235
 * (2 decimal point) --> 10.24 It returns rounded value
 */
function roundValue(original_number, decimals) {
	var flag = 0;

	if (original_number < 0) flag = 1;

	var result1 = Math.abs(original_number) * Math.pow(10, decimals);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10, decimals);

	if (flag == 1) result3 = manipulateValue(0, result3, 1);

	return pad_with_zeros(result3, decimals);
}

/*
 * This function is used to add/substract two values. It is required b'coz JS
 * gives wrong result while adding/substracting two decimal value e.g. 8.245-4 =
 * 4.2449999999999992 (something returned by JS) = 4.245 [Returned by this
 * function]
 * 
 * It accepts value1/value2 --> values mode --> 0 --> Addition 1 -->
 * Substraction It returns manipulated value
 */
function manipulateValue(value1, value2, mode) {
	var index1, index2;
	var strVal1 = "", strVal2 = "";
	var strLen1 = 0, strLen2 = 0;
	var value = 0;

	strVal1 = value1.toString();
	strVal2 = value2.toString();

	index1 = strVal1.indexOf(".");

	index2 = strVal2.indexOf(".");

	if (index1 > -1 || index2 > -1) {
		if (index1 > -1)
			strLen1 = (strVal1.substr(index1 + 1)).length;

		if (index2 > -1)
			strLen2 = (strVal2.substr(index2 + 1)).length;

		if (strLen2 > strLen1)
			strLen1 = strLen2;

		if (mode == 0)
			value = ((value1 * Math.pow(10, strLen1)) + (value2 * Math.pow(10, strLen1))) / Math.pow(10, strLen1);
		else
			value = ((value1 * Math.pow(10, strLen1)) - (value2 * Math.pow(10, strLen1))) / Math.pow(10, strLen1);
	}
	else {
		if (mode == 0)
			value = value1 + value2;
		else
			value = value1 - value2;
	}

	return value;
}

/*
 * Function For Removing spaces in string e.g. ajay kumar gupta return value =
 * ajaykumargupta
 */
function trimAll(strValue) {
	var j;
	var retStr = "";
	var len = strValue.length;

	for (j = 0; j < len; j++) {
		if (strValue.charAt(j) != " ") retStr += strValue.charAt(j);
	}

	return retStr;
}

/**
 * Popup functionality
 * 
 * This function is used to open pop up window <<Constrints >> In a page, only
 * one popup window can be active at a time. If user tries to open another popup
 * window then this function will close the previous popup then open the new
 * popup <<How to use the popup functionality >>
 * 
 * Step 1>> Define the following global variables in parent form
 * 
 * var child = null; var popIndex = 0; var gblCntrlObj = null;
 * 
 * Step 2>> write the following code in body tag in parent form
 * 
 * onFocus="checkPopUp();" onUnload="closePopUp();"
 * 
 * Step 3>>Write the following code to open popup where you want
 * 
 * openPopUp(url,width,height,index,cntrlObj) -- Argument description defined
 * below
 * 
 * Step 4>>In Popup window, write the following code in body tag
 * 
 * onUnload="window.opener.closeChild();"
 * 
 * Step 5 >>In Popup window, if you have given the close functionality then call
 * the following function on close event
 * 
 * window.opener.closePopUp(); <<Argument>>
 * 
 * url >> path width >> width of the popup page height >> height of the popup
 * page index >> unique value, this is mandatory. It will be useful if same
 * popup is displayed on different - different event
 * 
 * cntrlObj >> Not Mandatory (don't need to pass anything), it would be useful
 * if popup window is opened using checkbox and you want that as popup window is
 * closed then this checkbox should be unchecked.
 */
function openPopUp(url, width, height, index, cntrlObj) {
	var width = width;
	var height = height;
	var left = parseInt((screen.availWidth / 2) - (width / 2));
	var top = parseInt((screen.availHeight / 2) - (height / 2));
	var flag = 0;
	if (child != null && !child.closed) {
		if (popIndex == index) {
			flag = 1;
			child.focus();
		}
		else {
			closeChild();
		}
	}

	if (flag == 0) {
		popIndex = index;
		gblCntrlObj = cntrlObj;
		var windowFeatures = "width=" + width + ",height=" + height + ",status,scrollbars=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
		child = window.open(url, "subWind", windowFeatures);
		child.focus();
	}
}// end openPopUp()

/**
 * This function is used to set focus on pop up window
 */
function checkPopUp() {
	if (child != null && !child.closed)
		child.focus();
}

/**
 * This function is used to close popup window
 */
function closePopUp() {
	if (child != null && !child.closed) {
		if (gblCntrlObj != null && typeof (gblCntrlObj) != "undefined") {
			if ((gblCntrlObj.type).toUpperCase() == "CHECKBOX") {
				gblCntrlObj.checked = false;
				gblCntrlObj = null;
			}

		}
		//
		child.close();
		child = null;
		popIndex = 0;
	}
}
// popup functionality finish

/*
 * This function is used to selecting/deselecting all those checkbox that have
 * similar name It accepts CheckBox Name --> Name of check box mode --> 1 -->
 * has to select 0 --> has to deselect
 * 
 * It returns no of checkbox that have been selected/unselected
 */
function selectAll(chkName, mode) {
	var obj;
	var len = 0, i = 0;

	obj = document.getElementsByName(chkName);
	if (obj.length > 0) {
		for (i = 0; i < obj.length; i++) {
			if (obj[i].type == "checkbox") {
				if (mode == 1)	// select
				{
					if (!obj[i].checked) {
						obj[i].checked = true;
						len++;
					}
				}
				else			// un-select
				{
					if (obj[i].checked) {
						obj[i].checked = false;
						len++;
					}
				}
			}
		}
	}

	return len;
}// end selectAll()

/*
 * This function is used to move/copy the selected record(s) from the left list
 * box to right list box. It accepts the following parameters left_list_name -->
 * Name of Left List Box right_list_name --> Name of Right List Box
 * left_list_remove --> Whether moved record(s) has to be deleted from the left
 * list box. It having 1 --> Remove the moved records from the left list box 0
 * --> don't remove
 * 
 * It return no of records moved/copied.
 */
function shiftToRight(left_list_name, right_list_name, left_list_remove) {
	var index = 0;
	var count = 0, i = 0;
	var lobj, robj;

	// getting object
	lobj = document.getElementsByName(left_list_name);
	robj = document.getElementsByName(right_list_name);

	if (lobj.length > 0)		// left list box exist
	{
		for (i = 0; i < lobj[0].length; i++) {
			if (lobj[0].options[i].selected) {
				robj[0].length++;
				robj[0].options[robj[0].length - 1].text = lobj[0].options[i].text;
				robj[0].options[robj[0].length - 1].title = lobj[0].options[i].title;
				robj[0].options[robj[0].length - 1].value = lobj[0].options[i].value;
				count++;

				lobj[0].options[i].selected = false;

			}
			else {
				if (left_list_remove == 1)		// whether remove the data from
				// the left list box
				{
					lobj[0].options[index].text = lobj[0].options[i].text;
					lobj[0].options[index].title = lobj[0].options[i].title;
					lobj[0].options[index++].value = lobj[0].options[i].value;
				}
			}
		}

		// decrement
		if (left_list_remove == 1) {
			for (i = 0; i < count; i++)
				lobj[0].length--;
		}
	}

	return count;
} // end shiftToright() function

/*
 * This function is used to move the selected record(s) from the right list box
 * to left list box. It accepts the following parameters left_list_name --> Name
 * of Left List Box right_list_name --> Name of Right List Box left_list_insert
 * --> Whether selected record(s) in right list box has to be inserted into the
 * left list box. It having 1 --> Insert the selected records into left list box
 * 0 --> don't insert
 * 
 * It return no of records moved. Note >> 1. This function does not move those
 * records whose id is zero 2. This function in every case removes the records
 * from the right list box
 */
function shiftToLeft(left_list_name, right_list_name, left_list_insert) {
	var index = 0;
	var count = 0, i = 0;
	var lobj, robj;

	// getting object
	lobj = document.getElementsByName(left_list_name);
	robj = document.getElementsByName(right_list_name);

	if (robj.length > 0)		// right list box exists
	{
		for (i = 0; i < robj[0].length; i++) {

			if (robj[0].options[i].selected && robj[0].options[i].value != 0) {
				if (left_list_insert == 1)		// whether inserted into left
				// list box
				{
					lobj[0].length++;
					lobj[0].options[lobj[0].length - 1].text = robj[0].options[i].text;
					lobj[0].options[lobj[0].length - 1].title = robj[0].options[i].title;
					lobj[0].options[lobj[0].length - 1].value = robj[0].options[i].value;
				}
				count++;

				robj[0].options[i].selected = false;

			}
			else {
				robj[0].options[index].text = robj[0].options[i].text;
				robj[0].options[index].title = robj[0].options[i].title;
				robj[0].options[index++].value = robj[0].options[i].value;
			}
		}

		for (i = 0; i < count; i++)
			robj[0].length--;
	}

	return count;
}	// end shiftToleft() function

/*
 * This function is used to move/copy all record(s) from the left list box to
 * right list box. It accepts the following parameters left_list_name --> Name
 * of Left List Box right_list_name --> Name of Right List Box left_list_remove
 * --> Whether moved record(s) has to be deleted from the left list box. It
 * having 1 --> Remove the moved records from the left list box 0 --> don't
 * remove
 * 
 * It return no of records moved/copied.
 */
function shiftAllToRight(left_list_name, right_list_name, left_list_remove) {
	var count = 0, i = 0;
	var lobj, robj;

	// getting object
	lobj = document.getElementsByName(left_list_name);
	robj = document.getElementsByName(right_list_name);

	if (lobj.length > 0)		// left list box exists
	{
		for (i = 0; i < lobj[0].length; i++) {
			robj[0].length++;
			robj[0].options[robj[0].length - 1].text = lobj[0].options[i].text;
			robj[0].options[robj[0].length - 1].title = lobj[0].options[i].title;
			robj[0].options[robj[0].length - 1].value = lobj[0].options[i].value;
			count++;
		}

		// remove the records from the left list box
		if (left_list_remove == 1) lobj[0].length = 0;
	}

	return count;
} // end shiftAllToRight() function


/*
 * This function is used to move all record(s) from the right list box to left
 * list box. It accepts the following parameters left_list_name --> Name of Left
 * List Box right_list_name --> Name of Right List Box left_list_insert -->
 * Whether record(s) in right list box has to be inserted into the left list
 * box. It having 1 --> Insert the records into left list box 0 --> don't insert
 * 
 * It return no of records moved. Note >> 1. This function does not move those
 * records whose id is zero 2. This function in every case removes the records
 * from the right list box
 */
function shiftAllToLeft(left_list_name, right_list_name, left_list_insert) {
	var index = 0;
	var lobj, robj;
	var count = 0, i = 0;

	// getting object
	lobj = document.getElementsByName(left_list_name);
	robj = document.getElementsByName(right_list_name);

	if (robj.length > 0)	// right list box exists
	{
		for (i = 0; i < robj[0].length; i++) {
			if (robj[0].options[i].value != 0) {
				if (left_list_insert == 1)		// whether inserted into left
				// list box
				{
					lobj[0].length++;
					lobj[0].options[lobj[0].length - 1].text = robj[0].options[i].text;
					lobj[0].options[lobj[0].length - 1].title = robj[0].options[i].title;
					lobj[0].options[lobj[0].length - 1].value = robj[0].options[i].value;
				}
				count++;
			}
			else {
				robj[0].options[index].text = robj[0].options[i].text;
				robj[0].options[index].title = robj[0].options[i].title;
				robj[0].options[index++].value = robj[0].options[i].value;
			}
		}

		for (i = 0; i < count; i++)
			robj[0].length--;
	}

	return count;
} // end shiftAllToLeft() function

/*
 * This function is used to select the records in list box. It is required b'coz
 * un-selected records are not being set into java beans. It accepts the
 * following parameter
 * 
 * It returns no of records that has been selected Note >> This function will
 * not select those records whose ID is zero
 * 
 * 
 */
function selectListRecords(list_name) {
	var count = 0, i = 0;
	var lobj;

	// getting object
	lobj = document.getElementsByName(list_name);

	if (lobj.length > 0)		// list box exists
	{
		for (i = 0; i < lobj[0].length; i++) {
			if (lobj[0].options[i].value != 0) {
				lobj[0].options[i].selected = true;
				count++;
			}
		}
	}
	return count;
} // end selectListRecords()



/*
 * This function is used to unselect the records in list box. It accepts the
 * following parameter
 * 
 * list_name - Name of the List Box It returns no of records that has been
 * selected Note >> This function will not select those records whose ID is zero
 * 
 * 
 */
function unSelectListRecords(list_name) {
	var count = 0, i = 0;
	var lobj;

	// getting object
	lobj = document.getElementsByName(list_name);

	if (lobj.length > 0)		// list box exists
	{
		for (i = 0; i < lobj[0].length; i++) {
			if (lobj[0].options[i].value != 0) {
				lobj[0].options[i].selected = false;
				count++;
			}
		}
	}
	return count;
} // end selectListRecords()



/*
 * This function is used to search value in the list box. It accepts the
 * following parameters list_name --> Name of the list box value --> value that
 * is to be searched
 * 
 * it selects the matched record and returns true/false
 */
function searchInListBox(list_name, value) {
	flag = 0;
	var lobj;
	var i = 0;
	var retValue = false;

	if (value != "") {
		// getting object
		lobj = document.getElementsByName(list_name);
		if (lobj.length > 0)		// list box exists
		{
			for (i = 0; i < lobj[0].length; i++) {
				listValue = (lobj[0].options[i].text).toUpperCase();
				if (listValue.indexOf((value.toString()).toUpperCase()) == 0)	// matched
				{
					lobj[0].selectedIndex = i;
					retValue = true;
					break;
				}
			}
		}
	}

	return retValue;
} // end searchInListBox() function


/*
 * This is internal function called from roundValue() function
 */
function pad_with_zeros(rounded_value, decimal_places) {

	// Convert the number to a string
	var value_string = rounded_value.toString()

	// Locate the decimal point
	var decimal_location = value_string.indexOf(".")

	// Is there a decimal point?
	if (decimal_location == -1) {

		// If no, then all decimal places will be padded with 0s
		decimal_part_length = 0

		// If decimal_places is greater than zero, tack on a decimal point
		value_string += decimal_places > 0 ? "." : ""
	}
	else {

		// If yes, then only the extra decimal places will be padded with 0s
		decimal_part_length = value_string.length - decimal_location - 1
	}

	// Calculate the number of decimal places that need to be padded with 0s
	var pad_total = decimal_places - decimal_part_length

	if (pad_total > 0) {

		// Pad the string with 0s
		for (var counter = 1; counter <= pad_total; counter++)
			value_string += "0"
	}

	return value_string
}



var token_key = "fhttf";
var csrf_token_key = "x-auth-token";

var ajaxFunction = function(method, url, data, funcName) {
	var responseValidateToken = hex_md5($('#' + csrf_token_key).val());
	console.log("data uyuiy");
	console.log(data);
	console.log("csrf vale", $('#' + csrf_token_key).val());
	if (Object.keys(data).length > 0) {
		if (method == "POST") {
			data[csrf_token_key] = $('#' + csrf_token_key).val();
		}
		console.log("JSON.stringify(data)" + JSON.stringify(data));
		var qstring;
		if (typeof data === 'object') {
			data["responseValidateToken"] = responseValidateToken;
			qstring = getJsonParameters(data);
			var hcode = getHexaCode(qstring);
			data[token_key] = hcode;

		} else {
			var isFoundFhttf = false, isFoundCsrfToken = false;
			qstring = getQueryParametersAsArray(data);
			for (var i = 0; i < qstring.length && !isFoundCsrfToken; ++i) {

				if (!isFoundCsrfToken && qstring[i].name === csrf_token_key) {
					console.log("token name in if ", isFoundCsrfToken && qstring[i].name);
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
				console.log("token name in if ", isFoundFhttf && qstring[i].name);

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

			qstring[qstring.length] = {
				"name": "responseValidateToken",
				"value": responseValidateToken
			}

			data = qstring;
		}
		//		console.log(qstring);
		//		var hcode = getHexaCode(qstring);	
		//		console.log("hcode"+hcode);
		//		data[token_key] = hcode;
		//		console.log("data");
		console.log("data", data);
	}
	else {
		//alert("inside 2");
		data["responseValidateToken"] = responseValidateToken;
	}

	console.log("data", data);

	$.ajax({
		type: method,
		url: url,
		data: data,
		async: true,
		dataType: "text",
		success: function(res, textStatus, request) {
			var responseToken = request.getResponseHeader('responseValidateToken');
			try {
				if (res.includes('[ Error Id :') || res.includes('Form Data Tampered')) {
					document.getElementsByTagName("html")[0].innerHTML = res;
				} else if (res.includes('Session is Expired or Not a Authenticated User1')) {
					document.getElementsByTagName("html")[0].innerHTML = res;
				}
				else {
					console.log("responseToken" + responseToken);
					console.log("responseValidateToken" + responseValidateToken);
					if (responseToken != responseValidateToken) {
						document.getElementsByTagName("html")[0].innerHTML = "Response Tampered";
					}

					else {
						var selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
						var secSelTab = hex_md5(selectedTab);
						var newCsrfToken = getToken(secSelTab);
						console.log("Getting new token", newCsrfToken)
						$('#' + csrf_token_key).val(newCsrfToken);
						console.log(document.getElementById(csrf_token_key).value);
						window[funcName](res);
					}
				}
			} catch (e) {
				// Handle exceptions here
				console.error("Exception occurred:", e);
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			console.error("AJAX Error:", errorThrown);
			// Handle AJAX error here
		},
		beforeSend: function() {
			console.log("inside 15");
			$("div#ajaxSpinner").removeClass('hide').addClass('show');
		},
		complete: function() {
			console.log("inside 16");
			$("div#ajaxSpinner").removeClass('show').addClass('hide');
		}
	});
}



function disableAnchor(disable, url) {

	var obj = document.getElementById("id1");

	if (disable) {
		var href = obj.getAttribute("href");
		obj.removeAttribute('href');
		obj.style.color = "red";
	}
	else {
		obj.setAttribute('href', url);
		obj.style.color = "blue";
	}

}

/**
 * This function checks the Duplication present in the Multi row Components.
 * 
 * compName - Multirow Component Value. userMessage - User Message when Multirow
 * Component Contains Duplicate Value
 * 
 */
function checkMultirow(compName, userMessage) {

	var val = document.getElementsByName(compName);
	var len = val.length - 1;

	if (userMessage == '') userMessage = "Data Already Entered in MultiRow";


	if (len != 1) {

		for (i = 0; i < len; i++) {

			for (j = i + 1; j < len; j++) {

				if (val[i].value == val[j].value) {

					// alert(userMessage);

					val[j].focus();

					return false;
				}

			}

		}

	}


	return true;

}




/**
 * This function checks the Duplication present in the Multi row Components.
 * 
 * dataName - Hidden Component Values. multiCompName - Multirow Component
 * Value. userMessage - User Message when Multirow Component Contains Hidden
 * Component Value
 */
function checkDataExists(dataName, multiCompName, userMessage) {

	if (userMessage == '') userMessage = "Data Already Exists";

	var dataVal = document.getElementsByName(dataName);
	var dataLen = dataVal.length;

	if (dataLen != 0) {

		var multVal = document.getElementsByName(multiCompName);
		var multLen = multVal.length - 1;

		for (i = 0; i < dataLen; i++) {

			for (j = 0; j < multLen; j++) {

				if (dataVal[i].value == multVal[j].value) {

					// alert(userMessage);
					multVal[j].focus();

					return false;
				}
			}
		}
	}

	return true;
}

/**
 * This function checks the Duplication present in the Multi row Components.
 * 
 * dataName - Hidden Component Values. multiCompName - Multirow Component
 * Value. userMessage - User Message when Multirow Component Contains Hidden
 * Component Value
 */
function checkDataExists1(dataName, multiCompName, userMessage) {

	if (userMessage == '') userMessage = "Data Already Exists";

	var dataVal = document.getElementsByName(dataName);
	var dataLen = dataVal.length;

	if (dataLen != 0) {

		var multVal = document.getElementsByName(multiCompName);
		var multLen = multVal.length - 1;

		for (i = 0; i < dataLen; i++) {

			for (j = 0; j < multLen; j++) {

				if (dataVal[i].value == multVal[j].value) {

					// alert(userMessage);
					multVal[j].focus();

					return false;
				}
			}
		}
	}

	return true;
}

function generatePdf(dataDivId, anchorName, anchorTdId) {
	var tableLen = document.getElementsByName("recordIndexTable").length;
	var printImg = {};
	var anchorText;
	if (tableLen > 0) {
		for (var i = 0; i < tableLen; i++) {
			document.getElementById("recordIndexTable" + i + "").innerHTML = "";
		}
	}

	for (var i = 0; i < 9; i++) {
		if (document.getElementById("printImg" + i + "")) {
			if (document.getElementById("printImg" + i + "").innerHTML != "") {
				printImg[i] = document.getElementById("printImg" + i + "").innerHTML;
				document.getElementById("printImg" + i + "").innerHTML = "";
			}

		}
	}


	var dataDivObj = "";

	if (document.getElementById(dataDivId) != null) {
		dataDivObj = document.getElementById(dataDivId);
	}
	else {
		alert("No data to convert in pdf format!");
	}

	if (dataDivObj.innerHTML != "") {
		var flag = false;
		var len;
		var arrAnchorTd = [];
		if (document.getElementsByName(anchorName)) {
			flag = true;
			len = document.getElementsByName(anchorName).length;
			for (var i = 0; i < len; i++) {
				if (document.getElementById(anchorTdId + i)) {
					anchorText = document.getElementById(anchorName + i).text;
					if (anchorName == 'strPONo') {
						if (document.getElementById(anchorName + i).text.lastIndexOf("(") > 0) {
							anchorText = document.getElementById(anchorName + i).text.split("(").join(" (");
						}
					}

					arrAnchorTd.push(document.getElementById(anchorTdId + i).innerHTML);
					document.getElementById(anchorTdId + i).innerHTML = "<font face='Verdana, Arial, Helvetica, sans-serif' size='2'>" + anchorText + "</font>";
				}


			}
		}

		document.forms[0].strHtmlCode.value = innerXHTML(dataDivObj);
		document.forms[0].hmode.value = "generatePdf";
		document.forms[0].submit();

		for (var i = 0; i < 9; i++) {
			if (document.getElementById("printImg" + i + "")) {
				if (document.getElementById("printImg" + i + "").innerHTML == "") {
					document.getElementById("printImg" + i + "").innerHTML = printImg[i];
				}

			}
		}

		if (flag == true) {
			for (var i = 0; i < len; i++) {
				if (document.getElementById(anchorTdId + i)) {
					document.getElementById(anchorTdId + i).innerHTML = arrAnchorTd[i];
				}
			}
		}
		document.forms[0].strHtmlCode.value = "";

	} else {
		alert("No data to convert in pdf format!");
	}
}

function generateXLS(e, dataDivId) {
	var printImg = {};

	for (var i = 0; i < 9; i++) {
		if (document.getElementById("printImg" + i + "")) {
			if (document.getElementById("printImg" + i + "").innerHTML != "") {
				printImg[i] = document.getElementById("printImg" + i + "").innerHTML;
				document.getElementById("printImg" + i + "").innerHTML = "";
			}

		}
	}

	window.open('data:application/vnd.ms-excel,' + encodeURIComponent($("#" + dataDivId + "").html()));
	e.preventDefault();

	for (var i = 0; i < 9; i++) {
		if (document.getElementById("printImg" + i + "")) {
			if (document.getElementById("printImg" + i + "").innerHTML == "") {
				document.getElementById("printImg" + i + "").innerHTML = printImg[i];
			}

		}
	}

}


/*
 * this function is used to restrict no. of items in the right box NOTE: Ids of
 * the left and right box must be defined and attribute "id" and "name" must be
 * same leftItemName- name of left box rightItemName - name of right box
 * removeInsert - whether to remove or insert( look at shiftToRight() function
 * for more detail) limitQty - no. of items you want in right box
 */
function shiftToRightLimit(leftItemName, rightItemName, removeInsert, limitQty) {
	var lenRight = parseInt(document.getElementsByName(rightItemName)[0].length);
	var lenLeft = $("#" + leftItemName + " :selected").length;
	var totalItem = lenRight + lenLeft;

	if (totalItem > limitQty) {
		alert("More than " + limitQty + " items are not allowed in Right Box \n " +
			"Left Selected Item  Count: " + lenLeft + " \n Right Item Count: " + lenRight + "");
		return false;
	}
	else {
		shiftToRight(leftItemName, rightItemName, removeInsert);
	}
}


/**
 * Method to make Voucher Scrollabe
 * 
 * @param voucherDivId
 *            the div id of content div e.g. toPopup div on jsp.
 * @param headerTableId
 *            the table id of Header table.
 * @param contentDivId
 *            the div id of content div of table
 * @param heightToSubtract
 *            the height to subract from window height
 */
var winHeight = 0;
function scrollableVoucher(voucherDivId, headerTableId, contentDivId, heightToSubtract) {

	$("#" + voucherDivId + "").show();
	if (heightToSubtract) {
		winHeight = window.innerHeight;
	}
	else {
		heightToSubtract = 0;
		winHeight = (15 / 100) * window.innerHeight;
	}

	$("#" + contentDivId + "").css({ "height": "" });
	var contentDivHeight = $("#" + contentDivId + "").height();
	var divHeight = winHeight - heightToSubtract;
	$("#" + voucherDivId + "").hide();

	if (contentDivHeight > divHeight) {
		$("#" + headerTableId + "").css({ "table-layout": "fixed" });
		$("#" + headerTableId + " th:last").css({ "padding": "0 14px 0 3px" });
		$("#" + contentDivId + "").css({ "height": divHeight });
		$("#" + contentDivId + "").css({ "width": "95%", "margin-left": "2.5%", "overflow": "auto" });
		$("#" + contentDivId + " table").removeClass("TABLEWIDTH");
		$("#" + contentDivId + " table").addClass("NEWTABLEWIDTH");
	} else {
		$("#" + headerTableId + "").css({ "table-layout": "", "padding": "0" });
		$("#" + headerTableId + " th:last").css({ "padding": "0" });
		$("#" + contentDivId + "").css({ "width": "100%", "margin-left": "0%" });
		$("#" + contentDivId + " table").removeClass("NEWTABLEWIDTH");
		$("#" + contentDivId + " div table").addClass("TABLEWIDTH");
	}
}

/**
 * Method to print Scrollabe Voucher
 * 
 * @param printContentDivId
 *            the div id of content div inside toPopup div on jsp.
 * @param mainTableId
 *            the id of Main Table inculding header table and content table
 * @param headerTableId
 *            the table id of Header table.
 * @param contentDivId
 *            the div id of content div
 */

function printScrollabeVoucher(printContentDivId, mainTableId, headerTableId, contentDivId) {
	var mainTableHTML = document.getElementById(mainTableId).innerHTML;

	newwin = window.open('', 'printwin',
		'left=100,top=100,width=700,height=700,scrollbars=yes');
	newwin.document.write('<HTML><HEAD>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML);
	newwin.document.write('<style type="text/css"> .hidecontrol { display: none; } div.closePopup {display: none;}</style>\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('<\/script>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY onload="print_win()">\n');

	$("#" + headerTableId + "").hide();
	$("#" + contentDivId + " table tr:first").css({ "display": "table-row" });
	$("#" + contentDivId + "").css({ "height": "" });

	newwin.document.write(document.getElementById(printContentDivId).innerHTML);
	newwin.document.write('</BODY>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();

	document.getElementById(mainTableId).innerHTML = mainTableHTML;

}

/**
 * Method to generate pdf of Scrollabe Voucher
 * 
 * @param dataDivId
 *            the div id of content div inside toPopup div on jsp.
 * @param mainTableId
 *            the id of Main Table inculding header table and content table
 * @param headerTableId
 *            the table id of Header table.
 * @param contentDivId
 *            the div id of content div
 */
function generatePdfScrollVoucher(dataDivId, mainTableId, headerTableId, contentDivId) {
	var mainTableHTML = $("#" + mainTableId + "").html();

	var printImg = document.getElementById("printImg").innerHTML;
	document.getElementById("printImg").innerHTML = "";
	var dataDivObj = "";

	if (document.getElementById(dataDivId) != null) {
		dataDivObj = document.getElementById(dataDivId);
	} else {
		alert("No data to convert in pdf format!");
	}

	if (dataDivObj.innerHTML != "") {

		$("#" + headerTableId + "").hide();
		$("#" + contentDivId + " table tr:first").css({ "display": "table-row" });
		$("#" + contentDivId + "").css({ "height": "" });

		document.forms[0].strHtmlCode.value = innerXHTML(dataDivObj);
		document.forms[0].hmode.value = "generatePdf";

		document.forms[0].submit();
		document.getElementById("printImg").innerHTML = printImg;
		document.forms[0].strHtmlCode.value = "";

	} else {
		alert("No data to convert in pdf format!");
	}

	$("#" + mainTableId + "").html(mainTableHTML);
}


function generatePdfScroll(dataDivId, mainTableId, headerTableId, contentDivId) {
	var mainTableHTML = $("#" + mainTableId + "").html();

	var printImg = document.getElementById("printImg").innerHTML;
	document.getElementById("printImg").innerHTML = "";
	var dataDivObj = "";

	if (document.getElementById(dataDivId) != null) {
		dataDivObj = document.getElementById(dataDivId);
	} else {
		alert("No data to convert in pdf format!");
	}

	if (dataDivObj.innerHTML != "") {

		$("#" + headerTableId + "").hide();
		$("#" + contentDivId + " table tr:first").css({ "display": "table-row" });
		$("#" + contentDivId + "").css({ "height": "" });

		document.forms[0].strHtmlCode.value = innerXHTML(dataDivObj);
		document.forms[0].hmode.value = "generatePdf";

		document.forms[0].submit();
		document.getElementById("printImg").innerHTML = printImg;
		document.forms[0].strHtmlCode.value = "";

	} else {
		alert("No data to convert in pdf format!");
	}

	$("#" + mainTableId + "").html(mainTableHTML);
}

function printDivGMSDWise(divName) {

	var strStoreName = $("select#hstnumStoreId").find('option:selected').text().toUpperCase().split(" ")[1].substr(0, 3);
	var printContents = document.getElementById(divName).innerHTML;

	newwin = window.open('', 'printwin', "menubar=no,location=no,resizable=no,status=yes,left=100,top=100,width=950,height=700,scrollbars=yes");
	newwin.document.write('<html><head>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('</script>\n');
	newwin.document.write('</head>\n');
	newwin.document.write('<body>\n');
	newwin.document.write(printContents);
	newwin.document.write('</body>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</html>\n');
	newwin.document.close();

}





function printDiv(divName) {
	// $(".hideOnPrint").hide();
	var printContents = document.getElementById(divName).innerHTML;





	newwin = window.open('', 'printwin', 'left=100,top=100,width=950,height=700,scrollbars=yes');
	newwin.document.write('<HTML><HEAD>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('<\/script>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY>\n');
	newwin.document.write("<div>"
		+ printContents);

	newwin.document.write('</BODY>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();

}


function printDivAssessmentReport(divName) {
	// $(".hideOnPrint").hide();
	var printContents = document.getElementById(divName).innerHTML;
	newwin = window.open('', 'printwin', 'left=100,top=100,width=950,height=700,scrollbars=yes');
	newwin.document.write('<HTML moznomarginboxes mozdisallowselectionprint><HEAD><title>NHSRC-Report</title>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');
	newwin.document.write('<\/script>\n');

	newwin.document.write('<style type="text/css" media="print">\n');
	newwin.document.write('@page {\n');
	newwin.document.write('size: A4;\n');
	newwin.document.write('margin: 	5mm 10mm 0 25mm;\n');
	newwin.document.write('}\n');
	newwin.document.write('body {\n');
	newwin.document.write('width:21cm;\n');
	newwin.document.write('height: 29.7cm;\n');
	newwin.document.write('margin-top: 100px;\n');
	newwin.document.write('padding-top: 72px;\n');
	newwin.document.write('padding-bottm: 72px;\n');
	newwin.document.write('margin-bottom: 50px;\n');
	newwin.document.write('}\n');
	newwin.document.write('#header {\n');
	// newwin.document.write('border-bottom:1px solid #000 !important ;\n');
	newwin.document.write('width: 100%;\n');
	newwin.document.write('height: 100px;\n');
	newwin.document.write('}\n');
	// newwin.document.write('#footer {\n');
	// newwin.document.write('position: fixed;\n');
	// newwin.document.write('bottom: 0;\n');
	// newwin.document.write('width: 100%;\n');
	// newwin.document.write('height: 50px;\n');
	// newwin.document.write('}\n');
	newwin.document.write('<\/style>\n');
	newwin.document.write('</HEAD>\n');
	// newwin.document.write('<header id="header"><img
	// src="../nhsrc/image/logo1.jpg"></header>\n');
	newwin.document.write('<body>\n');
	// newwin.document.write('<header id="header"><img
	// src="../nhsrc/image/logo1.jpg"></header>\n');
	// newwin.document.write('<footer id="footer">lurking
	// below</footer>\n');
	newwin.document.write("<div>"
		+ printContents);

	newwin.document.write('</div></body>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();

}



function printDivWatermark(divName) {
	// $(".hideOnPrint").hide();


	var printContents = document.getElementById(divName).innerHTML;




	newwin = window.open('', 'printwin', 'left=100,top=100,width=950,height=700,scrollbars=yes');
	newwin.document.write('<HTML><HEAD>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('<\/script>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY>\n');
	newwin.document.write("<div>" + "werrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrf"
		+ printContents);

	newwin.document.write('</BODY>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();

}

function printViewDiv(divName) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	const data = reader.readAsDataURL(file);
	var printContents = data;
	alert(data);
	newwin = window.open('', 'printwin', 'left=100,top=100,width=950,height=700,scrollbars=yes');
	newwin.document.write('<HTML><HEAD>');

	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('\n');
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('<\/script>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY>\n');
	newwin.document.write("<div><center><img src='../../imcs/hisglobal/images/report_header_withAddress.png' " + "width='300px' height='65px'></img>"
		+ "  <br/><br/></center>"
		+ printContents);
	newwin.document.write('</BODY>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();

}


function printDivWithoutAddress(divName) {
	var printContents = document.getElementById(divName).innerHTML;

	newwin = window.open('', 'printwin', "menubar=no,location=no,resizable=no,status=yes,left=100,top=100,width=950,height=700,scrollbars=yes");
	newwin.document.write('<html><head>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('</script>\n');
	newwin.document.write('</head>\n');
	newwin.document.write('<body>\n');
	newwin.document.write(printContents);
	newwin.document.write('</body>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</html>\n');
	newwin.document.close();

}

var numToRupee = function(event, obj) {
	// skip for arrow keys
	if (event.which >= 37 && event.which <= 40) {
		event.preventDefault();
	}

	$(obj).val(function(index, value) {
		return value
			.replace(/\D/g, "")
			.replace(/([0-9])([0-9]{2})$/, '$1.$2')
			;
	});
}


var numToFourDecimal = function(event, obj) {
	// skip for arrow keys
	if (event.which >= 37 && event.which <= 40) {
		event.preventDefault();
	}

	$(obj).val(function(index, value) {
		return value
			.replace(/\D/g, "")
			.replace(/([0-9])([0-9]{4})$/, '$1.$2')
			;
	});
}

function roundValue(original_number, decimals) {
	var flag = 0;

	if (original_number < 0) flag = 1;

	var result1 = Math.abs(original_number) * Math.pow(10, decimals);
	var result2 = Math.round(result1);
	var result3 = result2 / Math.pow(10, decimals);

	if (flag == 1) result3 = manipulateValue(0, result3, 1);

	return pad_with_zeros(result3, decimals);
}

function manipulateValue(value1, value2, mode) {
	var index1, index2;
	var strVal1 = "", strVal2 = "";
	var strLen1 = 0, strLen2 = 0;
	var value = 0;

	strVal1 = value1.toString();
	strVal2 = value2.toString();

	index1 = strVal1.indexOf(".");

	index2 = strVal2.indexOf(".");

	if (index1 > -1 || index2 > -1) {
		if (index1 > -1)
			strLen1 = (strVal1.substr(index1 + 1)).length;

		if (index2 > -1)
			strLen2 = (strVal2.substr(index2 + 1)).length;

		if (strLen2 > strLen1)
			strLen1 = strLen2;

		if (mode == 0)
			value = ((value1 * Math.pow(10, strLen1)) + (value2 * Math.pow(10, strLen1))) / Math.pow(10, strLen1);
		else
			value = ((value1 * Math.pow(10, strLen1)) - (value2 * Math.pow(10, strLen1))) / Math.pow(10, strLen1);
	}
	else {
		if (mode == 0)
			value = value1 + value2;
		else
			value = value1 - value2;
	}

	return value;
}

function pad_with_zeros(rounded_value, decimal_places) {

	// Convert the number to a string
	var value_string = rounded_value.toString()

	// Locate the decimal point
	var decimal_location = value_string.indexOf(".")

	// Is there a decimal point?
	if (decimal_location == -1) {

		// If no, then all decimal places will be padded with 0s
		decimal_part_length = 0

		// If decimal_places is greater than zero, tack on a decimal point
		value_string += decimal_places > 0 ? "." : ""
	}
	else {

		// If yes, then only the extra decimal places will be padded with 0s
		decimal_part_length = value_string.length - decimal_location - 1
	}

	// Calculate the number of decimal places that need to be padded with 0s
	var pad_total = decimal_places - decimal_part_length

	if (pad_total > 0) {

		// Pad the string with 0s
		for (var counter = 1; counter <= pad_total; counter++)
			value_string += "0"
	}

	return value_string
}


function convertNumberToWords(amount) {
	var words = new Array();
	words[0] = '';
	words[1] = 'One';
	words[2] = 'Two';
	words[3] = 'Three';
	words[4] = 'Four';
	words[5] = 'Five';
	words[6] = 'Six';
	words[7] = 'Seven';
	words[8] = 'Eight';
	words[9] = 'Nine';
	words[10] = 'Ten';
	words[11] = 'Eleven';
	words[12] = 'Twelve';
	words[13] = 'Thirteen';
	words[14] = 'Fourteen';
	words[15] = 'Fifteen';
	words[16] = 'Sixteen';
	words[17] = 'Seventeen';
	words[18] = 'Eighteen';
	words[19] = 'Nineteen';
	words[20] = 'Twenty';
	words[30] = 'Thirty';
	words[40] = 'Forty';
	words[50] = 'Fifty';
	words[60] = 'Sixty';
	words[70] = 'Seventy';
	words[80] = 'Eighty';
	words[90] = 'Ninety';
	amount = amount.toString();
	var atemp = amount.split(".");
	var number = atemp[0].split(",").join("");
	var n_length = number.length;
	var words_string = "";
	if (n_length <= 9) {
		var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
		var received_n_array = new Array();
		for (var i = 0; i < n_length; i++) {
			received_n_array[i] = number.substr(i, 1);
		}
		for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
			n_array[i] = received_n_array[j];
		}
		for (var i = 0, j = 1; i < 9; i++, j++) {
			if (i == 0 || i == 2 || i == 4 || i == 7) {
				if (n_array[i] == 1) {
					n_array[j] = 10 + parseInt(n_array[j]);
					n_array[i] = 0;
				}
			}
		}
		value = "";
		for (var i = 0; i < 9; i++) {
			if (i == 0 || i == 2 || i == 4 || i == 7) {
				value = n_array[i] * 10;
			} else {
				value = n_array[i];
			}
			if (value != 0) {
				words_string += words[value] + " ";
			}
			if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Crores ";
			}
			if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Lakhs ";
			}
			if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Thousand ";
			}
			if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
				words_string += "Hundred and ";
			} else if (i == 6 && value != 0) {
				words_string += "Hundred ";
			}
		}
		words_string = words_string.split("  ").join(" ");
	}
	return "<b>Amount in words: " + "&#8377;" + words_string + "</b>";
}




function Rs(amount) {
	var words = new Array();
	words[0] = 'Zero'; words[1] = 'One'; words[2] = 'Two'; words[3] = 'Three'; words[4] = 'Four'; words[5] = 'Five'; words[6] = 'Six'; words[7] = 'Seven'; words[8] = 'Eight'; words[9] = 'Nine'; words[10] = 'Ten'; words[11] = 'Eleven'; words[12] = 'Twelve'; words[13] = 'Thirteen'; words[14] = 'Fourteen'; words[15] = 'Fifteen'; words[16] = 'Sixteen'; words[17] = 'Seventeen'; words[18] = 'Eighteen'; words[19] = 'Nineteen'; words[20] = 'Twenty'; words[30] = 'Thirty'; words[40] = 'Forty'; words[50] = 'Fifty'; words[60] = 'Sixty'; words[70] = 'Seventy'; words[80] = 'Eighty'; words[90] = 'Ninety'; var op;
	amount = amount.toString();
	var atemp = amount.split(".");
	var number = atemp[0].split(",").join("");
	var n_length = number.length;
	var words_string = "";
	if (n_length <= 9) {
		var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
		var received_n_array = new Array();
		for (var i = 0; i < n_length; i++) {
			received_n_array[i] = number.substr(i, 1);
		}
		for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
			n_array[i] = received_n_array[j];
		}
		for (var i = 0, j = 1; i < 9; i++, j++) {
			if (i == 0 || i == 2 || i == 4 || i == 7) {
				if (n_array[i] == 1) {
					n_array[j] = 10 + parseInt(n_array[j]);
					n_array[i] = 0;
				}
			}
		}
		value = "";
		for (var i = 0; i < 9; i++) {
			if (i == 0 || i == 2 || i == 4 || i == 7) {
				value = n_array[i] * 10;
			} else {
				value = n_array[i];
			}
			if (value != 0) {
				words_string += words[value] + " ";
			}
			if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Crores ";
			}
			if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Lakhs ";
			}
			if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
				words_string += "Thousand ";
			}
			if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
				words_string += "Hundred and ";
			} else if (i == 6 && value != 0) {
				words_string += "Hundred ";
			}
		}
		words_string = words_string.split(" ").join(" ");
	}
	return words_string;

}


function RsPaise(n) {
	n = n.value;
	if (n > 999999999.99) {
		op = 'Oops!!! The amount is too big to convert';
		document.getElementById('word').innerHTML = "&#8377" + "  " + op;
	}
	else {
		nums = n.toString().split('.')
		var whole = Rs(nums[0])
		if (nums[1] == null) nums[1] = 0;
		if (nums[1].length == 1) nums[1] = nums[1] + '0';
		if (nums[1].length > 2) { nums[1] = nums[1].substring(2, length - 1) }
		if (nums.length == 2) {
			if (nums[0] <= 9) { nums[0] = nums[0] * 10 } else { nums[0] = nums[0] };
			var fraction = Rs(nums[1])
			if (whole == '' && fraction == '') { op = 'Zero only'; }
			if (whole == '' && fraction != '') { op = + fraction + ' paise only'; }
			if (whole != '' && fraction == '') { op = 'Rupees ' + whole + ' only'; }
			if (whole != '' && fraction != '') { op = 'Rupees ' + whole + 'and paise ' + fraction + ' only'; }
			// amt=document.getElementById('amt').value;

			// if(isNaN(amt) == true ){op='Error : Amount in number appears to
			// be
			// incorrect. Please Check.';}
			// document.getElementById('op').innerHTML=op;

			document.getElementById('word').innerHTML = "&#8377" + "  " + op;
		}
	}
}




function printDivReport(divName) {
	var printContents = document.getElementById(divName).innerHTML;

	newwin = window.open('', 'printwin', "menubar=no,location=no,resizable=no,status=yes,left=100,top=100,width=950,height=700,scrollbars=yes");
	newwin.document.write('<html><head>');
	newwin.document.write((document.getElementsByTagName("head")[0]).innerHTML.replace("security.js", "security1.js"));
	newwin.document.write('<script>\n');
	newwin.document.write('function chkstate(){ \n');
	newwin.document.write('window.close();\n');
	newwin.document.write('}\n');
	newwin.document.write('function print_win(){\n');
	newwin.document.write('window.print();\n');
	newwin.document.write('chkstate();\n');
	newwin.document.write('}\n');

	newwin.document.write('</script>\n');
	newwin.document.write('</head>\n');
	newwin.document.write('<body>\n');
	newwin.document.write(printContents);
	newwin.document.write('</body>\n');
	newwin.document.write('<script>\n');

	newwin.document.write('print_win();\n');
	newwin.document.write('</script>\n');
	newwin.document.write('</html>\n');
	newwin.document.close();

}







generate = function(divName, fileName) {
	var pdf = new jsPDF('p', 'pt', 'a4');


	pdf.addHTML(document.getElementById(divName), function() {
		pdf.save(fileName + '.pdf');
	});


};

var PromptDialog = function(title, callback) {
	title = title || 'Prompt';
	BootstrapDialog.show({
		title: title,
		message: '<input type="text" class="form-control">',
		closable: false,
		buttons: [{
			id: 'btn-ok',
			icon: 'fa fa-check',
			label: 'OK',
			cssClass: 'btn-default',
			autospin: false,
			action: function(dialog) {
				var data, $body = dialog.getModalBody();
				data = $body.find("input")[0].value;
				callback(data);
				dialog.close();
			}
		}, {
			id: 'btn-cancel',
			// icon: '',
			label: 'Cancel',
			cssClass: 'btn-danger',
			autospin: false,
			action: function(dialog) {
				dialog.close();
			}
		}]
	});
};

function uploadFileToTemp(files, rowCount, mode, variableName) {

	// 10 mb for bytes.
	if (files == undefined) {
		bootbox.alert({
			title: "Error",
			message: "File size must be under 10 MB!"
		});
		return 0;
	}

	regex = new RegExp("(.*?)\.(pdf|jpg|png|jpeg|PNG|JPG|JPEG|PDF|doc|docx|xls|xlsx|zip|PPT|PPTX|pptx|ppt|pptm|PPTM)$");

	if ((regex.test(files[0].name))) {
		var f = files[0];

		readSingleFile(f, 0, function() {

			var formData = new FormData();
			formData.append("file", files[0]);
			formData.append(csrf_token_key, $('#' + csrf_token_key).val());
			formData.append("f_codes" + 0, $("#f_codes" + 0).val());

			var qstring = getFormDataParams(formData);
			var hcode = getHexaCode(qstring);
			formData.append(token_key, hcode);

			var encodedFile = Base64.encode(Base64.encode(files[0].name));
			//console.log("encodedFile"+encodedFile)

			formData.append("f_name_key", encodedFile);

			formData.delete("f_codes" + 0);
			$("#f_codes" + 0).remove();

			if (formData != 0)
				$.ajax({
					url: 'echofile',
					type: "POST",
					data: formData,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
					beforeSend: function() {
						$("div#ajaxSpinner").removeClass('hide').addClass('show');
					},
					complete: function() {
						$("div#ajaxSpinner").removeClass('show').addClass('hide');
					}
				}).done(function(data) {
					console.log("data" + data);

					if (mode == 1) {
						if (data.indexOf(".") >= 0)
							singleFileUpload(data, rowCount, variableName);
						else {
							removeFile(rowCount, variableName);
							bootbox.alert({
								title: "Error",
								message: "<h5>" + data + "</h5>"
							});
						}
					}
					if (mode == 2) {
						if (data.indexOf(".") >= 0)
							multipleFileUpload(data, rowCount);
						else {
							removeFile(rowCount, variableName);
							bootbox.alert({
								title: "Error",
								message: "<h5>" + data + "</h5>"
							});
						}

					}
				}).fail(function(jqXHR, textStatus) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (textStatus === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (textStatus === 'timeout') {
						msg = 'Time out error.';
					} else if (textStatus === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}

					bootbox.alert({
						title: "Error",
						message: 'File upload failed ...' + msg + "  >> " + textStatus
					});

					var selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
					var secSelTab = hex_md5(selectedTab);

					$('#' + csrf_token_key).val(getToken(secSelTab));
				});
		});

	} else {
		bootbox.alert({
			title: "Error",
			message: "This is not valid file. Acceptable files are-(pdf|jpg|png|jpeg|PNG|JPG|JPEG|PDF<br/>|doc|docx|xls|xlsx|zip|PPTX|pptx|ppt|pptm|PPTM) "
		});
		return false;
	}
}

function readSingleFile(f, id, callback) {
	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			contents = contents.split(',')[1];
			var encodedFileContent = hex_md5(contents);
			$("#f_codes" + id).remove();
			$("<input type='hidden' name='f_codes' class='f_codes' id='f_codes" + id + "' value='" + encodedFileContent + "' />").insertAfter("#fhttf");
			if (callback && typeof callback === "function") {
				callback();
			}
		}
		r.readAsDataURL(f);
	} else {
		alert("Failed to load file");
	}
}



function singleFileUpload(data, rowCount, variableName) {
	var variableId = "#" + variableName + rowCount;
	var url = "download/pdf/" + data;
	$("#divViewFile" + rowCount).show();
	$("#divSelectFile" + rowCount).hide();
	$("#divViewFile" + rowCount).html("<a href='" + url + "' id='fileId" + rowCount + "' class='fileName line-height-32'"
		+ "onclick=\"window.open('" + url + "','nameDownload','width=600,height=400'); return false;\">" + data + "</a>" +
		"<i class='fa fa-remove pointer red floatLeft line-height-32' onclick='removeFile(" + rowCount + ",\"" + variableName + "\" );'></i>");
	$(variableId).val(data);
	//$('.ace-file-name').attr('data-title', '');

	var selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
	var secSelTab = hex_md5(selectedTab);
	$('#' + csrf_token_key).val(getToken(secSelTab));

	/*
	 * var selectedTab = window.frameElement.id.split("_")[0].split("
	 * ").join("_"); var secSelTab = hex_md5(selectedTab);
	 * alert(selectedTab+"---------"+secSelTab);
	 * $('#'+csrf_token_key).val(getToken(secSelTab));
	 * alert(getToken(secSelTab));
	 */

}

function removeFile(rowCount, variableName) {
	var variableId = "#" + variableName + rowCount;
	$("#divViewFile" + rowCount).html("");
	$("#divViewFile" + rowCount).hide();
	$("#divSelectFile" + rowCount).show()
	$('#id-input-file-' + rowCount).ace_file_input('reset_input');
	$(variableId).val('');
	var selectedTab = window.frameElement.id.split("_")[0].split(" ").join("_");
	var secSelTab = hex_md5(selectedTab);
	$('#' + csrf_token_key).val(getToken(secSelTab));
	// $('#id-input-file-' + rowCount).prop('required',true);
}



function addErrorMessage(fieldSelector, message) {
	// Hide the error message by adding a class and styling it
	$(fieldSelector).after('<div class="error-message small-error-message" style="color: red;">' + message + '</div>');
}

function onTextInput() {
	// Remove error messages for the specific textbox that is being typed in
	$(this).next('.small-error-message').remove();
}


// Function to handle combo box change events
function onComboBoxChange() {
	// Get the selected value of the combo box
	var selectedValue = $(this).val();

	// Check if the selected value is not blank
	if (selectedValue !== '') {
		// Remove error messages when the combo box changes and a non-blank value is selected
		$(this).next('.small-error-message').remove();
	}
}

