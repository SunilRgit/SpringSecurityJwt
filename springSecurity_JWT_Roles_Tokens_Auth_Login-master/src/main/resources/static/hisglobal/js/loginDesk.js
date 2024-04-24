jQuery(document).ready(function() {
	//jQuery.noConflict();
	//callMenu(jQuery("#varDefaultMenuURL").val(), jQuery("#varDefaultMenuName").val());
	//jQuery('#tabframe').tabs();
	jQuery('[data-toggle="tooltip"]').tooltip();


	$('#notificationToggle').click(function() {
		$('#notificationDropdown').toggle(); // Toggle the visibility of the notification dropdown
	});

	$('#notificationDropdown .dropdown-item').click(function() {
		$('#notificationDropdown').hide(); // Close the notification dropdown
	});

	var fullHeight = function() {

		jQuery('.js-fullheight').css('height', jQuery(window).height());
		jQuery(window).resize(function() {
			jQuery('.js-fullheight').css('height', jQuery(window).height());
		});

	};
	fullHeight();


});

function checkURL(vURL) {
	console.log("vURL" + vURL);
	var flg = true;
	jQuery.ajax({
		url: vURL,
		async: false,
		success: function() {
			console.log("in success");
			flg = true;
		},
		error: function(jqXHR, status, er) {
			console.log("in error" + er);
			//only set the error on 404
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



function callMenu(event, url, menu) {
	event.preventDefault(); // Prevent default action (form submission or page navigation)

	console.log("callMenu url: " + url);
	// Your remaining function logic here
}


function toggleSecondDiv(count) {
	$("#secondDiv" + count).toggle();

}

function callLogOut() {
	//createFHash("userDeskForm");
	submitForm("/auth/logout");
}

function submitForm(actionURL) {
	$("#userDeskForm").attr("action", actionURL);
	$("#userDeskForm").submit();
}

function loadContent(url) {
	const token = $("#jwtToken").val();
	url = "/registration/newRegistration";
	fetch(url, {
		headers: {
			'Authorization': `Bearer ${token}` // Include JWT token in Authorization header
		}
	})
		.then(response => response.text())
		.then(html => {
			// Set HTML content
			document.getElementById('menu-content').innerHTML = html;

			// Extract and execute scripts
			const scripts = document.getElementById('menu-content').querySelectorAll('script');
			scripts.forEach(script => {
				const newScript = document.createElement('script');
				newScript.text = script.text;
				document.body.appendChild(newScript);
			});


			 reloadJSFile()
		})
		.catch(error => console.error('Error:', error));
}

function reloadJSFile() {
	var url = '/hisglobal/js/registration/employeeRegistration.js';

	// Get the current timestamp
	var timestamp = new Date().getTime();

	// Append the timestamp as a query parameter to the URL
	var newUrl = url + '?t=' + timestamp;

	// Create a new <script> element
	var script = document.createElement('script');

	// Set the src attribute to the new URL
	script.src = newUrl;

	// Append the <script> element to the <head> element to reload the JavaScript file
	document.head.appendChild(script);
}

